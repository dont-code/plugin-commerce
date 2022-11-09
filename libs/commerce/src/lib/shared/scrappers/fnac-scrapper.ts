import {AbstractOnlineShopScrapper, ScrappedProduct} from "../online-shop-scrapper";
import {firstValueFrom, map} from "rxjs";

export class FnacScrapper extends AbstractOnlineShopScrapper {

  static readonly SEARCH_ONLINE_URL="https://www.fnac.com/SearchResult/ResultList.aspx?SCat=0&Search=QUERY_STRING&sft=1&sa=0";
  protected static readonly PRODUCT_START_STRING='<div class="clearfix Article-item';

  protected static readonly BASE_URL='https://www.fnac.com'

  override onlineShopName="Fnac";

  searchProductsForName(name: string): Promise<Array<ScrappedProduct>> {
    // remove accents
    const words=name.split(" ");
    let encodedName = "";
    for (const word of words) {
      encodedName+=encodeURIComponent(word)+"+";
    }
    if( words.length>=1) {
      // Remove the last +
      encodedName=encodedName.substring(0, encodedName.length-1);
    }
    const query = FnacScrapper.SEARCH_ONLINE_URL.replace("QUERY_STRING", encodedName);

    return firstValueFrom(this.http.get(this.encodeUrlForCors(query)
    ,{headers:{Accept:'text/html'}, responseType:"text", observe:"body"}).pipe (
        map(htmlResult => {

          const ret= new Array<ScrappedProduct>();
          let startPos = htmlResult.indexOf(FnacScrapper.PRODUCT_START_STRING);
          let nextStartPos = htmlResult.indexOf(FnacScrapper.PRODUCT_START_STRING, startPos+1);
          while (startPos>=0) {
            const newProduct = new ScrappedProduct();
            let itemPos = this.safeIndexOf (htmlResult,'id="', startPos, nextStartPos);
            newProduct.productId=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            let middlePos = this.safeIndexOf(htmlResult, '<img class="Article-itemVisualImg', startPos, nextStartPos);
            itemPos = this.safeIndexOf(htmlResult, 'src="', middlePos, nextStartPos);
            newProduct.productImageUrl=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            itemPos = this.safeIndexOf(htmlResult,'alt="', middlePos, nextStartPos);
            newProduct.productName=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));
            newProduct.productDescription=undefined;

            middlePos = this.safeIndexOf(htmlResult, '<p class="Article-desc', startPos, nextStartPos);
            itemPos = this.safeIndexOf(htmlResult, 'href="', middlePos, nextStartPos);
            newProduct.productUrl=htmlResult.substring(itemPos, htmlResult.indexOf('"', itemPos+1));

            itemPos = htmlResult.indexOf('vendeur partenaire', startPos);
            if( (itemPos!=-1) && ((nextStartPos==-1) || (itemPos<nextStartPos))) {
              newProduct.marketPlace=true;
            } else {
              newProduct.marketPlace=false;
            }

            itemPos = htmlResult.indexOf('En stock', startPos);
            if( (itemPos!=-1) && ((nextStartPos==-1) || (itemPos<nextStartPos))) {
              newProduct.outOfStock=false;
            } else {
              newProduct.outOfStock=true;
            }

            this.extractPrice(htmlResult, startPos, newProduct, nextStartPos);
            this.checkScrappedProduct(name, newProduct);
            ret.push(newProduct);

            startPos = htmlResult.indexOf(FnacScrapper.PRODUCT_START_STRING, startPos+1);
            nextStartPos = htmlResult.indexOf(FnacScrapper.PRODUCT_START_STRING, startPos+1);
          }

          return ret;
        })
    ));
  }

  extractPrice (htmlResult:string, startPos:number, newProduct:ScrappedProduct, nextStartPos?:number): void {
      const itemPos = this.safeIndexOf(htmlResult, 'class="userPrice">', startPos, nextStartPos);

      const price = Number.parseInt(htmlResult.substring(itemPos, this.safeIndexOf(htmlResult, '<sup>', itemPos+1, nextStartPos)-5));
      const cents = Number.parseInt(htmlResult.substring(this.safeIndexOf(htmlResult, '</sup>', itemPos+1, nextStartPos)-2-6,this.safeIndexOf(htmlResult, '</sup>', itemPos+1, nextStartPos) ));

      newProduct.productPrice=price+cents/100;
      newProduct.currencyCode="EUR"
  }

  /**
   * We have to go directly to the product page, otherwise there may be a redirect
   * @param product
   */
  override updatePrice(product:ScrappedProduct, useProductName?:boolean): Promise<ScrappedProduct|null> {
    if (product.productUrl==null) {
      return super.updatePrice(product, true);
    }
    return firstValueFrom(this.http.get(this.encodeUrlForCors(product.productUrl)
      ,{headers:{Accept:'text/html'}, responseType:"text", observe:"body"}).pipe (
      map(htmlResult => {
        const newProduct:ScrappedProduct = {productId:product.productId,
          productName:product.productName};

        const middlePos = this.safeIndexOf(htmlResult, 'userPrice',0 );

        const itemPos = this.safeIndexOf(htmlResult, 'data-price="', middlePos);
        newProduct.productPrice=Number.parseFloat(htmlResult.substring(itemPos, this.safeIndexOf(htmlResult, '"', itemPos+1))
          .replace(',','.'));
        newProduct.currencyCode='EUR';
        this.checkScrappedProduct(product.productName??"", newProduct);
        product.productPrice=newProduct.productPrice;
        product.currencyCode=newProduct.currencyCode;
        return product;
      }))
    ).catch(error => {
      console.error("Error trying to access page for product "+product.productName, error);
      return super.updatePrice(product, true);
    });

  }
}
