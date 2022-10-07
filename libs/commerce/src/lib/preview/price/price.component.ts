import {ChangeDetectorRef, Component, Injector, TemplateRef, ViewChild} from '@angular/core';
import {ComponentLoaderService, PossibleTemplateList, SubFieldInfo, TemplateList} from '@dontcode/plugin-common';
import {AbstractDynamicLoaderComponent} from "@dontcode/plugin-common";
import {FormControl} from "@angular/forms";

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

  constructor(loader: ComponentLoaderService,
              injector: Injector, ref: ChangeDetectorRef) {
    super (loader, injector, ref);
    this.defineSubField ('price', 'Other currency');
  }

  override createAndRegisterFormControls (): void {
    this.form.registerControl('shop', new FormControl(null, {updateOn:"blur"}));
  }

  providesTemplates(key?: string): TemplateList {
    return new TemplateList(this.inlineView, null, this.fullEditView);
  }
  canProvide(key?: string): PossibleTemplateList {
    return new PossibleTemplateList(true, false, true);
  }

}
