import {AbstractOnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {firstValueFrom, map} from "rxjs";
import {MoneyAmount} from "@dontcode/core";
import {PriceFinderService} from "../services/price-finder.service";
import {HttpClient} from "@angular/common/http";

export class NewPharmaScrapper extends AbstractOnlineShopScrapper {

  static readonly SEARCH_ONLINE_URL="https://www.newpharma.fr/search-results/search.html?q=QUERY_STRING"
  protected static readonly PRODUCT_START_STRING="<div class=\"product js-product-row product--desktop";

  override onlineShopName="NewPharma";

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.useCorsProxy=true;
  }

  searchProductsForName(name: string): Promise<Array<ScrappedProduct>> {
    const query = NewPharmaScrapper.SEARCH_ONLINE_URL.replace("QUERY_STRING", encodeURIComponent(name));

    return firstValueFrom(this.http.get(this.encodeUrlForCors(query)
    ,{headers:{Accept:'text/html'}, responseType:"text", observe:"body"}).pipe (
        map(htmlResult => {

          const ret= new Array<ScrappedProduct>();
          let startPos = htmlResult.indexOf(NewPharmaScrapper.PRODUCT_START_STRING);
          while (startPos>=0) {
            const newProduct = new ScrappedProduct();
            let itemPos = htmlResult.indexOf('data-productid="', startPos)+16;
            newProduct.productId=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = htmlResult.indexOf('<a class="details__title', startPos)+24;
            itemPos = htmlResult.indexOf('title="', itemPos+1)+7;
            newProduct.productName=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            newProduct.productDescription=undefined;
            itemPos = htmlResult.indexOf('href="', startPos)+6;
            newProduct.productUrl=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = htmlResult.indexOf('<img src="', startPos+1)+10;
            newProduct.productImageUrl=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));

            this.extractPrice(htmlResult, startPos, newProduct);
            this.checkScrappedProduct(name, newProduct);
            ret.push(newProduct);

            startPos = htmlResult.indexOf(NewPharmaScrapper.PRODUCT_START_STRING, startPos+1);
          }

          return ret;
        })
    ));
  }

  extractPrice (htmlResult:string, startPos:number, newProduct:ScrappedProduct): void {
    let startPricePos = htmlResult.indexOf('data-content_ids="['+newProduct.productId+']"', startPos+1);
    if( startPricePos==-1) {
      startPricePos = htmlResult.indexOf('data-content_ids="'+newProduct.productId+'"', startPos+1);
    }
    if (startPricePos!=-1) { // It may be unavailable
      let itemPos = htmlResult.indexOf('data-currency="', startPricePos)+15;
      newProduct.currencyCode=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
      itemPos = htmlResult.indexOf('data-value="', startPricePos)+12;
      newProduct.productPrice=parseFloat(htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1)));
    }

  }

  /**
   * We have to go directly to the product page, otherwise there may be a redirect
   * @param product
   */
  override updatePrice(product:ScrappedProduct, useProductName?:boolean): Promise<ScrappedProduct|null> {
    if (product.productUrl==null) {
      return super.updatePrice(product, true);
    }
    return firstValueFrom(this.http.get(this.encodeUrlForCors(product.productUrl)
      ,{headers:{Accept:'text/html'}, responseType:"text", observe:"body"}).pipe (
      map(htmlResult => {
        const newProduct:ScrappedProduct = {productId:product.productId,
          productName:product.productName};
          this.extractPrice(htmlResult, 0, newProduct);
          this.checkScrappedProduct(product.productName??"", newProduct);
          product.productPrice=newProduct.productPrice;
          product.currencyCode=newProduct.currencyCode;
          return product;
      }))
    ).catch(error => {
      console.error("Error trying to access page for product "+product.productName, error);
      return super.updatePrice(product, true);
    });

  }
}
