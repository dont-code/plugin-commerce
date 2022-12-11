import {AbstractOnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {firstValueFrom, map} from "rxjs";
import {HttpClient} from "@angular/common/http";

export class GreenWeezScrapper extends AbstractOnlineShopScrapper {

  static readonly SEARCH_ONLINE_URL="https://54m7x8foua-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.5.1)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.37.2)%3B%20JS%20Helper%20(3.7.0)&x-algolia-api-key=cfeaf6e6789249fe1f028747beb65aea&x-algolia-application-id=54M7X8FOUA"
  static readonly BASE_URL="https://greenweez.com";

  protected static JSON_QUERY= {
    "requests":
      [{
      "indexName":"greenweez_france_prod_offers_fr_FR",
        "params":"hitsPerPage=102&clickAnalytics=true&filters=main%3D1%20AND%20has_parent_objectID%3D0&facetingAfterDistinct=true&attributesToRetrieve=%5B%22name%22%2C%22brands%22%2C%22medias%22%2C%22outer%22%2C%22lot%22%2C%22main%22%2C%22price_per_capacity%22%2C%22product_id%22%2C%22variant_id%22%2C%22price%22%2C%22origin%22%2C%22origin_price%22%2C%22main_category_tree%22%2C%22discount%22%2C%22committed_price%22%2C%22url%22%2C%22merchant%22%2C%22marketplace%22%2C%22quantity%22%2C%22attributes%22%2C%22stats%22%2C%22internal_reference%22%2C%22top%22%2C%22flags%22%2C%22delivery%22%2C%22capacity%22%5D&sortFacetValuesBy=count&query=QUERY_STRING&maxValuesPerFacet=30&page=0&highlightPreTag=__ais-highlight__&highlightPostTag=__%2Fais-highlight__&facets=%5B%22*%22%5D&tagFilters="
    }]
  };

  override onlineShopName="GreenWeez";

  constructor(http: HttpClient) {
    super(http);
    this.useCorsProxy=true;
  }

  searchProductsForName(name: string): Promise<Array<ScrappedProduct>> {
      // We copy the content
    let postContent=JSON.stringify(GreenWeezScrapper.JSON_QUERY);

    postContent = postContent.replace("QUERY_STRING", encodeURIComponent(name));
    postContent=JSON.parse(postContent);
    return firstValueFrom(this.http.post(this.encodeUrlForCors(GreenWeezScrapper.SEARCH_ONLINE_URL),
      postContent
    ,{withCredentials:false, responseType:"json", observe:"body"}).pipe (
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

                newProduct.productPrice=aResult.price;
                newProduct.currencyCode="EUR";
                newProduct.productName=aResult.name;
                newProduct.productDescription=undefined;
                newProduct.productId=aResult.internal_reference;
                newProduct.productUrl=GreenWeezScrapper.BASE_URL+aResult.url;
                newProduct.productImageUrl=this.findImageUrl (aResult.medias);

                this.checkScrappedProduct(name, newProduct);
                ret.push(newProduct);
              }
            }
          }

          return ret;
        })
    ));
  }

  findImageUrl (medias:Array<any>): string|undefined {
    for (const media of medias) {
      if (media.type=="image")
        return media.src;
    }
    return;
  }
}
