(self.webpackChunkcommerce_tester=self.webpackChunkcommerce_tester||[]).push([[7993],{67993:(v,y,m)=>{m.r(y),m.d(y,{ConnectedOverlayScrollHandler:()=>b,DomHandler:()=>w});let w=(()=>{class f{static addClass(t,e){t&&e&&(t.classList?t.classList.add(e):t.className+=" "+e)}static addMultipleClasses(t,e){if(t&&e)if(t.classList){let i=e.trim().split(" ");for(let l=0;l<i.length;l++)t.classList.add(i[l])}else{let i=e.split(" ");for(let l=0;l<i.length;l++)t.className+=" "+i[l]}}static removeClass(t,e){t&&e&&(t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "))}static hasClass(t,e){return!(!t||!e)&&(t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className))}static siblings(t){return Array.prototype.filter.call(t.parentNode.children,function(e){return e!==t})}static find(t,e){return Array.from(t.querySelectorAll(e))}static findSingle(t,e){return t?t.querySelector(e):null}static index(t){let e=t.parentNode.childNodes,i=0;for(var l=0;l<e.length;l++){if(e[l]==t)return i;1==e[l].nodeType&&i++}return-1}static indexWithinGroup(t,e){let i=t.parentNode?t.parentNode.childNodes:[],l=0;for(var n=0;n<i.length;n++){if(i[n]==t)return l;i[n].attributes&&i[n].attributes[e]&&1==i[n].nodeType&&l++}return-1}static appendOverlay(t,e,i="self"){"self"!==i&&t&&e&&this.appendChild(t,e)}static alignOverlay(t,e,i="self",l=!0){t&&e&&(l&&(t.style.minWidth=`${f.getOuterWidth(e)}px`),"self"===i?this.relativePosition(t,e):this.absolutePosition(t,e))}static relativePosition(t,e){const i=g=>{if(g)return"relative"===getComputedStyle(g).getPropertyValue("position")?g:i(g.parentElement)},l=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),n=e.offsetHeight,o=e.getBoundingClientRect(),r=this.getWindowScrollTop(),c=this.getWindowScrollLeft(),s=this.getViewport(),d=i(t)?.getBoundingClientRect()||{top:-1*r,left:-1*c};let a,p;o.top+n+l.height>s.height?(a=o.top-d.top-l.height,t.style.transformOrigin="bottom",o.top+a<0&&(a=-1*o.top)):(a=n+o.top-d.top,t.style.transformOrigin="top"),p=l.width>s.width?-1*(o.left-d.left):o.left-d.left+l.width>s.width?-1*(o.left-d.left+l.width-s.width):o.left-d.left,t.style.top=a+"px",t.style.left=p+"px"}static absolutePosition(t,e){const i=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),l=i.height,n=i.width,o=e.offsetHeight,r=e.offsetWidth,c=e.getBoundingClientRect(),s=this.getWindowScrollTop(),h=this.getWindowScrollLeft(),d=this.getViewport();let a,p;c.top+o+l>d.height?(a=c.top+s-l,t.style.transformOrigin="bottom",a<0&&(a=s)):(a=o+c.top+s,t.style.transformOrigin="top"),p=c.left+n>d.width?Math.max(0,c.left+h+r-n):c.left+h,t.style.top=a+"px",t.style.left=p+"px"}static getParents(t,e=[]){return null===t.parentNode?e:this.getParents(t.parentNode,e.concat([t.parentNode]))}static getScrollableParents(t){let e=[];if(t){let i=this.getParents(t);const l=/(auto|scroll)/,n=o=>{let r=window.getComputedStyle(o,null);return l.test(r.getPropertyValue("overflow"))||l.test(r.getPropertyValue("overflowX"))||l.test(r.getPropertyValue("overflowY"))};for(let o of i){let r=1===o.nodeType&&o.dataset.scrollselectors;if(r){let c=r.split(",");for(let s of c){let h=this.findSingle(o,s);h&&n(h)&&e.push(h)}}9!==o.nodeType&&n(o)&&e.push(o)}}return e}static getHiddenElementOuterHeight(t){t.style.visibility="hidden",t.style.display="block";let e=t.offsetHeight;return t.style.display="none",t.style.visibility="visible",e}static getHiddenElementOuterWidth(t){t.style.visibility="hidden",t.style.display="block";let e=t.offsetWidth;return t.style.display="none",t.style.visibility="visible",e}static getHiddenElementDimensions(t){let e={};return t.style.visibility="hidden",t.style.display="block",e.width=t.offsetWidth,e.height=t.offsetHeight,t.style.display="none",t.style.visibility="visible",e}static scrollInView(t,e){let i=getComputedStyle(t).getPropertyValue("borderTopWidth"),l=i?parseFloat(i):0,n=getComputedStyle(t).getPropertyValue("paddingTop"),o=n?parseFloat(n):0,r=t.getBoundingClientRect(),s=e.getBoundingClientRect().top+document.body.scrollTop-(r.top+document.body.scrollTop)-l-o,h=t.scrollTop,d=t.clientHeight,a=this.getOuterHeight(e);s<0?t.scrollTop=h+s:s+a>d&&(t.scrollTop=h+s-d+a)}static fadeIn(t,e){t.style.opacity=0;let i=+new Date,l=0,n=function(){l=+t.style.opacity.replace(",",".")+((new Date).getTime()-i)/e,t.style.opacity=l,i=+new Date,+l<1&&(window.requestAnimationFrame&&requestAnimationFrame(n)||setTimeout(n,16))};n()}static fadeOut(t,e){var i=1,o=50/e;let r=setInterval(()=>{(i-=o)<=0&&(i=0,clearInterval(r)),t.style.opacity=i},50)}static getWindowScrollTop(){let t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)}static getWindowScrollLeft(){let t=document.documentElement;return(window.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}static matches(t,e){var i=Element.prototype;return(i.matches||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||function(n){return-1!==[].indexOf.call(document.querySelectorAll(n),this)}).call(t,e)}static getOuterWidth(t,e){let i=t.offsetWidth;if(e){let l=getComputedStyle(t);i+=parseFloat(l.marginLeft)+parseFloat(l.marginRight)}return i}static getHorizontalPadding(t){let e=getComputedStyle(t);return parseFloat(e.paddingLeft)+parseFloat(e.paddingRight)}static getHorizontalMargin(t){let e=getComputedStyle(t);return parseFloat(e.marginLeft)+parseFloat(e.marginRight)}static innerWidth(t){let e=t.offsetWidth,i=getComputedStyle(t);return e+=parseFloat(i.paddingLeft)+parseFloat(i.paddingRight),e}static width(t){let e=t.offsetWidth,i=getComputedStyle(t);return e-=parseFloat(i.paddingLeft)+parseFloat(i.paddingRight),e}static getInnerHeight(t){let e=t.offsetHeight,i=getComputedStyle(t);return e+=parseFloat(i.paddingTop)+parseFloat(i.paddingBottom),e}static getOuterHeight(t,e){let i=t.offsetHeight;if(e){let l=getComputedStyle(t);i+=parseFloat(l.marginTop)+parseFloat(l.marginBottom)}return i}static getHeight(t){let e=t.offsetHeight,i=getComputedStyle(t);return e-=parseFloat(i.paddingTop)+parseFloat(i.paddingBottom)+parseFloat(i.borderTopWidth)+parseFloat(i.borderBottomWidth),e}static getWidth(t){let e=t.offsetWidth,i=getComputedStyle(t);return e-=parseFloat(i.paddingLeft)+parseFloat(i.paddingRight)+parseFloat(i.borderLeftWidth)+parseFloat(i.borderRightWidth),e}static getViewport(){let t=window,e=document,i=e.documentElement,l=e.getElementsByTagName("body")[0];return{width:t.innerWidth||i.clientWidth||l.clientWidth,height:t.innerHeight||i.clientHeight||l.clientHeight}}static getOffset(t){var e=t.getBoundingClientRect();return{top:e.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:e.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(t,e){let i=t.parentNode;if(!i)throw"Can't replace element";return i.replaceChild(e,t)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var t=window.navigator.userAgent;return t.indexOf("MSIE ")>0||(t.indexOf("Trident/")>0?(t.indexOf("rv:"),!0):t.indexOf("Edge/")>0)}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(t,e){if(this.isElement(e))e.appendChild(t);else{if(!e.el||!e.el.nativeElement)throw"Cannot append "+e+" to "+t;e.el.nativeElement.appendChild(t)}}static removeChild(t,e){if(this.isElement(e))e.removeChild(t);else{if(!e.el||!e.el.nativeElement)throw"Cannot remove "+t+" from "+e;e.el.nativeElement.removeChild(t)}}static removeElement(t){"remove"in Element.prototype?t.remove():t.parentNode.removeChild(t)}static isElement(t){return"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName}static calculateScrollbarWidth(t){if(t){let e=getComputedStyle(t);return t.offsetWidth-t.clientWidth-parseFloat(e.borderLeftWidth)-parseFloat(e.borderRightWidth)}{if(null!==this.calculatedScrollbarWidth)return this.calculatedScrollbarWidth;let e=document.createElement("div");e.className="p-scrollbar-measure",document.body.appendChild(e);let i=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),this.calculatedScrollbarWidth=i,i}}static calculateScrollbarHeight(){if(null!==this.calculatedScrollbarHeight)return this.calculatedScrollbarHeight;let t=document.createElement("div");t.className="p-scrollbar-measure",document.body.appendChild(t);let e=t.offsetHeight-t.clientHeight;return document.body.removeChild(t),this.calculatedScrollbarWidth=e,e}static invokeElementMethod(t,e,i){t[e].apply(t,i)}static clearSelection(){if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().rangeCount>0&&window.getSelection().getRangeAt(0).getClientRects().length>0&&window.getSelection().removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let t=this.resolveUserAgent();this.browser={},t.browser&&(this.browser[t.browser]=!0,this.browser.version=t.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let t=navigator.userAgent.toLowerCase(),e=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:e[1]||"",version:e[2]||"0"}}static isInteger(t){return Number.isInteger?Number.isInteger(t):"number"==typeof t&&isFinite(t)&&Math.floor(t)===t}static isHidden(t){return!t||null===t.offsetParent}static isVisible(t){return t&&null!=t.offsetParent}static isExist(t){return null!==t&&typeof t<"u"&&t.nodeName&&t.parentNode}static focus(t,e){t&&document.activeElement!==t&&t.focus(e)}static getFocusableElements(t){let e=f.find(t,'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                [href]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]):not(.p-disabled)'),i=[];for(let l of e)(l.offsetWidth||l.offsetHeight||l.getClientRects().length)&&i.push(l);return i}static getNextFocusableElement(t,e=!1){const i=f.getFocusableElements(t);let l=0;if(i&&i.length>0){const n=i.indexOf(i[0].ownerDocument.activeElement);e?l=-1==n||0===n?i.length-1:n-1:-1!=n&&n!==i.length-1&&(l=n+1)}return i[l]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection().toString():document.getSelection?document.getSelection().toString():document.selection?document.selection.createRange().text:null}static getTargetElement(t,e){if(!t)return null;switch(t){case"document":return document;case"window":return window;case"@next":return e?.nextElementSibling;case"@prev":return e?.previousElementSibling;case"@parent":return e?.parentElement;case"@grandparent":return e?.parentElement.parentElement;default:const i=typeof t;if("string"===i)return document.querySelector(t);if("object"===i&&t.hasOwnProperty("nativeElement"))return this.isExist(t.nativeElement)?t.nativeElement:void 0;const n=(o=t)&&o.constructor&&o.call&&o.apply?t():t;return n&&9===n.nodeType||this.isExist(n)?n:null}var o}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}}return f.zindex=1e3,f.calculatedScrollbarWidth=null,f.calculatedScrollbarHeight=null,f})();class b{constructor(u,t=(()=>{})){this.element=u,this.listener=t}bindScrollListener(){this.scrollableParents=w.getScrollableParents(this.element);for(let u=0;u<this.scrollableParents.length;u++)this.scrollableParents[u].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let u=0;u<this.scrollableParents.length;u++)this.scrollableParents[u].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}}}}]);