import {AbstractOnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {firstValueFrom, map} from "rxjs";

export class AmazonScrapper extends AbstractOnlineShopScrapper {

  static readonly SEARCH_ONLINE_URL="https://www.amazon.fr/s?k=QUERY_STRING";
  protected static readonly PRODUCT_START_STRING='<div data-asin="';

  protected static readonly BASE_URL='https://www.amazon.fr'

  override onlineShopName="Amazon";

  searchProductsForName(name: string): Promise<Array<ScrappedProduct>> {
    // remove accents
    const query = AmazonScrapper.SEARCH_ONLINE_URL.replace("QUERY_STRING", encodeURIComponent(name));

    return firstValueFrom(this.http.get(this.encodeUrlForCors(query)
    ,{headers:{Accept:'text/html'}, responseType:"text", observe:"body"}).pipe (
        map(htmlResult => {

          const ret= new Array<ScrappedProduct>();
          let startPos = htmlResult.indexOf(AmazonScrapper.PRODUCT_START_STRING);
          while (startPos>=0) {
            const newProduct = new ScrappedProduct();
            const middlePos = htmlResult.indexOf('data-component-type="s-product-image"', startPos);
            let itemPos = htmlResult.indexOf('data-asin="', startPos)+11;
            if( htmlResult.charAt(itemPos)=='"') {
              startPos = htmlResult.indexOf(AmazonScrapper.PRODUCT_START_STRING, startPos+1);
              continue; // Ignore the non products
            }
            newProduct.productId=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = htmlResult.indexOf('href="', middlePos)+6;
            let url=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            if (url.startsWith('/sspa/click'))  // It'href="/sspas a sponsored link
            {
              const urlPos=url.indexOf('url=')+4;
              url = url.substring(urlPos);
              url = url.replace(/%2F/g, '/');
            }

            newProduct.productUrl=AmazonScrapper.BASE_URL+url;
            itemPos = htmlResult.indexOf('src="', middlePos+1)+5;
            newProduct.productImageUrl=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = htmlResult.indexOf('a-text-normal">', middlePos)+15;
            newProduct.productDescription=htmlResult.substring(itemPos, htmlResult.indexOf('<', itemPos+1));
            if( newProduct.productDescription?.length>60) {
              newProduct.productName=newProduct.productDescription.substring(0,60);
            } else {
              newProduct.productName=newProduct.productDescription;
            }
            itemPos = htmlResult.indexOf('data-asin="', startPos)+11;
            newProduct.productId=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));

            this.extractPrice(htmlResult, middlePos, newProduct);
            ret.push(newProduct);

            startPos = htmlResult.indexOf(AmazonScrapper.PRODUCT_START_STRING, startPos+1);
          }

          return ret;
        })
    ));
  }

  extractPrice (htmlResult:string, startPos:number, newProduct:ScrappedProduct): void {
      const itemPos = htmlResult.indexOf('<span class="a-price-whole">', startPos)+28;

      let price = htmlResult.substring(itemPos, htmlResult.indexOf('</span>', itemPos+1));
      price = price.replace(',','.');
      newProduct.productPrice=Number.parseFloat(price);
      newProduct.currencyCode="EUR"

  }

}
