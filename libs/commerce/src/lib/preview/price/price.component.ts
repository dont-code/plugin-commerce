import {ChangeDetectorRef, Component, Injector, TemplateRef, ViewChild} from '@angular/core';
import {
  AbstractDynamicComponent,
  AbstractDynamicLoaderComponent,
  ComponentLoaderService,
  DynamicComponent,
  DynamicEventType,
  PossibleTemplateList,
  TemplateList
} from '@dontcode/plugin-common';
import {FormControl} from "@angular/forms";
import {Price, PriceFinderService} from "../../shared/services/price-finder.service";
import {AbstractOnlineShopScrapper, ScrappedProduct} from "../../shared/online-shop-scrapper";

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

  override value: Price;

  productSelectionMode=false;
  listOfSelectableProducts = new Array<ScrappedProduct>();

  constructor(loader: ComponentLoaderService,protected priceFinder:PriceFinderService,
              injector: Injector, ref: ChangeDetectorRef) {
    super (loader, injector, ref);
    this.defineSubField ('cost', 'Other currency');
    this.defineSubField ('date', 'Date & Time');
    this.defineSubField ('shop', 'Shop');
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
    this.priceFinder.updatePriceIfPossible(val, this.parentPosition??'').then(newPrice => {
      if (newPrice!=null) {
        this.value.price = newPrice;
        this.value.date = new Date();
      }
    });
  }

  override createAndRegisterFormControls (): void {
    let control = new FormControl (null, {updateOn:'blur'});
    this.form.registerControl('productName', control);
    control = new FormControl (null, {updateOn:'blur'});
    this.form.registerControl('productId', control);
  }

  cannotUpdatePrice():boolean {
    if ((this.value!=null) && (this.value.shop!=null) && (this.value.productName!=null)) {
      return false;
    }
    return true;
  }

  updatePrice() {
    if( this.value?.productId==null) {
/*      const testProduct = new ScrappedProduct();
      testProduct.productName="Test Product";
      testProduct.productId="TEST-PRODUCT";
      testProduct.currencyCode="EUR";
      testProduct.productPrice=12;
      this.selectedProduct(testProduct);*/
      if ((this.value.productName!=null) && (this.value.shop!=null)) {
        // We have to let the use select the product
        this.priceFinder.searchProducts(this.value.productName, this.value.shop).then(value => {
          if( value!=null) {
            this.listOfSelectableProducts = value;
            this.productSelectionMode=true;
            this.ref.markForCheck();
            this.ref.detectChanges();
          }
        });
      }
    } else if (this.value.shop!=null) {
      this.priceFinder.findPrice(this.value, this.value.shop, this.parentPosition??"").then (newPrice => {
        if (newPrice!=null) {
          this.setSubFieldValue('cost', newPrice);
          this.setSubFieldValue('date', new Date());
        }
      })
    }
  }

  selectedProduct(product: ScrappedProduct) {
    this.productSelectionMode=false;
    this.value.productId=product.productId;
    this.value.productName=product.productName??undefined;
    this.hydrateValueToForm();
    this.setSubFieldValue("cost", AbstractOnlineShopScrapper.toMoneyAmount(product));
    this.setSubFieldValue('date', new Date());
    this.value.price=this.getSubFieldValue("cost");
    this.value.date = this.getSubFieldValue('date');
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
    delete this.value.productId;
    this.hydrateValueToForm();
  }

}
