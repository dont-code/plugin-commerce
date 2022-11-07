import {AbstractOnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {firstValueFrom, map} from "rxjs";

export class CDiscountScrapper extends AbstractOnlineShopScrapper {

  static readonly SEARCH_ONLINE_URL="https://www.cdiscount.com/search/10/QUERY_STRING.html";
  protected static readonly PRODUCT_START_STRING='<img class="prdtBImg"';

  protected static readonly BASE_URL='https://www.cdiscount.com'

  override onlineShopName="CDiscount";

  searchProductsForName(name: string): Promise<Array<ScrappedProduct>> {
    // remove accents
    const words=name.split(" ");
    let encodedName = "";
    for (const word of words) {
      encodedName+=encodeURIComponent(word)+"+";
    }
    if( words.length>1) {
      // Remove the last +
      encodedName=encodedName.substring(0, encodedName.length-1);
    }
    const query = CDiscountScrapper.SEARCH_ONLINE_URL.replace("QUERY_STRING", encodedName);

    return firstValueFrom(this.http.get(this.encodeUrlForCors(query)
    ,{headers:{Accept:'text/html'}, responseType:"text", observe:"body"}).pipe (
        map(htmlResult => {

          const ret= new Array<ScrappedProduct>();
          let startPos = htmlResult.indexOf(CDiscountScrapper.PRODUCT_START_STRING);
          // We ignore the first one as its the template
          startPos = htmlResult.indexOf(CDiscountScrapper.PRODUCT_START_STRING, startPos+1);
          while (startPos>=0) {
            const newProduct = new ScrappedProduct();
            let itemPos = htmlResult.indexOf('href="', startPos)+6;
            newProduct.productUrl=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = htmlResult.indexOf('title="', startPos)+7;
            newProduct.productName=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            newProduct.productDescription=undefined;
            itemPos = htmlResult.indexOf('src="', startPos+1)+5;
            newProduct.productImageUrl=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = htmlResult.indexOf('data-productid="', startPos)+16;
            newProduct.productId=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));

            this.extractPrice(htmlResult, startPos, newProduct);
            ret.push(newProduct);

            startPos = htmlResult.indexOf(CDiscountScrapper.PRODUCT_START_STRING, startPos+1);
          }

          return ret;
        })
    ));
  }

  extractPrice (htmlResult:string, startPos:number, newProduct:ScrappedProduct): void {
      const itemPos = htmlResult.indexOf('<span class="hideFromPro priceColor price">', startPos)+43;

      const price = Number.parseInt(htmlResult.substring(itemPos, htmlResult.indexOf('<sup>', itemPos+1)));
      const cents = Number.parseInt(htmlResult.substring(htmlResult.indexOf('</sup>', itemPos+1)-2,htmlResult.indexOf('</sup>', itemPos+1) ));

      newProduct.productPrice=price+cents/100;
      newProduct.currencyCode="EUR"

  }

}
