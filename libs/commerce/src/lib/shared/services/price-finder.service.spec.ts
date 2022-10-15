import {TestBed} from '@angular/core/testing';

import {PriceFinderService} from './price-finder.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {PluginCommonModule} from "@dontcode/plugin-common";
import {expectOneSampleFile} from "../scrappers/easy-para-scrapper.spec";
import {EasyParaScrapper} from "../scrappers/easy-para-scrapper";
import {PriceModel} from "../price-model";
import {AbstractOnlineShopScrapper} from "../online-shop-scrapper";

describe('PriceFinderService', () => {
  let service: PriceFinderService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, PluginCommonModule.forRoot()]
    });
    service = TestBed.inject(PriceFinderService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should manage easypara prices', (done) => {
    const shopTypeName = new EasyParaScrapper(httpClient).getShopTypeName();
    const productModel: {name:string, price?:PriceModel} = {
      name:"Chardon Marie"
    };
    service.searchProducts("Chardon Marie", shopTypeName).then(products => {
       const selectedProduct = products[5]; // Chardon Marie A. Vogel
       productModel.price={
         idInShop:selectedProduct.productId,
         nameInShop:selectedProduct.productName??undefined,
         price:AbstractOnlineShopScrapper.toMoneyAmount(selectedProduct),
         priceDate:new Date()
       }

       const ret= service.findPrice(productModel.price,shopTypeName, "").then(value => {
          expect(value).toBeTruthy();
          done();
       }).catch(error => {
         done (error);
       });
      expectOneSampleFile("easypara/chardon-marie-search-result.json", httpTestingController);
      return ret;
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("easypara/chardon-marie-search-result.json", httpTestingController);
    httpTestingController.verify();
  });
});
