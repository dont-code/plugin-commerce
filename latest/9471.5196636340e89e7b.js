(self.webpackChunkcommerce_tester=self.webpackChunkcommerce_tester||[]).push([[9471],{99471:(W,_,r)=>{r.r(_);var v=r(78940),e=r(30549),h=r(26677),f=r(57863),x=r(84774);function b(o,t){1&o&&(e.\u0275\u0275elementStart(0,"div"),e.\u0275\u0275element(1,"dontcode-sandbox-main"),e.\u0275\u0275elementEnd())}function P(o,t){1&o&&(e.\u0275\u0275elementStart(0,"div"),e.\u0275\u0275element(1,"router-outlet"),e.\u0275\u0275elementEnd())}class p extends h.BaseAppComponent{}p.\u0275fac=function(){let o;return function(n){return(o||(o=e.\u0275\u0275getInheritedFactory(p)))(n||p)}}(),p.\u0275cmp=e.\u0275\u0275defineComponent({type:p,selectors:[["dontcode-commerce-root"]],features:[e.\u0275\u0275InheritDefinitionFeature],decls:2,vars:2,consts:[[4,"ngIf"]],template:function(t,n){1&t&&(e.\u0275\u0275template(0,b,2,0,"div",0),e.\u0275\u0275template(1,P,2,0,"div",0)),2&t&&(e.\u0275\u0275property("ngIf",n.mainTab()),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",!n.mainTab()))},dependencies:[f.NgIf,x.RouterOutlet,h.MainComponent]});var I=r(39694);var C=r(16602),d=r(62314),R=r(64264),U=r(92256),l=r(27022),g=r(24504),M=r(49162),y=r(30178),T=r(96222);function B(o,t){if(1&o&&(e.\u0275\u0275elementStart(0,"div")(1,"p"),e.\u0275\u0275text(2),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"p"),e.\u0275\u0275text(4),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"p"),e.\u0275\u0275text(6,"Text: "),e.\u0275\u0275element(7,"textarea",16),e.\u0275\u0275elementEnd()()),2&o){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate1("Status: ",n.testResponse.status,""),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate1("Size: ",null==n.testResponse.body?null:n.testResponse.body.length,""),e.\u0275\u0275advance(3),e.\u0275\u0275property("autoResize",!0)("disabled",!0)("value",n.limitedTextResult())}}function j(o,t){if(1&o&&(e.\u0275\u0275elementStart(0,"div")(1,"p"),e.\u0275\u0275text(2),e.\u0275\u0275elementEnd()()),2&o){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate1("Error: ",n.testError,"")}}class m{constructor(t,n){this.httpClient=t,this.ref=n,this.testUrl=null,this.testResponse=null,this.testError=null,this.subscription=new U.Subscription,this.ProxyEngine=d.ProxyEngine,this.proxy=d.ProxyEngine.DONT_CODE.valueOf(),this.scrapper=new d.DynamicProxyScrapper(t)}tryUrl(){null!=this.testUrl&&this.scrapper.callUrlWithProxy(this.testUrl,this.proxy).then(t=>{this.testResponse=t,this.testError=null,console.debug("Result for "+this.testUrl+":",this.testResponse),this.ref.markForCheck(),this.ref.detectChanges()}).catch(t=>{this.testError=t instanceof C.HttpErrorResponse?t.message:t.toString(),this.testResponse=null,console.error("Error loading testUrl "+this.testUrl+":",t),this.ref.markForCheck(),this.ref.detectChanges()})}isTestError(){return null!=this.testError}ngOnDestroy(){this.subscription.unsubscribe()}limitedTextResult(){return null!=this.testResponse?.body?this.testResponse.body.substring(0,Math.min(5e3,this.testResponse.body.length)):""}}m.\u0275fac=function(t){return new(t||m)(e.\u0275\u0275directiveInject(C.HttpClient),e.\u0275\u0275directiveInject(e.ChangeDetectorRef))},m.\u0275cmp=e.\u0275\u0275defineComponent({type:m,selectors:[["dontcode-test-url"]],decls:33,vars:13,consts:[[1,"formgrid","grid"],[1,"field","col"],["for","url-to-try"],["id","url-to-try","type","text","pInputText","",1,"w-full",3,"ngModel","ngModelChange"],[1,"flex","align-items-center"],["id","dontcode-proxy","name","engine",3,"value","ngModel","ngModelChange"],["for","dontcode-proxy"],["id","dontcode-chrome-proxy","name","engine",3,"value","ngModel","ngModelChange"],["for","dontcode-chrome-proxy"],["id","corsio-proxy","name","engine",3,"value","ngModel","ngModelChange"],["for","corsio-proxy"],["id","cors-org-proxy","name","engine",3,"value","ngModel","ngModelChange"],["id","web-scraping-proxy","name","engine",3,"value","ngModel","ngModelChange"],["for","web-scraping-proxy"],["pButton","","type","button","label","Try",3,"click"],[4,"ngIf"],["pInputTextarea","","cols","100","rows","30",3,"autoResize","disabled","value"]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"h1"),e.\u0275\u0275text(1,"Price Check url tester"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(2,"div",0)(3,"div",1)(4,"label",2),e.\u0275\u0275text(5,"Url of the search query:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(6,"input",3),e.\u0275\u0275listener("ngModelChange",function(a){return n.testUrl=a}),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(7,"div",1)(8,"div",4)(9,"p-radioButton",5),e.\u0275\u0275listener("ngModelChange",function(a){return n.proxy=a}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(10,"label",6),e.\u0275\u0275text(11,"Dont-code Proxy:"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(12,"div",4)(13,"p-radioButton",7),e.\u0275\u0275listener("ngModelChange",function(a){return n.proxy=a}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(14,"label",8),e.\u0275\u0275text(15,"Dont-code Chrome Proxy:"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(16,"div",4)(17,"p-radioButton",9),e.\u0275\u0275listener("ngModelChange",function(a){return n.proxy=a}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(18,"label",10),e.\u0275\u0275text(19,"Cors.io Proxy:"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(20,"div",4)(21,"p-radioButton",11),e.\u0275\u0275listener("ngModelChange",function(a){return n.proxy=a}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(22,"label",10),e.\u0275\u0275text(23,"Cors.org Proxy:"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(24,"div",4)(25,"p-radioButton",12),e.\u0275\u0275listener("ngModelChange",function(a){return n.proxy=a}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(26,"label",13),e.\u0275\u0275text(27,"WebScraping.ia Proxy:"),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(28,"button",14),e.\u0275\u0275listener("click",function(){return n.tryUrl()}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(29,"p"),e.\u0275\u0275text(30,"Result:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(31,B,8,5,"div",15),e.\u0275\u0275template(32,j,3,1,"div",15)),2&t&&(e.\u0275\u0275advance(6),e.\u0275\u0275property("ngModel",n.testUrl),e.\u0275\u0275advance(3),e.\u0275\u0275property("value",n.ProxyEngine.DONT_CODE)("ngModel",n.proxy),e.\u0275\u0275advance(4),e.\u0275\u0275property("value",n.ProxyEngine.CHROME_ENGINE)("ngModel",n.proxy),e.\u0275\u0275advance(4),e.\u0275\u0275property("value",n.ProxyEngine.CORSPROXY_IO)("ngModel",n.proxy),e.\u0275\u0275advance(4),e.\u0275\u0275property("value",n.ProxyEngine.CORSPROXY_ORG)("ngModel",n.proxy),e.\u0275\u0275advance(4),e.\u0275\u0275property("value",n.ProxyEngine.WEBSCRAPING_IA)("ngModel",n.proxy),e.\u0275\u0275advance(6),e.\u0275\u0275property("ngIf",n.testResponse),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isTestError))},dependencies:[f.NgIf,l.DefaultValueAccessor,l.NgControlStatus,l.NgModel,g.ButtonDirective,M.InputText,y.InputTextarea,T.RadioButton]});var S=r(15861),N=r(46346);function A(o,t){if(1&o&&(e.\u0275\u0275elementContainerStart(0),e.\u0275\u0275elementStart(1,"p"),e.\u0275\u0275text(2,"Price:"),e.\u0275\u0275element(3,"p-inputNumber",2),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementContainerEnd()),2&o){const n=e.\u0275\u0275nextContext();let s;e.\u0275\u0275advance(3),e.\u0275\u0275property("currency",null!==(s=null==n.price.cost?null:n.price.cost.currencyCode)&&void 0!==s?s:"")("ngModel",null==n.price.cost?null:n.price.cost.amount)}}function F(o,t){if(1&o&&(e.\u0275\u0275elementContainerStart(0),e.\u0275\u0275text(1,"Error: "),e.\u0275\u0275elementStart(2,"textarea",3),e.\u0275\u0275text(3),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementContainerEnd()),2&o){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(n.displayableError())}}class i{constructor(t,n){this.priceFinder=t,this.ref=n,this.shopName="",this.productName="",this.price={},this.displayPrice=!1,this.priceError=null}checkPrice(){var t=this;return(0,S.Z)(function*(){t.price={nameInShop:t.productName,shop:t.shopName};try{const n=yield t.priceFinder.searchProducts(t.productName,t.shopName);if(0==n.length)throw new Error("No product found with name "+t.productName+" in the shop "+t.shopName);{t.price.idInShop=n[0].productId;const s=yield t.priceFinder.findPrice(t.price,t.shopName,"");t.priceError="",null!=s&&null!=s.cost?(t.price=s,t.displayPrice=!0,t.priceError=null):(t.displayPrice=!1,t.priceError="No Price found"),t.ref.markForCheck(),t.ref.detectChanges()}}catch(n){t.priceError=n.message??n,t.displayPrice=!1,t.price={inError:!0},t.ref.markForCheck(),t.ref.detectChanges()}})()}displayableError(){return JSON.stringify(this.priceError)}}i.\u0275fac=function(t){return new(t||i)(e.\u0275\u0275directiveInject(d.PriceFinderService),e.\u0275\u0275directiveInject(e.ChangeDetectorRef))},i.\u0275cmp=e.\u0275\u0275defineComponent({type:i,selectors:[["dontcode-test-scrapper"]],inputs:{shopName:"shopName",productName:"productName"},decls:6,vars:4,consts:[[3,"onClick"],[4,"ngIf"],["mode","currency",3,"currency","ngModel"],["cols","80","pInputTextarea",""]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"p"),e.\u0275\u0275text(1),e.\u0275\u0275elementStart(2,"p-button",0),e.\u0275\u0275listener("onClick",function(){return n.checkPrice()}),e.\u0275\u0275text(3,"Check Price"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275template(4,A,4,2,"ng-container",1),e.\u0275\u0275template(5,F,4,1,"ng-container",1)),2&t&&(e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate2("",n.productName," @ ",n.shopName," "),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngIf",n.displayPrice),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",null!==n.priceError))},dependencies:[f.NgIf,l.NgControlStatus,l.NgModel,g.Button,y.InputTextarea,N.InputNumber]});class u{constructor(){this.listOfTestComponents=new e.QueryList}checkAllPrices(){var t=this;return(0,S.Z)(function*(){for(const n of t.listOfTestComponents)yield n.checkPrice()})()}}u.\u0275fac=function(t){return new(t||u)},u.\u0275cmp=e.\u0275\u0275defineComponent({type:u,selectors:[["dontcode-test-scrappers"]],viewQuery:function(t,n){if(1&t&&e.\u0275\u0275viewQuery(i,5),2&t){let s;e.\u0275\u0275queryRefresh(s=e.\u0275\u0275loadQuery())&&(n.listOfTestComponents=s)}},decls:12,vars:0,consts:[[3,"onClick"],["productName","Chardon Marie","shopName","EasyParapharmacie"],["productName","Chardon Marie","shopName","NewPharma"],["productName","Chardon Marie","shopName","WebEcologie"],["productName","Chardon Marie","shopName","Onatera"],["productName","Apple Watch 8","shopName","Boulanger"],["productName","Apple Watch 8","shopName","Amazon"],["productName","Apple Watch 8","shopName","Fnac"],["productName","Apple Watch 8","shopName","Darty"],["productName","Apple Watch 8","shopName","CDiscount"],["productName","Lugat Bio","shopName","Maxicoffee"]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"p-button",0),e.\u0275\u0275listener("onClick",function(){return n.checkAllPrices()}),e.\u0275\u0275text(1,"Check All Prices"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(2,"dontcode-test-scrapper",1)(3,"dontcode-test-scrapper",2)(4,"dontcode-test-scrapper",3)(5,"dontcode-test-scrapper",4)(6,"dontcode-test-scrapper",5)(7,"dontcode-test-scrapper",6)(8,"dontcode-test-scrapper",7)(9,"dontcode-test-scrapper",8)(10,"dontcode-test-scrapper",9)(11,"dontcode-test-scrapper",10))},dependencies:[g.Button,i]});var O=r(22119),k=r(6587);const D=[{path:"testUrl",component:m},{path:"testScrappers",component:u}];class c{}c.\u0275fac=function(t){return new(t||c)},c.\u0275mod=e.\u0275\u0275defineNgModule({type:c,bootstrap:[p]}),c.\u0275inj=e.\u0275\u0275defineInjector({providers:[{provide:h.SANDBOX_MENUS,useClass:class L{additionalMenus(){return[{label:"Test Scrappers",icon:"pi pi-server",routerLink:["testScrappers"]},{label:"Test Url",icon:"pi pi-question-circle",routerLink:["testUrl"]}]}}}],imports:[v.BrowserModule,I.BrowserAnimationsModule,C.HttpClientModule,x.RouterModule.forRoot(D,{enableTracing:!1,useHash:!0,initialNavigation:"enabledBlocking"}),l.FormsModule,g.ButtonModule,M.InputTextModule,R.PluginCommonModule.forRoot(),h.SandboxModule.forRoot({webSocketUrl:"",indexedDbName:"Commerce Plugin Tester",applicationName:"Commerce Plugin Tester",theme:"orange",templateFileUrl:"assets/dev/templates.json"}),O.FieldsModule,d.CommerceModule,y.InputTextareaModule,l.ReactiveFormsModule,N.InputNumberModule,k.CheckboxModule,T.RadioButtonModule]}),(0,e.enableProdMode)(),v.platformBrowser().bootstrapModule(c).catch(o=>console.error(o))}}]);