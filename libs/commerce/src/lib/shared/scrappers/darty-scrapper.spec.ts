import {TestBed} from '@angular/core/testing';
import {PluginCommonModule} from "@dontcode/plugin-common";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ShopHandlerComponent} from "../../preview/shop/shop-handler.component";
import {HttpClient} from "@angular/common/http";
import {expectOneSampleFile} from "./easy-para-scrapper.spec";
import {DartyScrapper} from "./darty-scrapper";

describe('DartyScrapper', () => {
  let component: DartyScrapper;
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
    component = new DartyScrapper(httpClient);
  });

  it('should search', (done) => {
    expect(component).toBeTruthy();
    component.searchProductsForName("Doro 8080 smartphone").then(value => {
      expect(value.length>0).toBeTruthy();
      expect(value[0].productName).toEqual("Doro Smartphone senior doro 8080 noir avec extension mémoire carte sd 32go");
      expect(value[0].productPrice).toEqual (371.80);
      expect(value[0].productId).toEqual("MK48285871");
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("darty/doro-8080-smartphone-search.html", httpTestingController);
  });

  it('should get price', (done) => {
    expect(component).toBeTruthy();
    component.updatePrice({
      productId:"MK48285871",
      productName:"Doro Smartphone senior doro 8080 noir avec extension mémoire carte sd 32go",
      productUrl:"https://darty.com/nav/achat/telephonie/telephone_mobile/mobile/doro_smartphone_senior_doro_8080_noir_avec_extension_memoire_carte_sd_32go__MK48285871.html"
    }).then(value => {
      expect(value?.productPrice).toEqual(371.80);
      expect(value?.currencyCode).toEqual("EUR");
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("darty/doro-8080-smartphone-product.html", httpTestingController);
  });

});

