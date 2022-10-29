import {Injectable, Optional} from '@angular/core';
import {OnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {HttpClient} from "@angular/common/http";
import {EasyParaScrapper} from "../scrappers/easy-para-scrapper";
import {
  DontCodeEntityType,
  DontCodeModelManager,
  DontCodeStoreCriteriaOperator,
  DontCodeStoreManager,
  dtcde,
  MoneyAmount
} from "@dontcode/core";
import {PriceModel} from "../price-model";
import {GreenWeezScrapper} from "../scrappers/greenweez-scrapper";
import {CommerceModule, ShopHandlerComponent} from "@dontcode/plugin-commerce";
import {CommercePlugin} from "../../declaration/commerce-plugin";
import {firstValueFrom, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriceFinderService {

  private static DONT_UPDATE_UNTIL_DELAY_MS = 1000*60*60*12; // Don't update price until 12h has passed since the last one
  protected listOfScrappers = new Map<string, OnlineShopScrapper> ();
  protected shopTypeNames = new Array<string>();

  constructor(protected httpClient:HttpClient, @Optional() protected modelMgr:DontCodeModelManager,
              @Optional() protected storeMgr:DontCodeStoreManager) {
    if (this.modelMgr==null)  this.modelMgr=dtcde.getModelManager();
    if (this.storeMgr==null) this.storeMgr=dtcde.getStoreManager();

    this.addScrapper (new EasyParaScrapper(httpClient));
    this.addScrapper (new GreenWeezScrapper(httpClient));
  }

  addScrapper (newScrapper: OnlineShopScrapper): void {
    this.listOfScrappers.set(newScrapper.getOnlineShopName(), newScrapper);
    this.shopTypeNames.push(newScrapper.getOnlineShopName());
  }

  getListOfShopTypes (): Array<string> {
    return this.shopTypeNames;
  }

  /**
   * Finds the list of products corresponding to the productInfo given for the shopTypeName given at the model position given.
   * @param productInfo
   * @param position
   * @param shopName
   * @param model
   */
  async searchProducts (productName: string, shopName:string): Promise<Array<ScrappedProduct>> {
    const scrapper = this.listOfScrappers.get(await this.getShopTypeNameOf (shopName));
    if (scrapper==null)
      throw new Error ("Shop type "+shopName+" not found");

    return scrapper.searchProductsForName(productName);
  }

  /**
   * Finds the price of a product in parameter for a shop in parameter. It looks for a Price element in the product info given.
   * and updates it
   * @param productValue
   * @param position
   * @param shopName
   * @param model
   */
  async findPrice (productValue: any, shopName:string, position:string, model?:DontCodeEntityType): Promise<MoneyAmount|null> {
    if (productValue==null) {
      throw new Error ("No product to get price for");
    }
    const scrapper = this.listOfScrappers.get(await this.getShopTypeNameOf (shopName));
    if (scrapper==null)
      throw new Error ("Shop type "+shopName+" not found");

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

  async updatePriceIfPossible(val: Price, position:string):Promise<MoneyAmount | null> {
    if( val == null) return null;
    if( (val.productId!=null)&& (val.shop!=null)) {
      if ((val.date==null) ||
          (val.date.getTime()+PriceFinderService.DONT_UPDATE_UNTIL_DELAY_MS < new Date().getTime())
      ) {
        // Yes we can update
        const newPrice = await this.findPrice(val, val.shop, position);
        return newPrice;
      }
    }
    return null;
  }

  private getShopTypeNameOf(shopName: string):Promise<string> {
    const query="$.creation.entities[?(@.name=='"+CommercePlugin.SHOP_ENTITY_NAME+"')]";
    const targetEntitiesPos = this.modelMgr.queryModelToSingle(query).pointer;

    if (targetEntitiesPos==null)  return Promise.resolve(shopName);

    return firstValueFrom(this.storeMgr.searchEntities(targetEntitiesPos, {
      name:'Shop',
      value:shopName,
      operator:DontCodeStoreCriteriaOperator.EQUALS
    })).then((loaded) => {
      if (loaded?.length!=1) return shopName;
      if( loaded[0].Type!=null)
        return loaded[0].Type;
      else
        return shopName;
    })
  }
}

export interface Price {
  productName?:string;
  productId?:string;
  price?:MoneyAmount;
  date?:Date;
  shop?:string;
}
