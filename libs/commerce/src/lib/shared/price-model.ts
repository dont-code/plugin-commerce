import {MoneyAmount} from "@dontcode/core";

export interface PriceModel {
  cost?:MoneyAmount;
  shop?:string;
  priceDate?:Date;

  idInShop?:string;
  nameInShop?:string;
  urlInShop?:string;

  outOfStock?:boolean;
  inError?:boolean;
}
