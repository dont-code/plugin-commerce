import {TestBed} from '@angular/core/testing';
import {PluginCommonModule} from "@dontcode/plugin-common";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ShopHandlerComponent} from "../../preview/shop/shop-handler.component";
import {HttpClient} from "@angular/common/http";
import {expectOneSampleFile} from "../common-scrapper-test.spec";
import {AmazonScrapper} from "./amazon-scrapper";
import {AbstractOnlineShopScrapper} from "../online-shop-scrapper";

describe('AmazonScrapper', () => {
  let component: AmazonScrapper;
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
    component = new AmazonScrapper(httpClient);
  });

  it('should search', (done) => {
    expect(component).toBeTruthy();
    component.searchProductsForNameOrId("Doro 8080 smartphone", false).then(value => {
      expect(value.length>0).toBeTruthy();
      expect(value[4].productName).toEqual("Doro 8080 Smartphone 4G Débloqué pour Seniors avec Écran de 5.7&quot;, Caméra de 16MP, Touche d'Assistance avec Géolocalisation...".substring(0,60));
      expect(value[4].productPrice).toEqual (232);
      expect(value[4].productId).toEqual("B07XLV8VW9");
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("amazon/doro-8080-smartphone-search.html", httpTestingController,AbstractOnlineShopScrapper.CORS_PROXY_URL);
  });

  it('should get price', (done) => {
    expect(component).toBeTruthy();
    component.updatePrice({
      productId:"B07XLV8VW9",
      productName:"Doro 8080 Smartphone 4G Débloqué pour Seniors avec Écran"
    }).then(value => {
      expect(value?.productPrice).toEqual(232);
      expect(value?.currencyCode).toEqual("EUR");
      done();
    }).catch(error => {
      done (error);
    });
    expectOneSampleFile("amazon/doro-8080-smartphone-search.html", httpTestingController,AbstractOnlineShopScrapper.CORS_PROXY_URL);
  });

});

