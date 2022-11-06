import {TestBed} from '@angular/core/testing';
import {PluginCommonModule} from "@dontcode/plugin-common";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ShopHandlerComponent} from "../../preview/shop/shop-handler.component";
import {HttpClient} from "@angular/common/http";
import {expectOneSampleFile} from "./easy-para-scrapper.spec";
import {NewPharmaScrapper} from "./new-pharma-scrapper";
import {WebEcologieScrapper} from "./web-ecologie-scrapper";

describe('WebEcologieScrapper', () => {
  let component: WebEcologieScrapper;
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
    component = new WebEcologieScrapper(httpClient);
  });

  it('should search', (done) => {
    expect(component).toBeTruthy();
    component.searchProductsForName("Chardon Marie").then(value => {
      expect(value.length>0).toBeTruthy();
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("webecologie/chardon-marie-search.html", httpTestingController);
  });

  it('should get price', (done) => {
    expect(component).toBeTruthy();
    component.updatePrice({
      productId:"11622",
      productName:"Chardon Marie 20 Ampoules",
      productUrl:'https://www.webecologie.com/foie-vesicule-biliaire/11622-dietaroma-chardon-marie-20-ampoules-3460341503306.html'
    }).then(value => {
      expect(value?.productPrice).toEqual(13.55);
      expect(value?.currencyCode).toEqual("EUR");
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("webecologie/chardon-marie-product.html", httpTestingController);
  });

  it('should get price even with no product url', (done) => {
    expect(component).toBeTruthy();
    component.updatePrice({
      productId:"11622",
      productName:"Chardon Marie 20 Ampoules"
    }).then(value => {
      expect(value?.productPrice).toEqual(13.55);
      expect(value?.currencyCode).toEqual("EUR");
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("webecologie/chardon-marie-search.html", httpTestingController);
  });
});
