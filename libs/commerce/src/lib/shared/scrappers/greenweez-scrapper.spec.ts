import {TestBed} from '@angular/core/testing';

import {EasyParaScrapper} from './easy-para-scrapper';
import {PluginCommonModule} from "@dontcode/plugin-common";
import {HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import {ShopHandlerComponent} from "@dontcode/plugin-commerce";
import {HttpClient} from "@angular/common/http";
import {AbstractOnlineShopScrapper} from "../online-shop-scrapper";
import * as fs from "fs";
import * as Path from "path";
import {GreenWeezScrapper} from "./greenweez-scrapper";
import {expectOneSampleFile} from "./easy-para-scrapper.spec";

describe('ShopHandlerComponent', () => {
  let component: GreenWeezScrapper;
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
    component = new GreenWeezScrapper(httpClient);
  });

  it('should search', (done) => {
    expect(component).toBeTruthy();
    component.searchProductsForName("Chardon Marie").then(value => {
      expect(value.length>0).toBeTruthy();
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("greenweez/chardon-marie-search-result.json", httpTestingController);
  });

  it('should get price', (done) => {
    expect(component).toBeTruthy();
    component.updatePrice("1AVOG0069").then(value => {
      expect(value.amount).toEqual(11.94);
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("greenweez/chardon-marie-search-result.json", httpTestingController);
  });
});

