import {Component, TemplateRef, ViewChild} from '@angular/core';
import {AbstractDynamicComponent, PossibleTemplateList, TemplateList} from '@dontcode/plugin-common';
import {FormControl} from "@angular/forms";
import {PriceFinderService} from "../../shared/services/price-finder.service";

@Component({
  selector: 'dontcode-commerce-shop-type',
  templateUrl: './shop-handler.component.html',
  styleUrls: ['./shop-handler.component.scss']
})
export class ShopHandlerComponent extends AbstractDynamicComponent {

  @ViewChild('inlineView', { static: true })
  private inlineView!: TemplateRef<any>;

  @ViewChild('fullEditView', { static: true })
  private fullEditView!: TemplateRef<any>;
  shopTypes = new Array<string>();

  constructor(protected priceFinder:PriceFinderService) {
    super ();
    this.shopTypes=this.priceFinder.getListOfShopTypes();
  }

  override createAndRegisterFormControls (): void {
    this.form.registerControl(this.name, new FormControl(null, {updateOn:"change"}));
  }

  providesTemplates(key?: string): TemplateList {
    return new TemplateList(this.inlineView, null, this.fullEditView);
  }

  canProvide(key?: string): PossibleTemplateList {
    return new PossibleTemplateList(true, false, true);
  }

  displayableValue():string {
    const ret= AbstractDynamicComponent.toBeautifyString (this.value);
    if (ret==null)  return "";
    else return ret;
  }

  searchForComponent (name:string) {
  /*.subscribe({
      error: err => {
        console.error("Cannot search in "+this.onlineShopName+" because of error ", err);

      }
    });*/
  }
}