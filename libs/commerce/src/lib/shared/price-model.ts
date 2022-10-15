import {MoneyAmount} from "@dontcode/core";

export interface PriceModel {
  price?:MoneyAmount;
  shop?:string;
  priceDate?:Date;

  idInShop?:string;
  nameInShop?:string;
}
