import {AbstractOnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {MoneyAmount} from "@dontcode/core";
import {firstValueFrom, map} from "rxjs";

export class EasyParaScrapper extends AbstractOnlineShopScrapper {

  static readonly SEARCH_ONLINE_URL="https://www.easypara.fr/catalogsearch/result/?q="

  override onlineShopName="EasyParapharmacie";

  searchProductsForName(name: string): Promise<Array<ScrappedProduct>> {
    return firstValueFrom(this.http.get(this.encodeUrlForCors(EasyParaScrapper.SEARCH_ONLINE_URL+name),{responseType:'text', observe:'body'}).pipe(
      map (response => {
        //console.debug("Response:", response);
        const ret= new Array<ScrappedProduct>();
        const line = response.indexOf("var ecommerceObjects");
        if (line!=-1) {
          const start = response.indexOf("{", line);
          if (start!=-1) {
            const end = response.indexOf("]};", start+1);
            if (end!=-1) {
              const result = JSON.parse(response.substring(start, end+2));
              const currencyCode = result.currencyCode;
              for (const product of result.impressions) {
                const newProduct = new ScrappedProduct();
                newProduct.productId=product.id;
                newProduct.productName=product.name;
                newProduct.productDescription="Brand "+product.brand;
                newProduct.productPrice=Number.parseFloat(product.price);
                newProduct.currencyCode=currencyCode;
                ret.push(newProduct);
              }

            }
          }
        }

        return ret;
      })
    ));
  }

  updatePrice(productId: string): Promise<MoneyAmount> {
    return Promise.reject("Not implemented");
  }

}
