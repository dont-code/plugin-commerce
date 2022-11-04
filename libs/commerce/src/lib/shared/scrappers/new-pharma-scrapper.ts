import {AbstractOnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {firstValueFrom, map} from "rxjs";
import {MoneyAmount} from "@dontcode/core";
import {PriceFinderService} from "../services/price-finder.service";

export class NewPharmaScrapper extends AbstractOnlineShopScrapper {

  static readonly SEARCH_ONLINE_URL="https://www.newpharma.fr/search-results/search.html?q=QUERY_STRING"
  protected static readonly PRODUCT_START_STRING="<a class=\"details__title js-product-detail-row js-product-click\"";

  override onlineShopName="NewPharma";

  searchProductsForName(name: string): Promise<Array<ScrappedProduct>> {
    const query = NewPharmaScrapper.SEARCH_ONLINE_URL.replace("QUERY_STRING", encodeURIComponent(name));

    return firstValueFrom(this.http.get(this.encodeUrlForCors(query)
    ,{headers:{Accept:'text/html'}, responseType:"text", observe:"body"}).pipe (
        map(htmlResult => {

          const ret= new Array<ScrappedProduct>();
          let startPos = htmlResult.indexOf(NewPharmaScrapper.PRODUCT_START_STRING);
          while (startPos>=0) {
            const newProduct = new ScrappedProduct();
            let itemPos = htmlResult.indexOf('data-id="', startPos)+9;
            newProduct.productId=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = htmlResult.indexOf('title="', startPos)+7;
            newProduct.productName=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            newProduct.productDescription=undefined;
            itemPos = htmlResult.indexOf('href="', startPos)+6;
            newProduct.productUrl=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = htmlResult.indexOf('<img src="', startPos+1)+10;
            newProduct.productImageUrl=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));

            this.extractPrice(htmlResult, startPos, newProduct);
            ret.push(newProduct);

            startPos = htmlResult.indexOf(NewPharmaScrapper.PRODUCT_START_STRING, startPos+1);
          }

          return ret;
        })
    ));
  }

  extractPrice (htmlResult:string, startPos:number, newProduct:ScrappedProduct): void {
    const startPricePos = htmlResult.indexOf('data-content_ids="['+newProduct.productId+']"', startPos+1);
    if (startPricePos!=-1) { // It may be unavailable
      let itemPos = htmlResult.indexOf('data-currency="', startPos)+15;
      newProduct.currencyCode=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
      itemPos = htmlResult.indexOf('data-value="', startPos)+12;
      newProduct.productPrice=parseFloat(htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1)));
    }

  }

  /**
   * We have to go directly to the product page, otherwise there may be a redirect
   * @param product
   */
  override updatePrice(product:ScrappedProduct): Promise<MoneyAmount> {
    if (product.productUrl==null) {
      return Promise.reject("Cannot update price without the url of the product");
    }
    return firstValueFrom(this.http.get(this.encodeUrlForCors(product.productUrl)
      ,{headers:{Accept:'text/html'}, responseType:"text", observe:"body"}).pipe (
      map(htmlResult => {
        const newProduct:ScrappedProduct = {productId:product.productId,
          productName:product.productName};
          this.extractPrice(htmlResult, 0, newProduct);
          if (newProduct.productPrice!=null) {
            return AbstractOnlineShopScrapper.toMoneyAmount (newProduct);
          } else {
            throw new Error ("Cannot find price for product "+product.productName);
          };
      }))
    );

  }
}
