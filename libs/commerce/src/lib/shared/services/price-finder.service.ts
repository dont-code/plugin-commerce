import {Injectable, Optional} from '@angular/core';
import {OnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {HttpClient} from "@angular/common/http";
import {EasyParaScrapper} from "../scrappers/easy-para-scrapper";
import {DontCodeEntityType, DontCodeModelManager, dtcde, MoneyAmount} from "@dontcode/core";
import {PriceModel} from "../price-model";

@Injectable({
  providedIn: 'root'
})
export class PriceFinderService {

  protected listOfScrappers = new Map<string, OnlineShopScrapper> ();
  protected shopTypeNames = new Array<string>();

  constructor(protected httpClient:HttpClient, @Optional() protected modelMgr:DontCodeModelManager) {
    if (this.modelMgr==null)  this.modelMgr=dtcde.getModelManager();

    const newScrapper = new EasyParaScrapper(httpClient);
    this.listOfScrappers.set(newScrapper.onlineShopName, newScrapper);
    this.shopTypeNames.push(newScrapper.onlineShopName);
  }

  getListOfShopTypes (): Array<string> {
    return this.shopTypeNames;
  }

  /**
   * Finds the list of products corresponding to the productInfo given for the shopTypeName given at the model position given.
   * @param productInfo
   * @param position
   * @param shopTypeName
   * @param model
   */
  searchProducts (productName: string, shopTypeName:string): Promise<Array<ScrappedProduct>> {
    const scrapper = this.listOfScrappers.get(shopTypeName);
    if (scrapper==null)
      throw new Error ("Shop type "+shopTypeName+" not found");

    return scrapper.searchProductsForName(productName);
  }

  /**
   * Finds the price of a product in parameter for a shop in parameter. It looks for a Price element in the product info given.
   * and updates it
   * @param productValue
   * @param position
   * @param shopTypeName
   * @param model
   */
  findPrice (productValue: any, shopTypeName:string, position:string, model?:DontCodeEntityType): Promise<MoneyAmount|null> {
    if (productValue==null) {
      throw new Error ("No product to get price for");
    }
    const scrapper = this.listOfScrappers.get(shopTypeName);
    if (scrapper==null)
      throw new Error ("Shop type "+shopTypeName+" not found");

    if( model==null){
      model = this.modelMgr.findAtPosition(position, false);
    }
    // We're looking for a Price that points to the shopType given in parameter
    let priceField=null;
    let productPrice:PriceModel|null = null;
    if (model?.fields) {
      for (const field of model.fields) {
        if (field.type==="Price") {
          // We found one, is it the correct one ?
          priceField=field;
          productPrice=productValue[priceField.name];
          break;
          /*if (productPrice?.shop!==shopTypeName) {
            priceField=null;
            productPrice=null;
          }else {
            break;
          }*/
        }
      }
    }

      // In case we didn't find anything, we assume the value in parameter is the price
    if (priceField==null) {
        priceField=model;
        productPrice=productValue;
      }

      // Let's see if we already have the id of the item, then we can get the price very quickly
    const productId=this.findProductId (productPrice);
    if (productId==null) {
      return Promise.reject("Product Id not found in "+productValue);
    } else {
      return scrapper.updatePrice(productId);
    }
  }

  protected findProductId (info:any):string|null {
      // Try to find if we have a list of shop per product
    if (info?.idInShop!=null) {
      return info?.idInShop;
    } else {
      if (info?.productId!=null)
        return info?.productId;
      else if (info?.id!=null) {
        return info?.id;
      }
    }
    return null;
  }

  protected findProductName (info:any):string|null {
    // Try to find if we have a list of shop per product
    if (info?.nameInShop!=null) {
      return info?.nameInShop;
    } else {
      if (info?.productName!=null)
        return info?.productName;
      else if (info?.name!=null) {
        return info?.name;
      }
    }
    return null;
  }
}
