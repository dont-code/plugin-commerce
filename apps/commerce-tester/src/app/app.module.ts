/*
 * This RemoteEntryModule is imported here to allow TS to find the Module during
 * compilation, allowing it to be included in the built bundle. This is required
 * for the Module Federation Plugin to expose the Module correctly.
 * */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuUpdater, SANDBOX_MENUS, SandboxModule} from '@dontcode/sandbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {CommerceModule} from '@dontcode/plugin-commerce';
import {PluginCommonModule} from '@dontcode/plugin-common';
import {TestUrlComponent} from './routes/test-url/test-url.component';
import {MenuItem, PrimeIcons} from "primeng/api";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";

const appRoutes: Routes = [{ path: 'testUrl', component: TestUrlComponent }];


export class CustomMenu implements MenuUpdater {
  additionalMenus(): MenuItem[] {
    return [
      { label: 'Test Url', icon: 'pi pi-question-circle', routerLink: ['testUrl'] },
    ];
  }

}

@NgModule({
  declarations: [AppComponent, TestUrlComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: false, // <-- debugging purposes only
      useHash: true,
      relativeLinkResolution: 'corrected',
      initialNavigation: 'enabledBlocking',
    }),
    FormsModule,
    ButtonModule,
    InputTextModule,
    PluginCommonModule.forRoot(),
    SandboxModule.forRoot({
      webSocketUrl: environment.webSocketUrl,
      indexedDbName: 'Commerce Plugin Tester',
      applicationName: 'Commerce Plugin Tester',
      theme: 'orange',
      templateFileUrl: 'assets/dev/templates.json',
    }),
    CommerceModule
  ],
  providers: [ {
    provide: SANDBOX_MENUS, useClass: CustomMenu
  }],
  bootstrap: [AppComponent]
})

export class AppModule {}
