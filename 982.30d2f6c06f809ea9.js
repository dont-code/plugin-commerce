(self.webpackChunkcommerce_tester=self.webpackChunkcommerce_tester||[]).push([[982],{982:(D,p,x)=>{x.r(p),x.d(p,{ObjectUtils:()=>u,UniqueComponentId:()=>I,ZIndexUtils:()=>m});class u{static equals(e,t,n){return n?this.resolveFieldData(e,n)===this.resolveFieldData(t,n):this.equalsByValue(e,t)}static equalsByValue(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){var r,s,l,n=Array.isArray(e),i=Array.isArray(t);if(n&&i){if((s=e.length)!=t.length)return!1;for(r=s;0!=r--;)if(!this.equalsByValue(e[r],t[r]))return!1;return!0}if(n!=i)return!1;var a=this.isDate(e),d=this.isDate(t);if(a!=d)return!1;if(a&&d)return e.getTime()==t.getTime();var h=e instanceof RegExp,y=t instanceof RegExp;if(h!=y)return!1;if(h&&y)return e.toString()==t.toString();var f=Object.keys(e);if((s=f.length)!==Object.keys(t).length)return!1;for(r=s;0!=r--;)if(!Object.prototype.hasOwnProperty.call(t,f[r]))return!1;for(r=s;0!=r--;)if(!this.equalsByValue(e[l=f[r]],t[l]))return!1;return!0}return e!=e&&t!=t}static resolveFieldData(e,t){if(e&&t){if(this.isFunction(t))return t(e);if(-1==t.indexOf("."))return e[t];{let n=t.split("."),i=e;for(let r=0,s=n.length;r<s;++r){if(null==i)return null;i=i[n[r]]}return i}}return null}static isFunction(e){return!!(e&&e.constructor&&e.call&&e.apply)}static reorderArray(e,t,n){e&&t!==n&&(n>=e.length&&(n%=e.length,t%=e.length),e.splice(n,0,e.splice(t,1)[0]))}static insertIntoOrderedArray(e,t,n,i){if(n.length>0){let r=!1;for(let s=0;s<n.length;s++)if(this.findIndexInList(n[s],i)>t){n.splice(s,0,e),r=!0;break}r||n.push(e)}else n.push(e)}static findIndexInList(e,t){let n=-1;if(t)for(let i=0;i<t.length;i++)if(t[i]==e){n=i;break}return n}static contains(e,t){if(null!=e&&t&&t.length)for(let n of t)if(this.equals(e,n))return!0;return!1}static removeAccents(e){return e&&e.search(/[\xC0-\xFF]/g)>-1&&(e=e.replace(/[\xC0-\xC5]/g,"A").replace(/[\xC6]/g,"AE").replace(/[\xC7]/g,"C").replace(/[\xC8-\xCB]/g,"E").replace(/[\xCC-\xCF]/g,"I").replace(/[\xD0]/g,"D").replace(/[\xD1]/g,"N").replace(/[\xD2-\xD6\xD8]/g,"O").replace(/[\xD9-\xDC]/g,"U").replace(/[\xDD]/g,"Y").replace(/[\xDE]/g,"P").replace(/[\xE0-\xE5]/g,"a").replace(/[\xE6]/g,"ae").replace(/[\xE7]/g,"c").replace(/[\xE8-\xEB]/g,"e").replace(/[\xEC-\xEF]/g,"i").replace(/[\xF1]/g,"n").replace(/[\xF2-\xF6\xF8]/g,"o").replace(/[\xF9-\xFC]/g,"u").replace(/[\xFE]/g,"p").replace(/[\xFD\xFF]/g,"y")),e}static isDate(e){return"[object Date]"===Object.prototype.toString.call(e)}static isEmpty(e){return null==e||""===e||Array.isArray(e)&&0===e.length||!this.isDate(e)&&"object"==typeof e&&0===Object.keys(e).length}static isNotEmpty(e){return!this.isEmpty(e)}static compare(e,t,n,i=1){let r=-1;const s=this.isEmpty(e),l=this.isEmpty(t);return r=s&&l?0:s?i:l?-i:"string"==typeof e&&"string"==typeof t?e.localeCompare(t,n,{numeric:!0}):e<t?-1:e>t?1:0,r}static sort(e,t,n=1,i,r=1){return(1===r?n:r)*u.compare(e,t,i,n)}static merge(e,t){if(null!=e||null!=t)return null!=e&&"object"!=typeof e||null!=t&&"object"!=typeof t?null!=e&&"string"!=typeof e||null!=t&&"string"!=typeof t?t||e:[e||"",t||""].join(" "):{...e||{},...t||{}}}}var g=0;function I(){return"pr_id_"+ ++g}var m=function C(){let c=[];const i=r=>r&&parseInt(r.style.zIndex,10)||0;return{get:i,set:(r,s,l)=>{s&&(s.style.zIndex=String(((r,s)=>{let l=c.length>0?c[c.length-1]:{key:r,value:s},a=l.value+(l.key===r?0:s)+1;return c.push({key:r,value:a}),a})(r,l)))},clear:r=>{r&&((r=>{c=c.filter(s=>s.value!==r)})(i(r)),r.style.zIndex="")},getCurrent:()=>c.length>0?c[c.length-1].value:0}}()}}]);