import {TestBed, tick} from '@angular/core/testing';

import {EasyParaScrapper} from './easy-para-scrapper';
import {PluginCommonModule} from "@dontcode/plugin-common";
import {HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import {ShopHandlerComponent} from "../../preview/shop/shop-handler.component";
import {HttpClient} from "@angular/common/http";
import {AbstractOnlineShopScrapper} from "../online-shop-scrapper";
import * as fs from "fs";
import * as Path from "path";

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
    component.updatePrice({productId:"3700026996703", productName:"Chardon Marie"}).then(value => {
      expect(value?.productPrice).toEqual(9.8);
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

export function waitForOneMatchSampleFile (sampleFileRelative:string, controller:HttpTestingController, done:jest.DoneCallback):void {
  setTimeout(() => {
    const counter= 0;
    __isMatchRecursive(sampleFileRelative, controller, done, counter);
  }, 100);
}

function __isMatchRecursive (sampleFileRelative:string, controller:HttpTestingController, done:jest.DoneCallback, counter:number):void {
    const searchCall = controller.match(req => {
      if (req.url.startsWith(AbstractOnlineShopScrapper.CORS_SERVER_URL))
        return true;
      else
        return false;
    });
    if (searchCall!=null && searchCall.length>0) {
      if (searchCall.length==1) {
        const responseRead=fs.readFileSync(Path.join(__dirname,"../../../../../../samples/",sampleFileRelative), {encoding:'utf-8'});
        searchCall[0].flush(responseRead);
        return;
      } else throw new Error("Multiple requests occured for sample file "+sampleFileRelative);
    }

    counter++;
    // Wait 5 s max
    if (counter<50) {
      setTimeout (()=> __isMatchRecursive(sampleFileRelative, controller, done, counter), 100);
    } else {
      done("No query created");
    }

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

