import {MoneyAmount} from "@dontcode/core";
import {HttpClient} from "@angular/common/http";


/**
 * The description of a product in an online shop
 */
export class ScrappedProduct {
  productId?: string;
  productName: string|null=null;
  productDescription?: string;
  productUrl?: string;
  productImageUrl?: string;
  productPrice?: number;
  currencyCode?: string;
  outOfStock?:boolean = false;
  marketPlace?:boolean;
}

/**
 * Defines the method an OnlineShopScrapper must support
 */
export interface OnlineShopScrapper {

  getOnlineShopName ():string;
  /**
   * Given a name returns all products that the onlineshop found
   * @return empty array if no product matches the criteria, a rejected promise in case of any type of error getting the list
   * @param name
   */
  searchProductsForName (name:string): Promise<Array<ScrappedProduct>>;

  /**
   * Retrieve the price of the given product.
   * @return null if product is not found, throw an error if scrapping went wrong for any reason
   * @param productId
   */
  updatePrice (product: ScrappedProduct, useProductName?:boolean): Promise<ScrappedProduct|null>;

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
  updatePrice(prod: ScrappedProduct, useProductName?:boolean): Promise<ScrappedProduct|null> {
    let productToFind = prod.productId;
    if( useProductName==null) useProductName=false;

    if (useProductName||(productToFind==null)) {
      productToFind=prod.productName??undefined;
    }
    if (productToFind==null) {
      return Promise.reject("You must define a product with a name or id ");
    } else {
      return this.searchProductsForName(productToFind).then(listOfAllElements => {
        for (const product of listOfAllElements) {
          if (product.productId == prod.productId) {
            return product;
          }
        }
        return Promise.reject("Product " + productToFind + " not found in shoptype " + this.onlineShopName);
      });
    }
  }

  /**
   * Throws an exception if the product scrapped is incorrect
   * @param product
   */
  checkScrappedProduct (productSearch:string, product:ScrappedProduct): void {
    if ((product.productId==null)||(product.productId.length==0)) {
      throw new Error ("Incorrect productId scrapped by shop "+this.getOnlineShopName()+" for product search"+productSearch);
    }
    if ((product.productName==null)||(product.productName.length==0)) {
      throw new Error ("Incorrect productName scrapped by shop "+this.getOnlineShopName()+" for product search"+productSearch);
    }
    if ((product.productPrice==null)||(isNaN(product.productPrice))) {
      throw new Error ("Incorrect productPrice scrapped by shop "+this.getOnlineShopName()+" for product search"+productSearch);
    }
  }

  /**
   * Throw an exception if the itemPos is -1 (not found) or after the next product position
   * @param itemPos
   * @param nextStartPos
   * @private
   */
  protected checkStringPosition(itemPos: number, limitPos: number) {
    if ((itemPos==-1)||((limitPos!=-1)&&(itemPos>limitPos)) ) {
      throw new Error ("Error decoding product for Scrapper "+ this.getOnlineShopName());
    }
  }

  protected safeIndexOf(htmlResult: string, toFind: string, startPos: number, limitPos?:number) {
    const result=htmlResult.indexOf(toFind, startPos);
    if( result==-1) throw new Error("Cannot find "+toFind+" for "+this.getOnlineShopName());
    else if ((limitPos!=null) && (limitPos!=-1) && (result>limitPos)) throw new Error ("The product content does not contains "+toFind+' for '+this.getOnlineShopName());

    return result+toFind.length;
  }

}
