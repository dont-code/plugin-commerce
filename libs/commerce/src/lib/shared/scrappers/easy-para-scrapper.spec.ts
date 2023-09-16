import {TestBed} from '@angular/core/testing';

import {EasyParaScrapper} from './easy-para-scrapper';
import {PluginCommonModule} from "@dontcode/plugin-common";
import {HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import {ShopHandlerComponent} from "../../preview/shop/shop-handler.component";
import {HttpClient} from "@angular/common/http";
import {AbstractOnlineShopScrapper} from "../online-shop-scrapper";
import {expectOneSampleFile} from "../common-scrapper-test.spec";

describe('EasyParaScrapper', () => {
  let component: EasyParaScrapper;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopHandlerComponent ],
      imports: [HttpClientTestingModule, PluginCommonModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = new EasyParaScrapper(httpClient);
  });

  it('should search', (done) => {
    expect(component).toBeTruthy();
    component.searchProductsForNameOrId("Chardon Marie", false).then(value => {
      expect(value.length>0).toBeTruthy();
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("easypara/chardon-marie-search-result.json", httpTestingController,AbstractOnlineShopScrapper.CORS_DONTCODE_PROXY_URL);
  });

  it('should get price', (done) => {
    expect(component).toBeTruthy();
    component.updatePrice({productId:"3700026996703", productName:"Chardon Marie"}).then(value => {
      expect(value?.productPrice).toEqual(9.8);
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("easypara/chardon-marie-search-result.json", httpTestingController,AbstractOnlineShopScrapper.CORS_DONTCODE_PROXY_URL);
  });
});

