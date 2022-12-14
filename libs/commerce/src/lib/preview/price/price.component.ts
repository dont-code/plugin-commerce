import {ChangeDetectorRef, Component, Injector, TemplateRef, ViewChild} from '@angular/core';
import {
  AbstractDynamicLoaderComponent,
  ComponentLoaderService,
  DynamicComponent,
  DynamicEventType,
  PossibleTemplateList,
  TemplateList
} from '@dontcode/plugin-common';
import {FormControl} from "@angular/forms";
import { PriceFinderService} from "../../shared/services/price-finder.service";
import {AbstractOnlineShopScrapper, ScrappedProduct} from "../../shared/online-shop-scrapper";
import {PriceModel} from "../../shared/price-model";

@Component({
  selector: 'dontcode-commerce-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent extends AbstractDynamicLoaderComponent {

  @ViewChild('inlineView', { static: true })
  private inlineView!: TemplateRef<any>;

  @ViewChild('fullEditView', { static: true })
  private fullEditView!: TemplateRef<any>;

  override value: PriceModel;

  parsingError:{message?:string, url?:string, status?:number, content?:string}|null=null;

  productSelectionMode=false;
  listOfSelectableProducts = new Array<ScrappedProduct>();

  constructor(loader: ComponentLoaderService,protected priceFinder:PriceFinderService,
              injector: Injector, ref: ChangeDetectorRef) {
    super (loader, injector, ref);
    this.defineSubField ('cost', 'Other currency');
    this.defineSubField ('priceDate', 'Date & Time');
    this.defineSubField ('shop', 'Shop');
    this.defineSubField ('urlInShop', 'Website (url)');
    this.value={};
  }

  providesTemplates(key?: string): TemplateList {
    return new TemplateList(this.inlineView, null, this.fullEditView);
  }

  canProvide(key?: string): PossibleTemplateList {
    return new PossibleTemplateList(true, false, true);
  }

  override setValue(val: any) {
    super.setValue(val);
    if( val!=null) {
      this.priceFinder.updatePriceIfPossible(val, this.parentPosition??'').then(newPrice => {
        this.parsingError=null;
      }).catch(reason => {
        val.inError=true;
      });
    }
  }

  override createAndRegisterFormControls (): void {
    let control = new FormControl (null, {updateOn:'blur'});
    this.form.registerControl('nameInShop', control);
    control = new FormControl ({value:null, disabled:true}, {updateOn:'blur'});
    this.form.registerControl('idInShop', control);
  }

  cannotUpdatePrice():boolean {
    if ((this.value!=null) && (this.value.shop!=null) && (this.value.nameInShop!=null)) {
      return false;
    }
    return true;
  }

  updatePrice() {
    this.parsingError=null;
    if( this.value==null) return;

    if( this.value.idInShop==null) {
/*      const testProduct = new ScrappedProduct();
      testProduct.productName="Test Product";
      testProduct.productId="TEST-PRODUCT";
      testProduct.currencyCode="EUR";
      testProduct.productPrice=12;
      this.selectedProduct(testProduct);*/
      if ((this.value.nameInShop!=null) && (this.value.shop!=null)) {
        // We have to let the use select the product
        this.priceFinder.searchProducts(this.value.nameInShop, this.value.shop).then(value => {
          if( value!=null) {
            this.listOfSelectableProducts = value;
            this.productSelectionMode=true;
            this.ref.markForCheck();
            this.ref.detectChanges();
          }
        }).catch(reason => {
          this.parsingError=this.translateToError(reason);
          this.ref.markForCheck();
          this.ref.detectChanges();
        });
      }
    } else if (this.value.shop!=null) {
      this.priceFinder.findPrice(this.value, this.value.shop, this.parentPosition??"").then (newPrice => {
        if (newPrice!=null) {
          this.value.inError=false;
          this.setSubFieldValue('cost', newPrice.cost);
          this.setSubFieldValue('priceDate', new Date());
        }
      }).catch ((reason) => {
        this.value.inError=true;
        this.parsingError=this.translateToError(reason);
        this.ref.markForCheck();
        this.ref.detectChanges();
      });
    }
  }

  selectedProduct(product: ScrappedProduct|null) {
    this.productSelectionMode=false;
    if( product!=null) {
      this.value.idInShop=product.productId;
      this.value.nameInShop=product.productName??undefined;
      this.hydrateValueToForm();
      this.setSubFieldValue("cost", AbstractOnlineShopScrapper.toMoneyAmount(product));
      this.setSubFieldValue('priceDate', new Date());
      this.setSubFieldValue('urlInShop', product.productUrl);
      this.value.cost=this.getSubFieldValue("cost");
      this.value.priceDate = this.getSubFieldValue('priceDate');
      this.value.urlInShop = this.getSubFieldValue('urlInShop');
    } else {
      this.clearProduct();
    }
/*    this.ref.markForCheck();
    this.ref.detectChanges();*/
  }

  /**
   * Override this method to listen to shop name change
   * @param component
   * @param type
   * @param formName
   */
  override applyComponentToSubField(component: DynamicComponent, type: string, formName: string): boolean {
    const ret = super.applyComponentToSubField(component, type, formName);
    if (formName=='shop') {
      const valueChange = component.selectEventSourceFor(DynamicEventType.VALUE_CHANGE);
      if (valueChange!=null) {
        this.subscriptions.add(valueChange.eventSource.subscribe({
          next: (event) => {
            this.clearProduct ();
          }
        }));
      }
    }
    return ret;
  }

  clearProduct ():void {
    this.productSelectionMode=false;
    delete this.value.idInShop;
    this.parsingError=null;
    this.hydrateValueToForm();
  }

  productNameChanged(event: Event) {
    const inputEvent = event as InputEvent;
    this.productSelectionMode=false;
    this.parsingError=null;
  }

  protected translateToError(reason: any): any {

    const ret:any={};
    if( typeof reason === 'string') {
      ret.message=reason;
      return ret;
    }

    if (reason.status!=null) {
      ret.status=reason.status;
    }
    if (reason.statusText!=null) {
      ret.message=reason.statusText;
    } else if (reason.message!=null) {
      ret.message=reason.message;
    }
    if (reason.url!=null) {
      ret.url=reason.url;
    }
    if (reason.error!=null) {
      ret.content=reason.error;
    }
    if( ret.message==null)  {
      // Nothing found
      ret.message=reason.toString();
    }
    return ret;
  }
}
