import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyParaScrapper } from './easy-para-scrapper';
import {PluginCommonModule} from "@dontcode/plugin-common";
import {HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import {ShopHandlerComponent} from "@dontcode/plugin-commerce";
import {HttpClient} from "@angular/common/http";
import {AbstractOnlineShopScrapper} from "../online-shop-scrapper";
import * as fs from "fs";
import * as Path from "path";

describe('ShopHandlerComponent', () => {
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
    component.searchProductsForName("Chardon Marie").then(value => {
      expect(value.length>0).toBeTruthy();
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("easypara/chardon-marie-search-result.json", httpTestingController);
  });

  it('should get price', (done) => {
    expect(component).toBeTruthy();
    component.updatePrice("3700026996703").then(value => {
      expect(value.amount).toEqual(9.8);
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("easypara/chardon-marie-search-result.json", httpTestingController);
  });
});

export function expectOneSampleFile (sampleFileRelative:string, controller:HttpTestingController): TestRequest {
  const searchCall = controller.expectOne(req => {
    if (req.url.startsWith(AbstractOnlineShopScrapper.CORS_SERVER_URL))
      return true;
    else
      return false;
  });
  const responseRead=fs.readFileSync(Path.join(__dirname,"../../../../../../samples/",sampleFileRelative), {encoding:'utf-8'});
  searchCall.flush(responseRead);
  return searchCall;
}

export function expectMultipleSampleFile (sampleFileRelative:string, controller:HttpTestingController): number {
  const searchCalls = controller.match(req => {
    if (req.url.startsWith(AbstractOnlineShopScrapper.CORS_SERVER_URL))
      return true;
    else
      return false;
  });
  const responseRead=fs.readFileSync(Path.join(__dirname,"../../../../../../samples/",sampleFileRelative), {encoding:'utf-8'});
  for (const searchCall of searchCalls) {
    searchCall.flush(responseRead);
  }
  return searchCalls.length;
}

