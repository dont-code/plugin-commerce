import {TestBed} from '@angular/core/testing';
import {PluginCommonModule} from "@dontcode/plugin-common";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ShopHandlerComponent} from "../../preview/shop/shop-handler.component";
import {HttpClient} from "@angular/common/http";
import {expectOneSampleFile} from "./easy-para-scrapper.spec";
import {NewPharmaScrapper} from "./new-pharma-scrapper";
import {WebEcologieScrapper} from "./web-ecologie-scrapper";
import {BoulangerScrapper} from "./boulanger-scrapper";
import {CDiscountScrapper} from "./cdiscount-scrapper";

describe('CDiscountScrapper', () => {
  let component: CDiscountScrapper;
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
    component = new CDiscountScrapper(httpClient);
  });

  it('should search', (done) => {
    expect(component).toBeTruthy();
    component.searchProductsForName("Doro 8080 smartphone").then(value => {
      expect(value.length>0).toBeTruthy();
      expect(value[0].productName).toEqual("DORO - Smartphone 8050 PLUS");
      expect(value[0].productPrice).toEqual (210.64);
      expect(value[0].productId).toEqual("DOR7322460078355");
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("cdiscount/doro-8080-smartphone-search.html", httpTestingController);
  });

  it('should get price', (done) => {
    expect(component).toBeTruthy();
    component.updatePrice({
      productId:"1177036",
      productName:"Smartphone DORO 8100 Plus Graphite"
    }).then(value => {
      expect(value?.productPrice).toEqual(229);
      expect(value?.currencyCode).toEqual("EUR");
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("cdiscount/doro-8080-smartphone-search.html", httpTestingController);
  });

});

