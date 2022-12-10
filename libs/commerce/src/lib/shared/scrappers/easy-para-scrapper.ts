import {AbstractOnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {firstValueFrom, map} from "rxjs";
import {HttpClient} from "@angular/common/http";

export class EasyParaScrapper extends AbstractOnlineShopScrapper {

  static readonly SEARCH_ONLINE_URL="https://jhu6zvksfy-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%3B%20instantsearch.js%20(4.15.0)%3B%20Magento2%20integration%20(3.6.0)%3B%20JS%20Helper%20(3.4.4)&x-algolia-application-id=JHU6ZVKSFY&x-algolia-api-key=ODk4Y2JiMjAyYWIxNjI1NGJmYmQzNDQyYjBkMGViMDE4N2ZmYmMwZTUwYWFjNTJhNTlkMDBlNWFmYzAxZmJiYXRhZ0ZpbHRlcnM9"

  protected static JSON_QUERY= {
    "requests": [{
      "indexName": "prod_magento2_fr_products",
      "params": "highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&ruleContexts=%5B%22magento_filters%22%5D&hitsPerPage=24&query=QUERY_STRING&page=0&maxValuesPerFacet=20&facets=%5B%22filter_age_baby%22%2C%22filter_baby_teats_shape%22%2C%22filter_feminine_care%22%2C%22filter_foot%22%2C%22filter_gynaecology%22%2C%22filter_hair_color%22%2C%22filter_hair_needs%22%2C%22filter_hair_type%22%2C%22filter_level_of_spf%22%2C%22filter_mosquito_repellents%22%2C%22filter_part_of_body%22%2C%22filter_product_size%22%2C%22filter_texture%22%2C%22filter_type_of_hygiene%22%2C%22filter_type_of_milk%22%2C%22filter_type_of_shaving%22%2C%22filter_type_of_toothbrushes%22%2C%22filter_type_of_toothpastes%22%2C%22filter_veterinary%22%2C%22filter_wash%22%2C%22price.EUR.default%22%2C%22filter_virtual_category%22%2C%22manufacturer%22%2C%22product_rating%22%2C%22categories.level0%22%5D&tagFilters=&numericFilters=%5B%22visibility_search%3D1%22%5D"
    }]
  };

  override onlineShopName="EasyParapharmacie";


  constructor(http: HttpClient) {
    super(http);
    this.useCorsProxy=true;
  }

  searchProductsForName(name: string): Promise<Array<ScrappedProduct>> {
      // We copy the content
    let postContent=JSON.stringify(EasyParaScrapper.JSON_QUERY);

    postContent = postContent.replace("QUERY_STRING", encodeURIComponent(name));
    postContent=JSON.parse(postContent);
    return firstValueFrom(this.http.post(this.encodeUrlForCors(EasyParaScrapper.SEARCH_ONLINE_URL),
      postContent
    ,{responseType:"json", observe:"body"}).pipe (
        map(jsonResult => {
          if( typeof jsonResult == "string")
            jsonResult = JSON.parse(jsonResult);

          const ret= new Array<ScrappedProduct>();
          const result=(jsonResult as any).results as Array<any>;
          if (result.length>0) {
            const hits=result[0].hits as Array<any>;
            if( hits!=null) {
              for (const aResult of hits) {
                const newProduct = new ScrappedProduct();

                newProduct.productPrice=aResult.price.EUR.default;
                newProduct.currencyCode="EUR";
                newProduct.productName=aResult.name;
                newProduct.productDescription=aResult.short_description??aResult.description;
                newProduct.productId=aResult.ean_code?.toString();
                if (newProduct.productId==null) {
                  console.warn("Product "+newProduct.productName+" searched by "+name+" for Shop "+this.getOnlineShopName()+" has no ean_code, getting objectId instead");
                  newProduct.productId=aResult.objectID;
                }
                newProduct.productUrl=aResult.url;
                newProduct.productImageUrl=aResult.image_url;

                this.checkScrappedProduct(name, newProduct);
                ret.push(newProduct);
              }
            }
          }

          return ret;
        })
    ));
  }

}
