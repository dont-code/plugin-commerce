(self.webpackChunkcommerce_tester=self.webpackChunkcommerce_tester||[]).push([[1969],{71969:(ve,V,g)=>{g.r(V),g.d(V,{AbstractDynamicComponent:()=>T,AbstractDynamicLoaderComponent:()=>N,AbstractPluginHandler:()=>de,AbstractReferenceComponent:()=>pe,BaseDynamicEvent:()=>Q,BaseDynamicEventSource:()=>B,BeautifierPipe:()=>k,COMMAND_PROVIDER:()=>j,CommonTestManager:()=>me,ComponentLoaderService:()=>S,DONT_CODE_CORE:()=>D,DONT_CODE_DOC_API_URL:()=>ce,DONT_CODE_STORE_API_URL:()=>ue,DynamicEventType:()=>P,DynamicInsertPoint:()=>L,EntityListManager:()=>W,EntityStoreService:()=>fe,PluginBaseComponent:()=>H,PluginCommonModule:()=>q,PluginCommonTestModule:()=>v,PluginHandlerHelper:()=>A,PossibleTemplateList:()=>G,SubFieldInfo:()=>b,TemplateList:()=>U,ValueService:()=>he});var I=g(15861),s=g(30549),w=g(27022),y=g(92256);new Error("timeout while waiting for mutex to become available"),new Error("mutex already locked");const K=new Error("request for lock canceled");class Z{constructor(n,e=K){this._value=n,this._cancelError=e,this._weightedQueues=[],this._weightedWaiters=[]}acquire(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);return new Promise((e,t)=>{this._weightedQueues[n-1]||(this._weightedQueues[n-1]=[]),this._weightedQueues[n-1].push({resolve:e,reject:t}),this._dispatch()})}runExclusive(n,e=1){return function(o,n,e,t){return new(e||(e=Promise))(function(r,l){function a(d){try{p(t.next(d))}catch(f){l(f)}}function u(d){try{p(t.throw(d))}catch(f){l(f)}}function p(d){d.done?r(d.value):function i(r){return r instanceof e?r:new e(function(l){l(r)})}(d.value).then(a,u)}p((t=t.apply(o,n||[])).next())})}(this,void 0,void 0,function*(){const[t,i]=yield this.acquire(e);try{return yield n(t)}finally{i()}})}waitForUnlock(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);return new Promise(e=>{this._weightedWaiters[n-1]||(this._weightedWaiters[n-1]=[]),this._weightedWaiters[n-1].push(e),this._dispatch()})}isLocked(){return this._value<=0}getValue(){return this._value}setValue(n){this._value=n,this._dispatch()}release(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);this._value+=n,this._dispatch()}cancel(){this._weightedQueues.forEach(n=>n.forEach(e=>e.reject(this._cancelError))),this._weightedQueues=[]}_dispatch(){var n;for(let e=this._value;e>0;e--){const t=null===(n=this._weightedQueues[e-1])||void 0===n?void 0:n.shift();if(!t)continue;const i=this._value,r=e;this._value-=e,e=this._value+1,t.resolve([i,this._newReleaser(r)])}this._drainUnlockWaiters()}_newReleaser(n){let e=!1;return()=>{e||(e=!0,this.release(n))}}_drainUnlockWaiters(){for(let n=this._value;n>0;n--)this._weightedWaiters[n-1]&&(this._weightedWaiters[n-1].forEach(e=>e()),this._weightedWaiters[n-1]=[])}}class x{constructor(n){this._semaphore=new Z(1,n)}acquire(){return o=this,n=void 0,t=function*(){const[,n]=yield this._semaphore.acquire();return n},new((e=void 0)||(e=Promise))(function(r,l){function a(d){try{p(t.next(d))}catch(f){l(f)}}function u(d){try{p(t.throw(d))}catch(f){l(f)}}function p(d){d.done?r(d.value):function i(r){return r instanceof e?r:new e(function(l){l(r)})}(d.value).then(a,u)}p((t=t.apply(o,n||[])).next())});var o,n,e,t}runExclusive(n){return this._semaphore.runExclusive(()=>n())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.isLocked()&&this._semaphore.release()}cancel(){return this._semaphore.cancel()}}var c=g(67138),E=g(2369),R=g(46674),F=g(57863),ee=g(3134);const te=["inlineView"],ne=["fullEditView"];function ie(o,n){if(1&o&&s.\u0275\u0275text(0),2&o){const e=s.\u0275\u0275nextContext();s.\u0275\u0275textInterpolate(e.value)}}function re(o,n){if(1&o&&(s.\u0275\u0275elementStart(0,"div"),s.\u0275\u0275text(1),s.\u0275\u0275elementEnd()),2&o){const e=s.\u0275\u0275nextContext(4);s.\u0275\u0275advance(1),s.\u0275\u0275textInterpolate1(" ",e.value," ")}}function oe(o,n){if(1&o&&s.\u0275\u0275template(0,re,2,1,"div",7),2&o){const e=s.\u0275\u0275nextContext(3);s.\u0275\u0275property("ngIf",e.value)}}function se(o,n){1&o&&s.\u0275\u0275text(0),2&o&&s.\u0275\u0275textInterpolate1(" ",n.$implicit," ")}function le(o,n){if(1&o){const e=s.\u0275\u0275getCurrentView();s.\u0275\u0275elementContainerStart(0,3),s.\u0275\u0275elementStart(1,"p-dropdown",4),s.\u0275\u0275listener("onChange",function(i){s.\u0275\u0275restoreView(e);const r=s.\u0275\u0275nextContext(2);return s.\u0275\u0275resetView(r.valueChanged(i))}),s.\u0275\u0275template(2,oe,1,1,"ng-template",5),s.\u0275\u0275template(3,se,1,1,"ng-template",6),s.\u0275\u0275elementEnd(),s.\u0275\u0275elementContainerEnd()}if(2&o){const e=s.\u0275\u0275nextContext(2);s.\u0275\u0275property("formGroup",e.form),s.\u0275\u0275advance(1),s.\u0275\u0275property("options",e.options)("formControlName",e.name)("filter",!0)("showClear",!0)("lazy",!0)}}function ae(o,n){if(1&o&&s.\u0275\u0275template(0,le,4,6,"ng-container",2),2&o){const e=s.\u0275\u0275nextContext();s.\u0275\u0275property("ngIf",e.form)}}let T=(()=>{class o{constructor(){this.parentPosition=null,this.subscriptions=new y.Subscription}setName(e){this.name=e}getValue(){return null!=this.form&&this.updateValueFromForm(),this.value}setValue(e){this.value=e,null!=this.form&&this.hydrateValueToForm()}setParentPosition(e){this.parentPosition=e}setForm(e){this.form=e,null!=this.form&&null!=this.name&&this.createAndRegisterFormControls()}getForm(){return this.form}createAndRegisterFormControls(){const e=new w.FormControl(null,{updateOn:"blur"});this.form.registerControl(this.name,e)}transformToFormGroupValue(e){return e}transformFromFormGroupValue(e){return e}hydrateValueToForm(){if(null!=this.name){const e=this.form.get(this.name);if(null==e)throw new Error("No form control for the name "+this.name);{const t=this.transformToFormGroupValue(this.value);e.setValue(t,{emitEvent:!1})}}}updateValueFromForm(){if(null==this.name)return!1;const e=this.form.get(this.name);if(null==e)throw new Error("No form control for the name "+this.name);return!!e.dirty&&(this.value=this.transformFromFormGroupValue(e.value),e.markAsPristine({onlySelf:!0}),!0)}static toBeautifyString(e,t){if(null==e)return null;let i="";switch(Array.isArray(e)&&(e=e[0]),typeof e){case"string":i=e;break;case"object":i=e instanceof Date?e.toLocaleDateString():JSON.stringify(e,null,2);break;case"undefined":break;default:i=e.toLocaleString()}return null!=t&&i.length>t&&(i=i.substring(0,t-3)+"..."),i}listEventSources(){return[]}selectEventSourceFor(e,t){const i=this.listEventSources();for(const r of i)if(r.type===e){if(null==t)return r;if(r.name==t)return r}return null}ngOnDestroy(){this.subscriptions.unsubscribe()}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=s.\u0275\u0275defineComponent({type:o,selectors:[["ng-component"]],decls:0,vars:0,template:function(e,t){},encapsulation:2}),o})(),j=new s.InjectionToken("Inject the current command provider interface");const D=new s.InjectionToken("Dont-code core object"),ue=new s.InjectionToken("DontCodeStoreApiUrl"),ce=new s.InjectionToken("DontCodeStoreDocUrl");let S=(()=>{class o{constructor(e,t,i,r){this.injector=e,this.dontCodeCore=t,this.previewMgr=i,this.provider=r,this.moduleMap=new Map,this.mutex=new x}getOrCreatePluginModuleRef(e){return this.mutex.acquire().then(t=>{try{let i=this.moduleMap.get(e);return i||(i=(0,s.createNgModule)((0,s.getNgModuleById)("dontcode-plugin/"+e),this.injector),i&&this.moduleMap.set(e,i)),i}finally{t()}})}loadPluginModule(e){return this.getOrCreatePluginModuleRef(e.class.source).then(t=>(null!=t&&this.dontCodeCore.initPlugins(),t))}insertComponentForFieldType(e,t){return this.insertComponent("creation/entities/fields/type",t,e)}insertComponent(e,t,i){let l,r=e.positionInSchema;r?(l=!0,i||(i=this.provider?.getJsonAt(e.position))):(l=!1,r=e);const a=this.previewMgr.retrieveHandlerConfig(r,i);return a?this.loadPluginModule(a).then(u=>{const p=u.instance.exposedPreviewHandlers().get(a.class.name);return this.createComponent(p,t,u,l?e:null)}).catch(u=>(console.error("Cannot load module because of ",u),Promise.reject("Cannot load module for source "+a.class.source+" because of "+u))):Promise.resolve(null)}createComponent(e,t,i,r){const u=t.createComponent(e,{injector:this.injector,ngModuleRef:i}).instance;if(u.initCommandFlow){if(!r)throw new Error("Component "+u.constructor.name+" is a PreviewHandler and parent position is missing.");if(!this.provider)throw new Error("Component "+u.constructor.name+" is a PreviewHandler and CommandProviderInterface is missing.");u.initCommandFlow(this.provider,r)}return u}registerModuleForTest(e,t){this.moduleMap.set(t,null==e.instance?(0,s.createNgModule)(e,this.injector):e)}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275inject(s.Injector),s.\u0275\u0275inject(D),s.\u0275\u0275inject(c.DontCodePreviewManager),s.\u0275\u0275inject(j,8))},o.\u0275prov=s.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"}),o})(),L=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275dir=s.\u0275\u0275defineDirective({type:o,selectors:[["dtcde-dynamic"]]}),o})(),N=(()=>{class o extends T{constructor(e,t,i){super(),this.loader=e,this.injector=t,this.ref=i,this.fields=new Array,this.fieldsMap=new Map,this.parentForm=null,this.componentInited=new y.ReplaySubject}defineSubField(e,t){const i=new b(e,t);this.addSubField(i)}getSubField(e){const t=this.fieldsMap.get(e);if(null!=t)return this.fields[t]}addSubField(e){const t=this.fields.push(e);return this.fieldsMap.set(e.name,t-1),t}getSubFields(){return this.fields}setForm(e){if(this.name){const t=new w.FormGroup({},{updateOn:"blur"});e.registerControl(this.name,t),super.setForm(t),this.parentForm=e}else super.setForm(e),this.parentForm=null;this.preloadSubFields()}hydrateValueToForm(){if(null==this.parentForm)super.hydrateValueToForm();else{let e=this.transformToFormGroupValue(this.value);for(const t in this.form.controls)null==this.fieldsMap.get(t)&&this.form.get(t)?.setValue(e&&e[t],{emitEvent:!1})}}updateValueFromForm(){if(null==this.parentForm)return super.updateValueFromForm();{let e=!1;for(const t in this.form.controls)if(null==this.fieldsMap.get(t)){const i=this.form.get(t);if(null!=i&&i.dirty){const r=this.transformFromFormGroupValue(i?.value);null==this.value&&(this.value={}),this.value[t]=r,e=!0,i.markAsPristine({onlySelf:!0})}}return e}}setValue(e){super.setValue(e);for(const t of this.fields)this.setSubFieldValue(t,null!=e?e[t.name]:void 0)}getValue(){let e=super.getValue();for(const t of this.fields){const i=this.getSubFieldValue(t);null!=i&&null==e&&(this.value={},e=this.value),e[t.name]!==i&&(e[t.name]=i)}return e}subFieldFullEditTemplate(e){const t="string"==typeof e?this.getSubField(e):e,i=t?.component;let r=null;if(null!=i&&(r=i.providesTemplates(t?.type).forFullEdit),null==e)throw new Error("No template for subField "+t?.name+" of component "+this.name);return r}subFieldInlineViewTemplate(e){const t="string"==typeof e?this.getSubField(e):e,i=t?.component;let r=null;if(null!=i&&(r=i.providesTemplates(t?.type).forInlineView),null==e)throw new Error("No template for subField "+t?.name+" of component "+this.name);return r}subFieldFullViewTemplate(e){const t="string"==typeof e?this.getSubField(e):e,i=t?.component;let r=null;if(null!=i&&(r=i.providesTemplates(t?.type).forFullView),null==e)throw new Error("No template for subField "+t?.name+" of component "+this.name);return r}loadSubField(e,t,i){const r="string"==typeof e?this.getSubField(e):e,l=r?.component;return null==l?this.loader.insertComponentForFieldType(t,this.dynamicInsertPoint).then(a=>null!=a?(this.prepareComponent(a,t,null!=r?r.name:null,i),a):null):Promise.resolve(l)}getSubFieldValue(e){const t="string"==typeof e?this.getSubField(e):e,i=t?.component;if(null!=i)return i.getValue();if(null!=this.form&&null!=t)return this.form.get(t.name)?.value;throw new Error("Cannot provide value for non existent subField "+e)}setSubFieldValue(e,t){const i="string"==typeof e?this.getSubField(e):e,r=i?.component;if(null!=r)r.setValue(t);else if(null!=this.form&&null!=i){const l={};let a=o.toBeautifyString(t);null==a&&(a=null),l[i.name]=a,this.form.patchValue(l,{emitEvent:!1})}}loadSubComponent(e,t,i,r){return new Promise((l,a)=>this.componentInited.subscribe({complete:()=>{l()},error:u=>{a(u)}})).then(()=>null==this.dynamicInsertPoint?null:this.loader.insertComponent(e,this.dynamicInsertPoint,r).then(l=>null!=l?this.prepareComponent(l,t,i,r):null))}prepareComponent(e,t,i,r){return i&&(null!=this.form&&(e.setName(i),e.setForm(this.form)),e.setValue(r)),e}applyComponentToSubField(e,t,i){let r=this.getSubField(i);return null==r?(r=new b(i,t,e),this.addSubField(r),!0):(r.component=e,!1)}ngAfterViewInit(){this.componentInited.complete(),this.preloadSubFields()}preloadSubFields(){if(null!=this.dynamicInsertPoint){let e=!1;for(const t of this.fields)null==t.component&&this.loadSubField(t.name,t.type,this.value?this.value[t.name]:void 0).then(r=>{null!=r&&this.applyComponentToSubField(r,t.type,t.name),null!=this.value&&!e&&(this.ref.detectChanges(),e=!0)})}}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275directiveInject(S),s.\u0275\u0275directiveInject(s.Injector),s.\u0275\u0275directiveInject(s.ChangeDetectorRef))},o.\u0275cmp=s.\u0275\u0275defineComponent({type:o,selectors:[["ng-component"]],viewQuery:function(e,t){if(1&e&&s.\u0275\u0275viewQuery(L,5,s.ViewContainerRef),2&e){let i;s.\u0275\u0275queryRefresh(i=s.\u0275\u0275loadQuery())&&(t.dynamicInsertPoint=i.first)}},features:[s.\u0275\u0275InheritDefinitionFeature],decls:0,vars:0,template:function(e,t){},encapsulation:2}),o})();class b{constructor(n,e,t){this.name=n,this.type=e,this.component=t}}class A{constructor(){this.subscriptions=new y.Subscription,this.entityPointer=null,this.provider=null,this.changeHandler=null,this.actionPerformer=null,this.mutex=new x}initCommandFlow(n,e,t,i){this.entityPointer=e,this.provider=n,this.changeHandler=t,null!=i?this.actionPerformer=i:null!=t.performAction&&(this.actionPerformer=t)}decomposeJsonToMultipleChanges(n,e){if("object"==typeof e&&this.provider){let t;const i=this.provider.getSchemaManager();for(const r in e)if(e.hasOwnProperty(r)){const l=i.generateSubSchemaPointer(n,r),a=i.locateItem(l.positionInSchema);a?.isArray()&&l.isProperty?this.decomposeJsonToMultipleChanges(l,e[r]):(t=new c.Change(c.ChangeType.RESET,n.position+"/"+r,e[r],l),!a&&t.pointer&&(t.pointer.isProperty=!1),null!=this.changeHandler&&this.changeHandler.handleChange(t))}}}initChangeListening(n){this.initOtherChangeListening(n,this.entityPointer)}initOtherChangeListening(n,e){if(!this.provider||!e)throw new Error("Cannot listen to change before initCommandFlow is called");{let t=e.position;!0!==n&&(t+="/?"),this.subscriptions.add(this.provider.receiveCommands(t).pipe((0,E.map)(i=>{null!=i.actionType?this.actionPerformer&&i.running?.next(this.actionPerformer.performAction(i)):this.changeHandler&&this.changeHandler.handleChange(i)})).subscribe())}}applyUpdatesToArray(n,e,t,i,r,l){return this.applyUpdatesToArrayAsync(n,e,t,i,(a,u)=>Promise.resolve(r(a,u)))}applyUpdatesToArrayAsync(n,e,t,i,r,l,a){return this.mutex.runExclusive(()=>{try{if(!this.provider)throw new Error("Cannot apply updates before initCommandFlow is called");t.pointer||(t.pointer=this.provider.calculatePointerFor(t.position)),l=l??this.entityPointer?.position,null!=i&&(l=l+"/"+i);const u=t.pointer.containerPosition===l;let p=u?t.pointer.lastElement:c.DontCodeModelPointer.lastElementOf(t.pointer.containerPosition)??null,d=t.pointer.isProperty?t.pointer.lastElement:null,f=null,M=null,m=-1,C=-1;switch(null!=p&&e.has(p)&&(m=e.get(p),M=n[m],f=(0,y.of)(M)),t.beforeKey&&(C=e.get(t.beforeKey)),t.type){case c.ChangeType.ADD:case c.ChangeType.UPDATE:case c.ChangeType.RESET:if(null!=d){if(!M||M&&(!a||!a(M,d,t.value))){const h=this.provider.getJsonAt(t.pointer.containerPosition),_=this.provider.calculatePointerFor(t.pointer.containerPosition);if(_.isProperty)throw new Error("A parent of a property "+t.pointer.position+" must be an array");f=(0,y.from)(r(_,h))}}else f=(0,y.from)(r(t.pointer,t.value));break;case c.ChangeType.MOVE:-1!==m&&u&&p&&(-1!==C&&C>m&&C--,n.splice(m,1),e.forEach((h,_)=>{h>m&&e.set(_,h-1)}),e.delete(p),m=-1);break;case c.ChangeType.DELETE:-1!==m&&u&&p&&(n.splice(m,1),e.forEach((h,_)=>{h>m&&e.set(_,h-1)}),e.delete(p)),f=null}return f?(0,y.firstValueFrom)(f.pipe((0,E.map)(h=>{if(-1!==m)n[m]=h;else if(-1!==C){if(n.splice(C,0,h),e.forEach((_,ye)=>{_>=C&&e.set(ye,_+1)}),null==p)throw new Error("Cannot set targetPos "+C+" without knowing the itemId");e.set(p,C)}else{if(n.push(h),null==p)throw new Error("Cannot set targetPos "+C+" without knowing the itemId");e.set(p,e.size)}return n}),(0,E.takeLast)(1),(0,E.catchError)(h=>Promise.reject(h)))):Promise.resolve(n)}catch(u){return Promise.reject(u)}})}unsubscribe(){this.subscriptions.unsubscribe()}performAction(n){var e=this;return(0,I.Z)(function*(){if(null==e.provider)return Promise.reject("No provider for the component at position "+e.entityPointer?.position);yield e.provider.sendCommand(n)})()}}let H=(()=>{class o extends N{constructor(e,t,i){super(e,t,i),this.pluginHelper=new A,this.entityPointer=null,this.provider=null}ngOnDestroy(){this.pluginHelper.unsubscribe(),super.ngOnDestroy()}updateValueOnFormChanges(){this.subscriptions.add(this.form.valueChanges.pipe((0,E.map)(e=>(this.getValue(),e))).subscribe())}initCommandFlow(e,t){this.entityPointer=t,this.provider=e,this.pluginHelper.initCommandFlow(e,t,this)}initChangeListening(e){this.pluginHelper.initChangeListening(e)}decomposeJsonToMultipleChanges(e,t){this.pluginHelper.decomposeJsonToMultipleChanges(e,t)}decodeStringField(e,t){if(e.pointer?.lastElement===t)return e.value}applyUpdatesToArray(e,t,i,r,l,a,u){return this.applyUpdatesToArrayAsync(e,t,i,r,(p,d)=>Promise.resolve(l(p,d)),a)}applyUpdatesToArrayAsync(e,t,i,r,l,a,u){return this.pluginHelper.applyUpdatesToArrayAsync(e,t,i,r,l,a,u)}updateSubFieldsWithChange(e,t,i){return this.applyUpdatesToArrayAsync(this.fields,this.fieldsMap,e,t,(r,l)=>this.loadSubComponent(r,l.type,l.name).then(a=>new b(l.name,l.type,a??void 0)),i,(r,l,a)=>l===c.DontCodeModel.APP_FIELDS_NAME_NODE&&(r.name=a,!0)).then(r=>(this.fields=r,this.rebuildForm(),r))}rebuildForm(){if(null==this.form)return;const e=new Set;for(const t in this.form.controls)e.add(t);for(const t of this.fields){let i=null;this.value&&this.value[t.name]&&(i=this.value[t.name]),e.delete(t.name),null!=t.component?t.component?.setValue(i):(i=o.toBeautifyString(i),this.form.registerControl(t.name,new w.FormControl(i,w.Validators.required)))}e.forEach(t=>{this.form.removeControl(t)})}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275directiveInject(S),s.\u0275\u0275directiveInject(s.Injector),s.\u0275\u0275directiveInject(s.ChangeDetectorRef))},o.\u0275cmp=s.\u0275\u0275defineComponent({type:o,selectors:[["ng-component"]],features:[s.\u0275\u0275InheritDefinitionFeature],decls:0,vars:0,template:function(e,t){},encapsulation:2}),o})(),k=(()=>{class o{transform(e,...t){return H.toBeautifyString(e,t[0])}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275pipe=s.\u0275\u0275definePipe({name:"beautifier",type:o,pure:!0}),o})();class U{constructor(n,e,t){this.forInlineView=n,this.forFullView=e,this.forFullEdit=t}}class G{constructor(n,e,t){this.forInlineView=n,this.forFullView=e,this.forFullEdit=t}}class B{constructor(n,e,t){this.name=n,this.type=e,this.eventSource=t}}var P=(()=>{return(o=P||(P={})).VALUE_CHANGE="VALUE_CHANGE",o.SELECTION_CHANGE="SELECTION_CHANGE",P;var o})();class Q{constructor(n,e,t){this.name=n,this.type=e,this.value=t}}let pe=(()=>{class o extends T{constructor(e,t){super(),this.modelMgr=e,this.storeMgr=t,this.valueChange=new s.EventEmitter,this.targetEntitiesPos=null,this.targetEntitiesProperty=null,this.options=new Array,null==e&&(this.modelMgr=c.dtcde.getModelManager()),null==t&&(this.storeMgr=c.dtcde.getStoreManager())}canProvide(e){return new G(!0,!1,!0)}providesTemplates(e){return new U(this.inlineView,null,this.fullEditView)}setTargetEntitiesWithName(e,t){const i=this.modelMgr.queryModelToSingle("$.creation.entities[?(@.name=='"+e+"')]");if(null==i)throw console.error("Cannot find an entity with name "+e+" in the model."),new Error("Cannot find an entity with name "+e+" in the model.");return this.targetEntitiesPos=i.pointer,null==this.targetEntitiesPos?Promise.resolve(!1):(this.targetEntitiesProperty=t??null,(0,y.firstValueFrom)(this.possibleValues()).then(r=>(this.options=r,!0)))}possibleValues(){if(null==this.targetEntitiesPos)throw new Error("Missing query of target entity for class "+this.constructor.name);const e=this.storeMgr.searchEntities(this.targetEntitiesPos);if(null!=this.targetEntitiesProperty){const t=this.targetEntitiesProperty;return e.pipe((0,E.map)(i=>i.map(r=>r[t])))}return e}listEventSources(){const e=super.listEventSources();return e.push(new B("Value",P.VALUE_CHANGE,this.valueChange.asObservable())),e}valueChanged(e){this.valueChange.emit(new Q("Value",P.VALUE_CHANGE,e.value))}setValue(e){null!=e&&null!=this.options&&-1==this.options.findIndex(t=>t==e)&&null!=this.options[1]&&(e=this.options[1].toString()),super.setValue(e)}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275directiveInject(c.DontCodeModelManager,8),s.\u0275\u0275directiveInject(c.DontCodeStoreManager,8))},o.\u0275cmp=s.\u0275\u0275defineComponent({type:o,selectors:[["dontcode-reference"]],viewQuery:function(e,t){if(1&e&&(s.\u0275\u0275viewQuery(te,7),s.\u0275\u0275viewQuery(ne,7)),2&e){let i;s.\u0275\u0275queryRefresh(i=s.\u0275\u0275loadQuery())&&(t.inlineView=i.first),s.\u0275\u0275queryRefresh(i=s.\u0275\u0275loadQuery())&&(t.fullEditView=i.first)}},outputs:{valueChange:"valueChange"},features:[s.\u0275\u0275InheritDefinitionFeature],decls:4,vars:0,consts:[["inlineView",""],["fullEditView",""],[3,"formGroup",4,"ngIf"],[3,"formGroup"],["placeholder","Select a reference",3,"options","formControlName","filter","showClear","lazy","onChange"],["pTemplate","selectedItem"],["pTemplate","item"],[4,"ngIf"]],template:function(e,t){1&e&&(s.\u0275\u0275template(0,ie,1,1,"ng-template",null,0,s.\u0275\u0275templateRefExtractor),s.\u0275\u0275template(2,ae,1,1,"ng-template",null,1,s.\u0275\u0275templateRefExtractor))},dependencies:[F.NgIf,R.Dropdown,ee.PrimeTemplate,w.NgControlStatus,w.NgControlStatusGroup,w.FormGroupDirective,w.FormControlName],changeDetection:0}),o})();class de{constructor(){this.subscriptions=new y.Subscription,this.pluginHelper=new A,this.entityPointer=null,this.provider=null}unsubscribe(){this.pluginHelper.unsubscribe(),this.subscriptions.unsubscribe()}initCommandFlow(n,e){this.entityPointer=e,this.provider=n,this.pluginHelper.initCommandFlow(n,e,this)}initChangeListening(){this.pluginHelper.initChangeListening()}decomposeJsonToMultipleChanges(n,e){this.pluginHelper.decomposeJsonToMultipleChanges(n,e)}applyUpdatesToArray(n,e,t,i,r,l){return this.applyUpdatesToArrayAsync(n,e,t,i,(a,u)=>Promise.resolve(r(a,u)))}applyUpdatesToArrayAsync(n,e,t,i,r,l,a){return this.pluginHelper.applyUpdatesToArrayAsync(n,e,t,i,r,l,a)}performAction(n){return Promise.resolve(void 0)}}let fe=(()=>{class o{constructor(e,t){this.storeMgr=e,this.modelMgr=t,this.listsByPosition=new Map}retrieveListManager(e,t){let i=this.listsByPosition.get(e.position);return null==i&&(i=new W(e,t,this.storeMgr,this.modelMgr),this.listsByPosition.set(e.position,i)),i}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275inject(c.DontCodeStoreManager),s.\u0275\u0275inject(c.DontCodeModelManager))},o.\u0275prov=s.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();class W{constructor(n,e,t,i){this.storeMgr=t,this.modelMgr=i,this.entities=null,this.prepared=null,this.pointer=n,this.description=e}push(n){this.entities=null==this.entities?new Array(n):[...this.entities,n]}updateWithDetailedEntity(n){const e=n._id,t=new Array;return null!=this.entities?(this.entities.forEach(i=>{i._id==e?(n={...n,...i},t.push(n)):t.push(i)}),this.entities=[...t]):this.entities=[n],n}replace(n){if(null==this.entities)return!1;const e=n._id;let t=!1;const i=new Array;return this.entities.forEach(r=>{r._id==e?(i.push(n),t=!0):i.push(r)}),this.entities=[...i],t}remove(n){if(null==this.entities)return Promise.resolve(!1);const e=n._id;return null==e?new Promise(t=>{null!=this.entities?(this.entities=this.entities.filter(i=>i!==n),this.prepared=null,t(!0)):t(!1)}):this.storeMgr.deleteEntity(this.pointer.position,e).then(t=>(t&&null!=this.entities&&(this.entities=this.entities.filter(i=>i!==n),this.prepared=null),t)).catch(t=>(console.error(t.message),!1))}reset(){null!=this.entities&&(this.entities.length=0),this.prepared=null}store(n){return this.prepared=null,this.storeMgr.storeEntity(this.pointer.position,n)}storeAllChanged(){var n=this;return(0,I.Z)(function*(){if(null!=n.entities){n.prepared=null;for(const e of n.entities)yield n.storeMgr.storeEntity(n.pointer.position,e)}})()}loadAll(){return(0,y.firstValueFrom)(this.storeMgr.searchEntities(this.pointer.position).pipe((0,E.map)(n=>{this.prepared=null,this.entities=[...n]})),{defaultValue:void 0})}searchAndPrepareEntities(n,e,t,...i){let r=null!=n?Object.values(n):[];const l=r.length>0?r[0]:void 0;r=null!=e?Object.values(e):[];const a=r.length>0?new c.DontCodeStoreGroupby(r[0].of,r[0].display,r[0].show):void 0;if(null!=this.entities){this.prepared=null;let p,u=this.entities;return null!=i&&(u=c.StoreProviderHelper.applyFilters(u,...i)),null!=l&&(u=c.StoreProviderHelper.multiSortArray(u,l)),null!=a&&(p=c.StoreProviderHelper.calculateGroupedByValues(u,a,this.modelMgr,this.pointer)),(null!=i||null!=n||null!=e)&&(this.prepared=new c.DontCodeStorePreparedEntities(u,l,p)),Promise.resolve()}return(0,y.firstValueFrom)(this.storeMgr.searchAndPrepareEntities(this.pointer.position,l,a,t,...i).pipe((0,E.map)(u=>{this.prepared=u,this.entities=this.prepared.sortedData})))}loadDetailFromKey(n){return null==n?Promise.reject("Cannot load entity with null key"):this.storeMgr.loadEntity(this.pointer.position,n).then(e=>null!=e?this.updateWithDetailedEntity(e):e)}loadDetailOf(n){return this.loadDetailFromKey(n._id)}}let he=(()=>{class o{constructor(e){this.modelMgr=e}getContent(){return this.modelMgr.getContent()}resetContent(e){this.modelMgr.resetContent(e)}findAtPosition(e,t){return this.modelMgr.findAtPosition(e,t)}queryModelToArray(e,t){return this.modelMgr.queryModelToArray(e,t)}queryModelToSingle(e,t){return this.modelMgr.queryModelToSingle(e,t)}findAllPossibleTargetsOfProperty(e,t,i){return this.modelMgr.findAllPossibleTargetsOfProperty(e,t,i)}findTargetOfProperty(e,t,i){return this.modelMgr.findTargetOfProperty(e,t,i)}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275inject(c.DontCodeModelManager))},o.\u0275prov=s.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"}),o})(),q=(()=>{class o{static forRoot(){return{ngModule:o,providers:[{provide:D,useValue:c.dtcde},{provide:c.DontCodeSchemaManager,useValue:c.dtcde.getSchemaManager()},{provide:c.DontCodeModelManager,useValue:c.dtcde.getModelManager()},{provide:c.DontCodePreviewManager,useValue:c.dtcde.getPreviewManager()},{provide:c.DontCodeStoreManager,useValue:c.dtcde.getStoreManager()},{provide:c.DontCodeChangeManager,useValue:c.dtcde.getChangeManager()},k]}}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=s.\u0275\u0275defineNgModule({type:o}),o.\u0275inj=s.\u0275\u0275defineInjector({imports:[F.CommonModule,R.DropdownModule,w.ReactiveFormsModule]}),o})();class me{static registerComponentForType(n,e,t){c.dtcde.registerPlugin(new ge({forType:n,name:e})),v.previewHandlers.set(e,t)}}class ge{constructor(n){this.testComponents=null,this.CONFIG={plugin:{id:"CommonTestManagerPlugin",version:"1.0"},"schema-updates":[{id:"test-component",description:"Test Component added",changes:[{location:{parent:"#/$defs/field",id:"type"},update:{enum:[{Test:{enum:[]}}]},replace:!1}]}],"preview-handlers":[]},this.PREVIEW_HANDLER_CONFIG={location:{parent:c.DontCodeModel.APP_FIELDS,id:"type",values:[{Test:{enum:[]}}]},class:{source:"common-test-module",name:"name"}},this.testComponents=n}getConfiguration(){if(null!=this.testComponents){const n=structuredClone(this.CONFIG),e=structuredClone(this.PREVIEW_HANDLER_CONFIG);if(null!=n["schema-updates"]&&null!=n["preview-handlers"])return n["schema-updates"][0].id=this.testComponents.name,n["schema-updates"][0].changes[0].update.enum[0].Test.enum.push(this.testComponents.forType),e.class.name=this.testComponents.name,e.location.values[0].Test.enum.push(this.testComponents.forType),n["preview-handlers"].push(e),n}throw new Error("No testComponent to register")}pluginInit(n){}}class v{exposedPreviewHandlers(){return v.previewHandlers}}v.previewHandlers=new Map,v.\u0275fac=function(n){return new(n||v)},v.\u0275mod=(s.\u0275\u0275registerNgModuleType(v,"dontcode-plugin/common-test-module"),s.\u0275\u0275defineNgModule({type:v,id:"dontcode-plugin/common-test-module"})),v.\u0275inj=s.\u0275\u0275defineInjector({imports:[F.CommonModule,q]})}}]);