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

}
