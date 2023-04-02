import {ChangeDetectorRef, Component, Optional} from '@angular/core';
import {AbstractReferenceComponent} from '@dontcode/plugin-common';
import {DontCodeModelManager, DontCodeStoreManager} from "@dontcode/core";
import {CommercePlugin} from "../../declaration/commerce-plugin";

/**
 * Display and enable selection of a shop.
 * Shops are found by listing all entities that are managed with the Entity definition 'Online Shop'
 */
@Component({
  selector: 'dontcode-commerce-shop',
  templateUrl: './shop-handler.component.html',
  styleUrls: ['./shop-handler.component.scss']
})
export class ShopHandlerComponent extends AbstractReferenceComponent {

  constructor(@Optional() modelMgr:DontCodeModelManager, @Optional() storeMgr:DontCodeStoreManager) {
    super (modelMgr, storeMgr);
    // Manages the list of Shops
    this.setTargetEntitiesWithName(CommercePlugin.SHOP_ENTITY_NAME, 'Shop');
  }

  override setValue(val: any) {
    if( val == null) {
      // No value set, let's try to guess one
      const form=this.getForm();
      const parentForm=form?.parent;
      if( (parentForm != null) && (!Array.isArray(parentForm.controls))) {
          // The parent is a FormGroup and not a FormArray
        for (const controlKey in parentForm.controls) {

          if( parentForm.controls[controlKey]===form) {
            // The name of the price is this one
            val=controlKey;
          }
        }
      }

    }
    super.setValue(val);
  }

}
