import {MoneyAmount} from "@dontcode/core";
import {HttpClient} from "@angular/common/http";


/**
 * The description of a product in an online shop
 */
export class ScrappedProduct {
  productId?: string;
  productName: string|null=null;
  productDescription?:string;
  productUrl?:string;
  productImageUrl?:string;
  productPrice?: number;
  currencyCode?: string;
}

/**
 * Defines the method an OnlineShopScrapper must support
 */
export interface OnlineShopScrapper {

  getOnlineShopName ():string;
  /**
   * Given a name returns all products that the onlineshop found
   * @param name
   */
  searchProductsForName (name:string): Promise<Array<ScrappedProduct>>;

  /**
   * Retrieve the price of the given product
   * @param productId
   */
  updatePrice (product: ScrappedProduct): Promise<MoneyAmount>;

}

export abstract class AbstractOnlineShopScrapper implements OnlineShopScrapper {

  public static readonly CORS_SERVER_URL='https://corsproxy.io/?';

  protected onlineShopName="Unknown";

  /**
   * Helper method to convert a scrappedProduct to a MoneyAmount.
   * @param scrappedProduct
   */
  static toMoneyAmount(scrappedProduct: ScrappedProduct):MoneyAmount {
    const ret = new MoneyAmount();
    ret.amount=scrappedProduct.productPrice;
    ret.currencyCode=scrappedProduct.currencyCode;
    return ret;
  }

  constructor(protected http:HttpClient) {
  }

  getOnlineShopName(): string {
    return this.onlineShopName;
  }

  getShopTypeName (): string {
    return this.onlineShopName;
  }
  /**
   * Avoid Cors issue by running the url through a Cors manager proxy
   * @param url
   */
  encodeUrlForCors(url:string):string {
    return AbstractOnlineShopScrapper.CORS_SERVER_URL+encodeURIComponent(url);
  }

  abstract searchProductsForName(name: string): Promise<Array<ScrappedProduct>>;

  /**
   * By default we do a search with the productId and returns the price
   * @param productId
   */
  updatePrice(prod: ScrappedProduct): Promise<MoneyAmount> {
    let productToFind = prod.productId;
    if (productToFind==null) {
      productToFind=prod.productName??undefined;
    }
    if (productToFind==null) {
      return Promise.reject("You must define a product with a name or id ");
    } else {
      return this.searchProductsForName(productToFind).then(listOfAllElements => {
        for (const product of listOfAllElements) {
          if (product.productId == prod.productId) {
            return AbstractOnlineShopScrapper.toMoneyAmount(product);
          }
        }
        return Promise.reject("Product " + productToFind + " not found in shoptype " + this.onlineShopName);
      });
    }
  }

}
