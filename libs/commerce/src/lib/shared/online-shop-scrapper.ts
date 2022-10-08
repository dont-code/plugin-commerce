import {MoneyAmount} from "@dontcode/core";
import {HttpClient} from "@angular/common/http";


/**
 * The description of a product in an online shop
 */
export class ScrappedProduct {
  productId?: string;
  productName: string|null=null;
  productDescription?:string;
  productImageUrl?:string;
  productPrice?: number;
  currencyCode?: string;
}

/**
 * Defines the method an OnlineShopScrapper must support
 */
export interface OnlineShopScrapper {

  /**
   * Given a name returns all products that the onlineshop found
   * @param name
   */
  searchProductsForName (name:string): Promise<Array<ScrappedProduct>>;

  /**
   * Retrieve the price of the given product
   * @param productId
   */
  updatePrice (productId: string): Promise<MoneyAmount>;

}

export abstract class AbstractOnlineShopScrapper implements OnlineShopScrapper {

  public static readonly CORS_SERVER_URL='https://corsproxy.io/?';

  protected onlineShopName="Unknown";

  constructor(protected http:HttpClient) {
  }

  /**
   * Avoid Cors issue by running the url through a Cors manager proxy
   * @param url
   */
  encodeUrlForCors(url:string):string {
    return AbstractOnlineShopScrapper.CORS_SERVER_URL+encodeURIComponent(url);
  }

  abstract searchProductsForName(name: string): Promise<Array<ScrappedProduct>>;

  abstract updatePrice(productId: string): Promise<MoneyAmount>;

}
