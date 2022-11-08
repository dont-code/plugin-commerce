import {AbstractOnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {firstValueFrom, map} from "rxjs";

export class BoulangerScrapper extends AbstractOnlineShopScrapper {

  static readonly SEARCH_ONLINE_URL="https://www.boulanger.com/resultats?tr=QUERY_STRING"
  protected static readonly PRODUCT_START_STRING="<article";

  protected static readonly BASE_URL='https://www.boulanger.com'

  override onlineShopName="Boulanger";

  searchProductsForName(name: string): Promise<Array<ScrappedProduct>> {
    // remove accents
    name = name.normalize("NFD").replace(/\p{Diacritic}/gu, "");

    const query = BoulangerScrapper.SEARCH_ONLINE_URL.replace("QUERY_STRING", name);

    return firstValueFrom(this.http.get(this.encodeUrlForCors(query)
    ,{headers:{Accept:'text/html'}, responseType:"text", observe:"body"}).pipe (
        map(htmlResult => {

          const ret= new Array<ScrappedProduct>();
          let startPos = htmlResult.indexOf(BoulangerScrapper.PRODUCT_START_STRING);
          while (startPos>=0) {
            const newProduct = new ScrappedProduct();
            let itemPos = htmlResult.indexOf('href="', startPos)+6;
            newProduct.productUrl=BoulangerScrapper.BASE_URL+htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = htmlResult.indexOf('data-product-label="', startPos)+20;
            newProduct.productName=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            newProduct.productDescription=undefined;
            itemPos = htmlResult.indexOf('<img src="', startPos+1)+10;
            newProduct.productImageUrl=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = htmlResult.indexOf('data-product-id="', startPos)+17;
            newProduct.productId=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));

            this.extractPrice(htmlResult, startPos, newProduct);
            this.checkScrappedProduct(name, newProduct);
            ret.push(newProduct);

            startPos = htmlResult.indexOf(BoulangerScrapper.PRODUCT_START_STRING, startPos+1);
          }

          return ret;
        })
    ));
  }

  extractPrice (htmlResult:string, startPos:number, newProduct:ScrappedProduct): void {
      const itemPos = htmlResult.indexOf('data-analytics_product_unitprice_ati="', startPos)+38;
      const price = Number.parseFloat(htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1)));

      newProduct.productPrice=price;
      newProduct.currencyCode="EUR"

  }

}
