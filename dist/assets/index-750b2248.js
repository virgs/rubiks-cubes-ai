var xh=Object.defineProperty;var vh=(n,e,t)=>e in n?xh(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Ke=(n,e,t)=>(vh(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function ua(n,e){const t=Object.create(null),i=n.split(",");for(let s=0;s<i.length;s++)t[i[s]]=!0;return e?s=>!!t[s.toLowerCase()]:s=>!!t[s]}function ha(n){if(ze(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=mt(i)?Sh(i):ha(i);if(s)for(const r in s)e[r]=s[r]}return e}else{if(mt(n))return n;if(rt(n))return n}}const yh=/;(?![^(]*\))/g,Mh=/:([^]+)/,bh=/\/\*.*?\*\//gs;function Sh(n){const e={};return n.replace(bh,"").split(yh).forEach(t=>{if(t){const i=t.split(Mh);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function fa(n){let e="";if(mt(n))e=n;else if(ze(n))for(let t=0;t<n.length;t++){const i=fa(n[t]);i&&(e+=i+" ")}else if(rt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const wh="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Th=ua(wh);function Gc(n){return!!n||n===""}const Qe={},zi=[],$t=()=>{},Eh=()=>!1,Ah=/^on[^a-z]/,Pr=n=>Ah.test(n),da=n=>n.startsWith("onUpdate:"),Et=Object.assign,pa=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Ch=Object.prototype.hasOwnProperty,We=(n,e)=>Ch.call(n,e),ze=Array.isArray,ys=n=>Rr(n)==="[object Map]",Lh=n=>Rr(n)==="[object Set]",Ue=n=>typeof n=="function",mt=n=>typeof n=="string",ma=n=>typeof n=="symbol",rt=n=>n!==null&&typeof n=="object",Hc=n=>rt(n)&&Ue(n.then)&&Ue(n.catch),Ph=Object.prototype.toString,Rr=n=>Ph.call(n),Rh=n=>Rr(n).slice(8,-1),Dh=n=>Rr(n)==="[object Object]",ga=n=>mt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,mr=ua(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Dr=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Ih=/-(\w)/g,qi=Dr(n=>n.replace(Ih,(e,t)=>t?t.toUpperCase():"")),Fh=/\B([A-Z])/g,Ji=Dr(n=>n.replace(Fh,"-$1").toLowerCase()),Vc=Dr(n=>n.charAt(0).toUpperCase()+n.slice(1)),jr=Dr(n=>n?`on${Vc(n)}`:""),Sr=(n,e)=>!Object.is(n,e),Yr=(n,e)=>{for(let t=0;t<n.length;t++)n[t](e)},wr=(n,e,t)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value:t})},Oh=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let qa;const Nh=()=>qa||(qa=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});let qt;class Uh{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=qt,!e&&qt&&(this.index=(qt.scopes||(qt.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const t=qt;try{return qt=this,e()}finally{qt=t}}}on(){qt=this}off(){qt=this.parent}stop(e){if(this._active){let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.scopes)for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0,this._active=!1}}}function zh(n,e=qt){e&&e.active&&e.effects.push(n)}function Bh(){return qt}const _a=n=>{const e=new Set(n);return e.w=0,e.n=0,e},Wc=n=>(n.w&Nn)>0,qc=n=>(n.n&Nn)>0,kh=({deps:n})=>{if(n.length)for(let e=0;e<n.length;e++)n[e].w|=Nn},Gh=n=>{const{deps:e}=n;if(e.length){let t=0;for(let i=0;i<e.length;i++){const s=e[i];Wc(s)&&!qc(s)?s.delete(n):e[t++]=s,s.w&=~Nn,s.n&=~Nn}e.length=t}},ko=new WeakMap;let ps=0,Nn=1;const Go=30;let jt;const ii=Symbol(""),Ho=Symbol("");class xa{constructor(e,t=null,i){this.fn=e,this.scheduler=t,this.active=!0,this.deps=[],this.parent=void 0,zh(this,i)}run(){if(!this.active)return this.fn();let e=jt,t=In;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=jt,jt=this,In=!0,Nn=1<<++ps,ps<=Go?kh(this):Xa(this),this.fn()}finally{ps<=Go&&Gh(this),Nn=1<<--ps,jt=this.parent,In=t,this.parent=void 0,this.deferStop&&this.stop()}}stop(){jt===this?this.deferStop=!0:this.active&&(Xa(this),this.onStop&&this.onStop(),this.active=!1)}}function Xa(n){const{deps:e}=n;if(e.length){for(let t=0;t<e.length;t++)e[t].delete(n);e.length=0}}let In=!0;const Xc=[];function Qi(){Xc.push(In),In=!1}function es(){const n=Xc.pop();In=n===void 0?!0:n}function Ct(n,e,t){if(In&&jt){let i=ko.get(n);i||ko.set(n,i=new Map);let s=i.get(t);s||i.set(t,s=_a()),jc(s)}}function jc(n,e){let t=!1;ps<=Go?qc(n)||(n.n|=Nn,t=!Wc(n)):t=!n.has(jt),t&&(n.add(jt),jt.deps.push(n))}function Sn(n,e,t,i,s,r){const a=ko.get(n);if(!a)return;let o=[];if(e==="clear")o=[...a.values()];else if(t==="length"&&ze(n)){const l=Number(i);a.forEach((c,u)=>{(u==="length"||u>=l)&&o.push(c)})}else switch(t!==void 0&&o.push(a.get(t)),e){case"add":ze(n)?ga(t)&&o.push(a.get("length")):(o.push(a.get(ii)),ys(n)&&o.push(a.get(Ho)));break;case"delete":ze(n)||(o.push(a.get(ii)),ys(n)&&o.push(a.get(Ho)));break;case"set":ys(n)&&o.push(a.get(ii));break}if(o.length===1)o[0]&&Vo(o[0]);else{const l=[];for(const c of o)c&&l.push(...c);Vo(_a(l))}}function Vo(n,e){const t=ze(n)?n:[...n];for(const i of t)i.computed&&ja(i);for(const i of t)i.computed||ja(i)}function ja(n,e){(n!==jt||n.allowRecurse)&&(n.scheduler?n.scheduler():n.run())}const Hh=ua("__proto__,__v_isRef,__isVue"),Yc=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ma)),Vh=va(),Wh=va(!1,!0),qh=va(!0),Ya=Xh();function Xh(){const n={};return["includes","indexOf","lastIndexOf"].forEach(e=>{n[e]=function(...t){const i=Ye(this);for(let r=0,a=this.length;r<a;r++)Ct(i,"get",r+"");const s=i[e](...t);return s===-1||s===!1?i[e](...t.map(Ye)):s}}),["push","pop","shift","unshift","splice"].forEach(e=>{n[e]=function(...t){Qi();const i=Ye(this)[e].apply(this,t);return es(),i}}),n}function jh(n){const e=Ye(this);return Ct(e,"has",n),e.hasOwnProperty(n)}function va(n=!1,e=!1){return function(i,s,r){if(s==="__v_isReactive")return!n;if(s==="__v_isReadonly")return n;if(s==="__v_isShallow")return e;if(s==="__v_raw"&&r===(n?e?uf:Qc:e?Jc:$c).get(i))return i;const a=ze(i);if(!n){if(a&&We(Ya,s))return Reflect.get(Ya,s,r);if(s==="hasOwnProperty")return jh}const o=Reflect.get(i,s,r);return(ma(s)?Yc.has(s):Hh(s))||(n||Ct(i,"get",s),e)?o:Tt(o)?a&&ga(s)?o:o.value:rt(o)?n?eu(o):ba(o):o}}const Yh=Zc(),Zh=Zc(!0);function Zc(n=!1){return function(t,i,s,r){let a=t[i];if(Es(a)&&Tt(a)&&!Tt(s))return!1;if(!n&&(!Wo(s)&&!Es(s)&&(a=Ye(a),s=Ye(s)),!ze(t)&&Tt(a)&&!Tt(s)))return a.value=s,!0;const o=ze(t)&&ga(i)?Number(i)<t.length:We(t,i),l=Reflect.set(t,i,s,r);return t===Ye(r)&&(o?Sr(s,a)&&Sn(t,"set",i,s):Sn(t,"add",i,s)),l}}function Kh(n,e){const t=We(n,e);n[e];const i=Reflect.deleteProperty(n,e);return i&&t&&Sn(n,"delete",e,void 0),i}function $h(n,e){const t=Reflect.has(n,e);return(!ma(e)||!Yc.has(e))&&Ct(n,"has",e),t}function Jh(n){return Ct(n,"iterate",ze(n)?"length":ii),Reflect.ownKeys(n)}const Kc={get:Vh,set:Yh,deleteProperty:Kh,has:$h,ownKeys:Jh},Qh={get:qh,set(n,e){return!0},deleteProperty(n,e){return!0}},ef=Et({},Kc,{get:Wh,set:Zh}),ya=n=>n,Ir=n=>Reflect.getPrototypeOf(n);function ks(n,e,t=!1,i=!1){n=n.__v_raw;const s=Ye(n),r=Ye(e);t||(e!==r&&Ct(s,"get",e),Ct(s,"get",r));const{has:a}=Ir(s),o=i?ya:t?Ta:wa;if(a.call(s,e))return o(n.get(e));if(a.call(s,r))return o(n.get(r));n!==s&&n.get(e)}function Gs(n,e=!1){const t=this.__v_raw,i=Ye(t),s=Ye(n);return e||(n!==s&&Ct(i,"has",n),Ct(i,"has",s)),n===s?t.has(n):t.has(n)||t.has(s)}function Hs(n,e=!1){return n=n.__v_raw,!e&&Ct(Ye(n),"iterate",ii),Reflect.get(n,"size",n)}function Za(n){n=Ye(n);const e=Ye(this);return Ir(e).has.call(e,n)||(e.add(n),Sn(e,"add",n,n)),this}function Ka(n,e){e=Ye(e);const t=Ye(this),{has:i,get:s}=Ir(t);let r=i.call(t,n);r||(n=Ye(n),r=i.call(t,n));const a=s.call(t,n);return t.set(n,e),r?Sr(e,a)&&Sn(t,"set",n,e):Sn(t,"add",n,e),this}function $a(n){const e=Ye(this),{has:t,get:i}=Ir(e);let s=t.call(e,n);s||(n=Ye(n),s=t.call(e,n)),i&&i.call(e,n);const r=e.delete(n);return s&&Sn(e,"delete",n,void 0),r}function Ja(){const n=Ye(this),e=n.size!==0,t=n.clear();return e&&Sn(n,"clear",void 0,void 0),t}function Vs(n,e){return function(i,s){const r=this,a=r.__v_raw,o=Ye(a),l=e?ya:n?Ta:wa;return!n&&Ct(o,"iterate",ii),a.forEach((c,u)=>i.call(s,l(c),l(u),r))}}function Ws(n,e,t){return function(...i){const s=this.__v_raw,r=Ye(s),a=ys(r),o=n==="entries"||n===Symbol.iterator&&a,l=n==="keys"&&a,c=s[n](...i),u=t?ya:e?Ta:wa;return!e&&Ct(r,"iterate",l?Ho:ii),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:o?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function En(n){return function(...e){return n==="delete"?!1:this}}function tf(){const n={get(r){return ks(this,r)},get size(){return Hs(this)},has:Gs,add:Za,set:Ka,delete:$a,clear:Ja,forEach:Vs(!1,!1)},e={get(r){return ks(this,r,!1,!0)},get size(){return Hs(this)},has:Gs,add:Za,set:Ka,delete:$a,clear:Ja,forEach:Vs(!1,!0)},t={get(r){return ks(this,r,!0)},get size(){return Hs(this,!0)},has(r){return Gs.call(this,r,!0)},add:En("add"),set:En("set"),delete:En("delete"),clear:En("clear"),forEach:Vs(!0,!1)},i={get(r){return ks(this,r,!0,!0)},get size(){return Hs(this,!0)},has(r){return Gs.call(this,r,!0)},add:En("add"),set:En("set"),delete:En("delete"),clear:En("clear"),forEach:Vs(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Ws(r,!1,!1),t[r]=Ws(r,!0,!1),e[r]=Ws(r,!1,!0),i[r]=Ws(r,!0,!0)}),[n,t,e,i]}const[nf,sf,rf,of]=tf();function Ma(n,e){const t=e?n?of:rf:n?sf:nf;return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(We(t,s)&&s in i?t:i,s,r)}const af={get:Ma(!1,!1)},lf={get:Ma(!1,!0)},cf={get:Ma(!0,!1)},$c=new WeakMap,Jc=new WeakMap,Qc=new WeakMap,uf=new WeakMap;function hf(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ff(n){return n.__v_skip||!Object.isExtensible(n)?0:hf(Rh(n))}function ba(n){return Es(n)?n:Sa(n,!1,Kc,af,$c)}function df(n){return Sa(n,!1,ef,lf,Jc)}function eu(n){return Sa(n,!0,Qh,cf,Qc)}function Sa(n,e,t,i,s){if(!rt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=s.get(n);if(r)return r;const a=ff(n);if(a===0)return n;const o=new Proxy(n,a===2?i:t);return s.set(n,o),o}function Bi(n){return Es(n)?Bi(n.__v_raw):!!(n&&n.__v_isReactive)}function Es(n){return!!(n&&n.__v_isReadonly)}function Wo(n){return!!(n&&n.__v_isShallow)}function tu(n){return Bi(n)||Es(n)}function Ye(n){const e=n&&n.__v_raw;return e?Ye(e):n}function nu(n){return wr(n,"__v_skip",!0),n}const wa=n=>rt(n)?ba(n):n,Ta=n=>rt(n)?eu(n):n;function pf(n){In&&jt&&(n=Ye(n),jc(n.dep||(n.dep=_a())))}function mf(n,e){n=Ye(n);const t=n.dep;t&&Vo(t)}function Tt(n){return!!(n&&n.__v_isRef===!0)}function gf(n){return Tt(n)?n.value:n}const _f={get:(n,e,t)=>gf(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return Tt(s)&&!Tt(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function iu(n){return Bi(n)?n:new Proxy(n,_f)}var su;class xf{constructor(e,t,i,s){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this[su]=!1,this._dirty=!0,this.effect=new xa(e,()=>{this._dirty||(this._dirty=!0,mf(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=i}get value(){const e=Ye(this);return pf(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}su="__v_isReadonly";function vf(n,e,t=!1){let i,s;const r=Ue(n);return r?(i=n,s=$t):(i=n.get,s=n.set),new xf(i,s,r||!s,t)}function Fn(n,e,t,i){let s;try{s=i?n(...i):n()}catch(r){Fr(r,e,t)}return s}function Jt(n,e,t,i){if(Ue(n)){const r=Fn(n,e,t,i);return r&&Hc(r)&&r.catch(a=>{Fr(a,e,t)}),r}const s=[];for(let r=0;r<n.length;r++)s.push(Jt(n[r],e,t,i));return s}function Fr(n,e,t,i=!0){const s=e?e.vnode:null;if(e){let r=e.parent;const a=e.proxy,o=t;for(;r;){const c=r.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](n,a,o)===!1)return}r=r.parent}const l=e.appContext.config.errorHandler;if(l){Fn(l,null,10,[n,a,o]);return}}yf(n,t,s,i)}function yf(n,e,t,i=!0){console.error(n)}let As=!1,qo=!1;const vt=[];let sn=0;const ki=[];let xn=null,$n=0;const ru=Promise.resolve();let Ea=null;function Mf(n){const e=Ea||ru;return n?e.then(this?n.bind(this):n):e}function bf(n){let e=sn+1,t=vt.length;for(;e<t;){const i=e+t>>>1;Cs(vt[i])<n?e=i+1:t=i}return e}function Aa(n){(!vt.length||!vt.includes(n,As&&n.allowRecurse?sn+1:sn))&&(n.id==null?vt.push(n):vt.splice(bf(n.id),0,n),ou())}function ou(){!As&&!qo&&(qo=!0,Ea=ru.then(lu))}function Sf(n){const e=vt.indexOf(n);e>sn&&vt.splice(e,1)}function wf(n){ze(n)?ki.push(...n):(!xn||!xn.includes(n,n.allowRecurse?$n+1:$n))&&ki.push(n),ou()}function Qa(n,e=As?sn+1:0){for(;e<vt.length;e++){const t=vt[e];t&&t.pre&&(vt.splice(e,1),e--,t())}}function au(n){if(ki.length){const e=[...new Set(ki)];if(ki.length=0,xn){xn.push(...e);return}for(xn=e,xn.sort((t,i)=>Cs(t)-Cs(i)),$n=0;$n<xn.length;$n++)xn[$n]();xn=null,$n=0}}const Cs=n=>n.id==null?1/0:n.id,Tf=(n,e)=>{const t=Cs(n)-Cs(e);if(t===0){if(n.pre&&!e.pre)return-1;if(e.pre&&!n.pre)return 1}return t};function lu(n){qo=!1,As=!0,vt.sort(Tf);const e=$t;try{for(sn=0;sn<vt.length;sn++){const t=vt[sn];t&&t.active!==!1&&Fn(t,null,14)}}finally{sn=0,vt.length=0,au(),As=!1,Ea=null,(vt.length||ki.length)&&lu()}}function Ef(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||Qe;let s=t;const r=e.startsWith("update:"),a=r&&e.slice(7);if(a&&a in i){const u=`${a==="modelValue"?"model":a}Modifiers`,{number:h,trim:f}=i[u]||Qe;f&&(s=t.map(m=>mt(m)?m.trim():m)),h&&(s=t.map(Oh))}let o,l=i[o=jr(e)]||i[o=jr(qi(e))];!l&&r&&(l=i[o=jr(Ji(e))]),l&&Jt(l,n,6,s);const c=i[o+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[o])return;n.emitted[o]=!0,Jt(c,n,6,s)}}function cu(n,e,t=!1){const i=e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let a={},o=!1;if(!Ue(n)){const l=c=>{const u=cu(c,e,!0);u&&(o=!0,Et(a,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!o?(rt(n)&&i.set(n,null),null):(ze(r)?r.forEach(l=>a[l]=null):Et(a,r),rt(n)&&i.set(n,a),a)}function Or(n,e){return!n||!Pr(e)?!1:(e=e.slice(2).replace(/Once$/,""),We(n,e[0].toLowerCase()+e.slice(1))||We(n,Ji(e))||We(n,e))}let rn=null,uu=null;function Tr(n){const e=rn;return rn=n,uu=n&&n.type.__scopeId||null,e}function Af(n,e=rn,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&al(-1);const r=Tr(e);let a;try{a=n(...s)}finally{Tr(r),i._d&&al(1)}return a};return i._n=!0,i._c=!0,i._d=!0,i}function Zr(n){const{type:e,vnode:t,proxy:i,withProxy:s,props:r,propsOptions:[a],slots:o,attrs:l,emit:c,render:u,renderCache:h,data:f,setupState:m,ctx:g,inheritAttrs:p}=n;let d,x;const A=Tr(n);try{if(t.shapeFlag&4){const T=s||i;d=tn(u.call(T,T,h,r,m,f,g)),x=l}else{const T=e;d=tn(T.length>1?T(r,{attrs:l,slots:o,emit:c}):T(r,null)),x=e.props?l:Cf(l)}}catch(T){bs.length=0,Fr(T,n,1),d=si(Ls)}let v=d;if(x&&p!==!1){const T=Object.keys(x),{shapeFlag:w}=v;T.length&&w&7&&(a&&T.some(da)&&(x=Lf(x,a)),v=Xi(v,x))}return t.dirs&&(v=Xi(v),v.dirs=v.dirs?v.dirs.concat(t.dirs):t.dirs),t.transition&&(v.transition=t.transition),d=v,Tr(A),d}const Cf=n=>{let e;for(const t in n)(t==="class"||t==="style"||Pr(t))&&((e||(e={}))[t]=n[t]);return e},Lf=(n,e)=>{const t={};for(const i in n)(!da(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Pf(n,e,t){const{props:i,children:s,component:r}=n,{props:a,children:o,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?el(i,a,c):!!a;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(a[f]!==i[f]&&!Or(c,f))return!0}}}else return(s||o)&&(!o||!o.$stable)?!0:i===a?!1:i?a?el(i,a,c):!0:!!a;return!1}function el(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(e[r]!==n[r]&&!Or(t,r))return!0}return!1}function Rf({vnode:n,parent:e},t){for(;e&&e.subTree===n;)(n=e.vnode).el=t,e=e.parent}const Df=n=>n.__isSuspense;function If(n,e){e&&e.pendingBranch?ze(n)?e.effects.push(...n):e.effects.push(n):wf(n)}function Ff(n,e){if(at){let t=at.provides;const i=at.parent&&at.parent.provides;i===t&&(t=at.provides=Object.create(i)),t[n]=e}}function gr(n,e,t=!1){const i=at||rn;if(i){const s=i.parent==null?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides;if(s&&n in s)return s[n];if(arguments.length>1)return t&&Ue(e)?e.call(i.proxy):e}}const qs={};function Kr(n,e,t){return hu(n,e,t)}function hu(n,e,{immediate:t,deep:i,flush:s,onTrack:r,onTrigger:a}=Qe){const o=Bh()===(at==null?void 0:at.scope)?at:null;let l,c=!1,u=!1;if(Tt(n)?(l=()=>n.value,c=Wo(n)):Bi(n)?(l=()=>n,i=!0):ze(n)?(u=!0,c=n.some(v=>Bi(v)||Wo(v)),l=()=>n.map(v=>{if(Tt(v))return v.value;if(Bi(v))return Fi(v);if(Ue(v))return Fn(v,o,2)})):Ue(n)?e?l=()=>Fn(n,o,2):l=()=>{if(!(o&&o.isUnmounted))return h&&h(),Jt(n,o,3,[f])}:l=$t,e&&i){const v=l;l=()=>Fi(v())}let h,f=v=>{h=x.onStop=()=>{Fn(v,o,4)}},m;if(Rs)if(f=$t,e?t&&Jt(e,o,3,[l(),u?[]:void 0,f]):l(),s==="sync"){const v=Dd();m=v.__watcherHandles||(v.__watcherHandles=[])}else return $t;let g=u?new Array(n.length).fill(qs):qs;const p=()=>{if(x.active)if(e){const v=x.run();(i||c||(u?v.some((T,w)=>Sr(T,g[w])):Sr(v,g)))&&(h&&h(),Jt(e,o,3,[v,g===qs?void 0:u&&g[0]===qs?[]:g,f]),g=v)}else x.run()};p.allowRecurse=!!e;let d;s==="sync"?d=p:s==="post"?d=()=>At(p,o&&o.suspense):(p.pre=!0,o&&(p.id=o.uid),d=()=>Aa(p));const x=new xa(l,d);e?t?p():g=x.run():s==="post"?At(x.run.bind(x),o&&o.suspense):x.run();const A=()=>{x.stop(),o&&o.scope&&pa(o.scope.effects,x)};return m&&m.push(A),A}function Of(n,e,t){const i=this.proxy,s=mt(n)?n.includes(".")?fu(i,n):()=>i[n]:n.bind(i,i);let r;Ue(e)?r=e:(r=e.handler,t=e);const a=at;ji(this);const o=hu(s,r.bind(i),t);return a?ji(a):ri(),o}function fu(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}function Fi(n,e){if(!rt(n)||n.__v_skip||(e=e||new Set,e.has(n)))return n;if(e.add(n),Tt(n))Fi(n.value,e);else if(ze(n))for(let t=0;t<n.length;t++)Fi(n[t],e);else if(Lh(n)||ys(n))n.forEach(t=>{Fi(t,e)});else if(Dh(n))for(const t in n)Fi(n[t],e);return n}function Nf(n){return Ue(n)?{setup:n,name:n.name}:n}const _r=n=>!!n.type.__asyncLoader,du=n=>n.type.__isKeepAlive;function Uf(n,e){pu(n,"a",e)}function zf(n,e){pu(n,"da",e)}function pu(n,e,t=at){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Nr(e,i,t),t){let s=t.parent;for(;s&&s.parent;)du(s.parent.vnode)&&Bf(i,e,t,s),s=s.parent}}function Bf(n,e,t,i){const s=Nr(e,n,i,!0);mu(()=>{pa(i[e],s)},t)}function Nr(n,e,t=at,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...a)=>{if(t.isUnmounted)return;Qi(),ji(t);const o=Jt(e,t,n,a);return ri(),es(),o});return i?s.unshift(r):s.push(r),r}}const Tn=n=>(e,t=at)=>(!Rs||n==="sp")&&Nr(n,(...i)=>e(...i),t),kf=Tn("bm"),Gf=Tn("m"),Hf=Tn("bu"),Vf=Tn("u"),Wf=Tn("bum"),mu=Tn("um"),qf=Tn("sp"),Xf=Tn("rtg"),jf=Tn("rtc");function Yf(n,e=at){Nr("ec",n,e)}function Vn(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let a=0;a<s.length;a++){const o=s[a];r&&(o.oldValue=r[a].value);let l=o.dir[i];l&&(Qi(),Jt(l,t,8,[n.el,o,n,e]),es())}}const Zf=Symbol(),Xo=n=>n?Eu(n)?Ra(n)||n.proxy:Xo(n.parent):null,Ms=Et(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Xo(n.parent),$root:n=>Xo(n.root),$emit:n=>n.emit,$options:n=>Ca(n),$forceUpdate:n=>n.f||(n.f=()=>Aa(n.update)),$nextTick:n=>n.n||(n.n=Mf.bind(n.proxy)),$watch:n=>Of.bind(n)}),$r=(n,e)=>n!==Qe&&!n.__isScriptSetup&&We(n,e),Kf={get({_:n},e){const{ctx:t,setupState:i,data:s,props:r,accessCache:a,type:o,appContext:l}=n;let c;if(e[0]!=="$"){const m=a[e];if(m!==void 0)switch(m){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if($r(i,e))return a[e]=1,i[e];if(s!==Qe&&We(s,e))return a[e]=2,s[e];if((c=n.propsOptions[0])&&We(c,e))return a[e]=3,r[e];if(t!==Qe&&We(t,e))return a[e]=4,t[e];jo&&(a[e]=0)}}const u=Ms[e];let h,f;if(u)return e==="$attrs"&&Ct(n,"get",e),u(n);if((h=o.__cssModules)&&(h=h[e]))return h;if(t!==Qe&&We(t,e))return a[e]=4,t[e];if(f=l.config.globalProperties,We(f,e))return f[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return $r(s,e)?(s[e]=t,!0):i!==Qe&&We(i,e)?(i[e]=t,!0):We(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,propsOptions:r}},a){let o;return!!t[a]||n!==Qe&&We(n,a)||$r(e,a)||(o=r[0])&&We(o,a)||We(i,a)||We(Ms,a)||We(s.config.globalProperties,a)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:We(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};let jo=!0;function $f(n){const e=Ca(n),t=n.proxy,i=n.ctx;jo=!1,e.beforeCreate&&tl(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:a,watch:o,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:m,updated:g,activated:p,deactivated:d,beforeDestroy:x,beforeUnmount:A,destroyed:v,unmounted:T,render:w,renderTracked:R,renderTriggered:O,errorCaptured:M,serverPrefetch:L,expose:U,inheritAttrs:$,components:ue,directives:G,filters:B}=e;if(c&&Jf(c,i,null,n.appContext.config.unwrapInjectedRef),a)for(const ie in a){const X=a[ie];Ue(X)&&(i[ie]=X.bind(t))}if(s){const ie=s.call(t,t);rt(ie)&&(n.data=ba(ie))}if(jo=!0,r)for(const ie in r){const X=r[ie],ce=Ue(X)?X.bind(t,t):Ue(X.get)?X.get.bind(t,t):$t,he=!Ue(X)&&Ue(X.set)?X.set.bind(t):$t,Me=Pd({get:ce,set:he});Object.defineProperty(i,ie,{enumerable:!0,configurable:!0,get:()=>Me.value,set:V=>Me.value=V})}if(o)for(const ie in o)gu(o[ie],i,t,ie);if(l){const ie=Ue(l)?l.call(t):l;Reflect.ownKeys(ie).forEach(X=>{Ff(X,ie[X])})}u&&tl(u,n,"c");function se(ie,X){ze(X)?X.forEach(ce=>ie(ce.bind(t))):X&&ie(X.bind(t))}if(se(kf,h),se(Gf,f),se(Hf,m),se(Vf,g),se(Uf,p),se(zf,d),se(Yf,M),se(jf,R),se(Xf,O),se(Wf,A),se(mu,T),se(qf,L),ze(U))if(U.length){const ie=n.exposed||(n.exposed={});U.forEach(X=>{Object.defineProperty(ie,X,{get:()=>t[X],set:ce=>t[X]=ce})})}else n.exposed||(n.exposed={});w&&n.render===$t&&(n.render=w),$!=null&&(n.inheritAttrs=$),ue&&(n.components=ue),G&&(n.directives=G)}function Jf(n,e,t=$t,i=!1){ze(n)&&(n=Yo(n));for(const s in n){const r=n[s];let a;rt(r)?"default"in r?a=gr(r.from||s,r.default,!0):a=gr(r.from||s):a=gr(r),Tt(a)&&i?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>a.value,set:o=>a.value=o}):e[s]=a}}function tl(n,e,t){Jt(ze(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function gu(n,e,t,i){const s=i.includes(".")?fu(t,i):()=>t[i];if(mt(n)){const r=e[n];Ue(r)&&Kr(s,r)}else if(Ue(n))Kr(s,n.bind(t));else if(rt(n))if(ze(n))n.forEach(r=>gu(r,e,t,i));else{const r=Ue(n.handler)?n.handler.bind(t):e[n.handler];Ue(r)&&Kr(s,r,n)}}function Ca(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:a}}=n.appContext,o=r.get(e);let l;return o?l=o:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>Er(l,c,a,!0)),Er(l,e,a)),rt(e)&&r.set(e,l),l}function Er(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&Er(n,r,t,!0),s&&s.forEach(a=>Er(n,a,t,!0));for(const a in e)if(!(i&&a==="expose")){const o=Qf[a]||t&&t[a];n[a]=o?o(n[a],e[a]):e[a]}return n}const Qf={data:nl,props:Yn,emits:Yn,methods:Yn,computed:Yn,beforeCreate:bt,created:bt,beforeMount:bt,mounted:bt,beforeUpdate:bt,updated:bt,beforeDestroy:bt,beforeUnmount:bt,destroyed:bt,unmounted:bt,activated:bt,deactivated:bt,errorCaptured:bt,serverPrefetch:bt,components:Yn,directives:Yn,watch:td,provide:nl,inject:ed};function nl(n,e){return e?n?function(){return Et(Ue(n)?n.call(this,this):n,Ue(e)?e.call(this,this):e)}:e:n}function ed(n,e){return Yn(Yo(n),Yo(e))}function Yo(n){if(ze(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function bt(n,e){return n?[...new Set([].concat(n,e))]:e}function Yn(n,e){return n?Et(Et(Object.create(null),n),e):e}function td(n,e){if(!n)return e;if(!e)return n;const t=Et(Object.create(null),n);for(const i in e)t[i]=bt(n[i],e[i]);return t}function nd(n,e,t,i=!1){const s={},r={};wr(r,zr,1),n.propsDefaults=Object.create(null),_u(n,e,s,r);for(const a in n.propsOptions[0])a in s||(s[a]=void 0);t?n.props=i?s:df(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function id(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:a}}=n,o=Ye(s),[l]=n.propsOptions;let c=!1;if((i||a>0)&&!(a&16)){if(a&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Or(n.emitsOptions,f))continue;const m=e[f];if(l)if(We(r,f))m!==r[f]&&(r[f]=m,c=!0);else{const g=qi(f);s[g]=Zo(l,o,g,m,n,!1)}else m!==r[f]&&(r[f]=m,c=!0)}}}else{_u(n,e,s,r)&&(c=!0);let u;for(const h in o)(!e||!We(e,h)&&((u=Ji(h))===h||!We(e,u)))&&(l?t&&(t[h]!==void 0||t[u]!==void 0)&&(s[h]=Zo(l,o,h,void 0,n,!0)):delete s[h]);if(r!==o)for(const h in r)(!e||!We(e,h))&&(delete r[h],c=!0)}c&&Sn(n,"set","$attrs")}function _u(n,e,t,i){const[s,r]=n.propsOptions;let a=!1,o;if(e)for(let l in e){if(mr(l))continue;const c=e[l];let u;s&&We(s,u=qi(l))?!r||!r.includes(u)?t[u]=c:(o||(o={}))[u]=c:Or(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,a=!0)}if(r){const l=Ye(t),c=o||Qe;for(let u=0;u<r.length;u++){const h=r[u];t[h]=Zo(s,l,h,c[h],n,!We(c,h))}}return a}function Zo(n,e,t,i,s,r){const a=n[t];if(a!=null){const o=We(a,"default");if(o&&i===void 0){const l=a.default;if(a.type!==Function&&Ue(l)){const{propsDefaults:c}=s;t in c?i=c[t]:(ji(s),i=c[t]=l.call(null,e),ri())}else i=l}a[0]&&(r&&!o?i=!1:a[1]&&(i===""||i===Ji(t))&&(i=!0))}return i}function xu(n,e,t=!1){const i=e.propsCache,s=i.get(n);if(s)return s;const r=n.props,a={},o=[];let l=!1;if(!Ue(n)){const u=h=>{l=!0;const[f,m]=xu(h,e,!0);Et(a,f),m&&o.push(...m)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return rt(n)&&i.set(n,zi),zi;if(ze(r))for(let u=0;u<r.length;u++){const h=qi(r[u]);il(h)&&(a[h]=Qe)}else if(r)for(const u in r){const h=qi(u);if(il(h)){const f=r[u],m=a[h]=ze(f)||Ue(f)?{type:f}:Object.assign({},f);if(m){const g=ol(Boolean,m.type),p=ol(String,m.type);m[0]=g>-1,m[1]=p<0||g<p,(g>-1||We(m,"default"))&&o.push(h)}}}const c=[a,o];return rt(n)&&i.set(n,c),c}function il(n){return n[0]!=="$"}function sl(n){const e=n&&n.toString().match(/^\s*(function|class) (\w+)/);return e?e[2]:n===null?"null":""}function rl(n,e){return sl(n)===sl(e)}function ol(n,e){return ze(e)?e.findIndex(t=>rl(t,n)):Ue(e)&&rl(e,n)?0:-1}const vu=n=>n[0]==="_"||n==="$stable",La=n=>ze(n)?n.map(tn):[tn(n)],sd=(n,e,t)=>{if(e._n)return e;const i=Af((...s)=>La(e(...s)),t);return i._c=!1,i},yu=(n,e,t)=>{const i=n._ctx;for(const s in n){if(vu(s))continue;const r=n[s];if(Ue(r))e[s]=sd(s,r,i);else if(r!=null){const a=La(r);e[s]=()=>a}}},Mu=(n,e)=>{const t=La(e);n.slots.default=()=>t},rd=(n,e)=>{if(n.vnode.shapeFlag&32){const t=e._;t?(n.slots=Ye(e),wr(e,"_",t)):yu(e,n.slots={})}else n.slots={},e&&Mu(n,e);wr(n.slots,zr,1)},od=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,a=Qe;if(i.shapeFlag&32){const o=e._;o?t&&o===1?r=!1:(Et(s,e),!t&&o===1&&delete s._):(r=!e.$stable,yu(e,s)),a=e}else e&&(Mu(n,e),a={default:1});if(r)for(const o in s)!vu(o)&&!(o in a)&&delete s[o]};function bu(){return{app:null,config:{isNativeTag:Eh,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ad=0;function ld(n,e){return function(i,s=null){Ue(i)||(i=Object.assign({},i)),s!=null&&!rt(s)&&(s=null);const r=bu(),a=new Set;let o=!1;const l=r.app={_uid:ad++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:Id,get config(){return r.config},set config(c){},use(c,...u){return a.has(c)||(c&&Ue(c.install)?(a.add(c),c.install(l,...u)):Ue(c)&&(a.add(c),c(l,...u))),l},mixin(c){return r.mixins.includes(c)||r.mixins.push(c),l},component(c,u){return u?(r.components[c]=u,l):r.components[c]},directive(c,u){return u?(r.directives[c]=u,l):r.directives[c]},mount(c,u,h){if(!o){const f=si(i,s);return f.appContext=r,u&&e?e(f,c):n(f,c,h),o=!0,l._container=c,c.__vue_app__=l,Ra(f.component)||f.component.proxy}},unmount(){o&&(n(null,l._container),delete l._container.__vue_app__)},provide(c,u){return r.provides[c]=u,l}};return l}}function Ko(n,e,t,i,s=!1){if(ze(n)){n.forEach((f,m)=>Ko(f,e&&(ze(e)?e[m]:e),t,i,s));return}if(_r(i)&&!s)return;const r=i.shapeFlag&4?Ra(i.component)||i.component.proxy:i.el,a=s?null:r,{i:o,r:l}=n,c=e&&e.r,u=o.refs===Qe?o.refs={}:o.refs,h=o.setupState;if(c!=null&&c!==l&&(mt(c)?(u[c]=null,We(h,c)&&(h[c]=null)):Tt(c)&&(c.value=null)),Ue(l))Fn(l,o,12,[a,u]);else{const f=mt(l),m=Tt(l);if(f||m){const g=()=>{if(n.f){const p=f?We(h,l)?h[l]:u[l]:l.value;s?ze(p)&&pa(p,r):ze(p)?p.includes(r)||p.push(r):f?(u[l]=[r],We(h,l)&&(h[l]=u[l])):(l.value=[r],n.k&&(u[n.k]=l.value))}else f?(u[l]=a,We(h,l)&&(h[l]=a)):m&&(l.value=a,n.k&&(u[n.k]=a))};a?(g.id=-1,At(g,t)):g()}}}const At=If;function cd(n){return ud(n)}function ud(n,e){const t=Nh();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:a,createText:o,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:m=$t,insertStaticContent:g}=n,p=(y,S,P,k=null,I=null,Z=null,J=!1,j=null,ae=!!S.dynamicChildren)=>{if(y===S)return;y&&!rs(y,S)&&(k=Ce(y),V(y,I,Z,!0),y=null),S.patchFlag===-2&&(ae=!1,S.dynamicChildren=null);const{type:K,ref:b,shapeFlag:_}=S;switch(K){case Ur:d(y,S,P,k);break;case Ls:x(y,S,P,k);break;case Jr:y==null&&A(S,P,k,J);break;case vn:ue(y,S,P,k,I,Z,J,j,ae);break;default:_&1?w(y,S,P,k,I,Z,J,j,ae):_&6?G(y,S,P,k,I,Z,J,j,ae):(_&64||_&128)&&K.process(y,S,P,k,I,Z,J,j,ae,Ee)}b!=null&&I&&Ko(b,y&&y.ref,Z,S||y,!S)},d=(y,S,P,k)=>{if(y==null)i(S.el=o(S.children),P,k);else{const I=S.el=y.el;S.children!==y.children&&c(I,S.children)}},x=(y,S,P,k)=>{y==null?i(S.el=l(S.children||""),P,k):S.el=y.el},A=(y,S,P,k)=>{[y.el,y.anchor]=g(y.children,S,P,k,y.el,y.anchor)},v=({el:y,anchor:S},P,k)=>{let I;for(;y&&y!==S;)I=f(y),i(y,P,k),y=I;i(S,P,k)},T=({el:y,anchor:S})=>{let P;for(;y&&y!==S;)P=f(y),s(y),y=P;s(S)},w=(y,S,P,k,I,Z,J,j,ae)=>{J=J||S.type==="svg",y==null?R(S,P,k,I,Z,J,j,ae):L(y,S,I,Z,J,j,ae)},R=(y,S,P,k,I,Z,J,j)=>{let ae,K;const{type:b,props:_,shapeFlag:D,transition:Y,dirs:Q}=y;if(ae=y.el=a(y.type,Z,_&&_.is,_),D&8?u(ae,y.children):D&16&&M(y.children,ae,null,k,I,Z&&b!=="foreignObject",J,j),Q&&Vn(y,null,k,"created"),O(ae,y,y.scopeId,J,k),_){for(const _e in _)_e!=="value"&&!mr(_e)&&r(ae,_e,null,_[_e],Z,y.children,k,I,W);"value"in _&&r(ae,"value",null,_.value),(K=_.onVnodeBeforeMount)&&Qt(K,k,y)}Q&&Vn(y,null,k,"beforeMount");const le=(!I||I&&!I.pendingBranch)&&Y&&!Y.persisted;le&&Y.beforeEnter(ae),i(ae,S,P),((K=_&&_.onVnodeMounted)||le||Q)&&At(()=>{K&&Qt(K,k,y),le&&Y.enter(ae),Q&&Vn(y,null,k,"mounted")},I)},O=(y,S,P,k,I)=>{if(P&&m(y,P),k)for(let Z=0;Z<k.length;Z++)m(y,k[Z]);if(I){let Z=I.subTree;if(S===Z){const J=I.vnode;O(y,J,J.scopeId,J.slotScopeIds,I.parent)}}},M=(y,S,P,k,I,Z,J,j,ae=0)=>{for(let K=ae;K<y.length;K++){const b=y[K]=j?Rn(y[K]):tn(y[K]);p(null,b,S,P,k,I,Z,J,j)}},L=(y,S,P,k,I,Z,J)=>{const j=S.el=y.el;let{patchFlag:ae,dynamicChildren:K,dirs:b}=S;ae|=y.patchFlag&16;const _=y.props||Qe,D=S.props||Qe;let Y;P&&Wn(P,!1),(Y=D.onVnodeBeforeUpdate)&&Qt(Y,P,S,y),b&&Vn(S,y,P,"beforeUpdate"),P&&Wn(P,!0);const Q=I&&S.type!=="foreignObject";if(K?U(y.dynamicChildren,K,j,P,k,Q,Z):J||X(y,S,j,null,P,k,Q,Z,!1),ae>0){if(ae&16)$(j,S,_,D,P,k,I);else if(ae&2&&_.class!==D.class&&r(j,"class",null,D.class,I),ae&4&&r(j,"style",_.style,D.style,I),ae&8){const le=S.dynamicProps;for(let _e=0;_e<le.length;_e++){const C=le[_e],z=_[C],xe=D[C];(xe!==z||C==="value")&&r(j,C,z,xe,I,y.children,P,k,W)}}ae&1&&y.children!==S.children&&u(j,S.children)}else!J&&K==null&&$(j,S,_,D,P,k,I);((Y=D.onVnodeUpdated)||b)&&At(()=>{Y&&Qt(Y,P,S,y),b&&Vn(S,y,P,"updated")},k)},U=(y,S,P,k,I,Z,J)=>{for(let j=0;j<S.length;j++){const ae=y[j],K=S[j],b=ae.el&&(ae.type===vn||!rs(ae,K)||ae.shapeFlag&70)?h(ae.el):P;p(ae,K,b,null,k,I,Z,J,!0)}},$=(y,S,P,k,I,Z,J)=>{if(P!==k){if(P!==Qe)for(const j in P)!mr(j)&&!(j in k)&&r(y,j,P[j],null,J,S.children,I,Z,W);for(const j in k){if(mr(j))continue;const ae=k[j],K=P[j];ae!==K&&j!=="value"&&r(y,j,K,ae,J,S.children,I,Z,W)}"value"in k&&r(y,"value",P.value,k.value)}},ue=(y,S,P,k,I,Z,J,j,ae)=>{const K=S.el=y?y.el:o(""),b=S.anchor=y?y.anchor:o("");let{patchFlag:_,dynamicChildren:D,slotScopeIds:Y}=S;Y&&(j=j?j.concat(Y):Y),y==null?(i(K,P,k),i(b,P,k),M(S.children,P,b,I,Z,J,j,ae)):_>0&&_&64&&D&&y.dynamicChildren?(U(y.dynamicChildren,D,P,I,Z,J,j),(S.key!=null||I&&S===I.subTree)&&Su(y,S,!0)):X(y,S,P,b,I,Z,J,j,ae)},G=(y,S,P,k,I,Z,J,j,ae)=>{S.slotScopeIds=j,y==null?S.shapeFlag&512?I.ctx.activate(S,P,k,J,ae):B(S,P,k,I,Z,J,ae):ee(y,S,ae)},B=(y,S,P,k,I,Z,J)=>{const j=y.component=wd(y,k,I);if(du(y)&&(j.ctx.renderer=Ee),Td(j),j.asyncDep){if(I&&I.registerDep(j,se),!y.el){const ae=j.subTree=si(Ls);x(null,ae,S,P)}return}se(j,y,S,P,I,Z,J)},ee=(y,S,P)=>{const k=S.component=y.component;if(Pf(y,S,P))if(k.asyncDep&&!k.asyncResolved){ie(k,S,P);return}else k.next=S,Sf(k.update),k.update();else S.el=y.el,k.vnode=S},se=(y,S,P,k,I,Z,J)=>{const j=()=>{if(y.isMounted){let{next:b,bu:_,u:D,parent:Y,vnode:Q}=y,le=b,_e;Wn(y,!1),b?(b.el=Q.el,ie(y,b,J)):b=Q,_&&Yr(_),(_e=b.props&&b.props.onVnodeBeforeUpdate)&&Qt(_e,Y,b,Q),Wn(y,!0);const C=Zr(y),z=y.subTree;y.subTree=C,p(z,C,h(z.el),Ce(z),y,I,Z),b.el=C.el,le===null&&Rf(y,C.el),D&&At(D,I),(_e=b.props&&b.props.onVnodeUpdated)&&At(()=>Qt(_e,Y,b,Q),I)}else{let b;const{el:_,props:D}=S,{bm:Y,m:Q,parent:le}=y,_e=_r(S);if(Wn(y,!1),Y&&Yr(Y),!_e&&(b=D&&D.onVnodeBeforeMount)&&Qt(b,le,S),Wn(y,!0),_&&Ie){const C=()=>{y.subTree=Zr(y),Ie(_,y.subTree,y,I,null)};_e?S.type.__asyncLoader().then(()=>!y.isUnmounted&&C()):C()}else{const C=y.subTree=Zr(y);p(null,C,P,k,y,I,Z),S.el=C.el}if(Q&&At(Q,I),!_e&&(b=D&&D.onVnodeMounted)){const C=S;At(()=>Qt(b,le,C),I)}(S.shapeFlag&256||le&&_r(le.vnode)&&le.vnode.shapeFlag&256)&&y.a&&At(y.a,I),y.isMounted=!0,S=P=k=null}},ae=y.effect=new xa(j,()=>Aa(K),y.scope),K=y.update=()=>ae.run();K.id=y.uid,Wn(y,!0),K()},ie=(y,S,P)=>{S.component=y;const k=y.vnode.props;y.vnode=S,y.next=null,id(y,S.props,k,P),od(y,S.children,P),Qi(),Qa(),es()},X=(y,S,P,k,I,Z,J,j,ae=!1)=>{const K=y&&y.children,b=y?y.shapeFlag:0,_=S.children,{patchFlag:D,shapeFlag:Y}=S;if(D>0){if(D&128){he(K,_,P,k,I,Z,J,j,ae);return}else if(D&256){ce(K,_,P,k,I,Z,J,j,ae);return}}Y&8?(b&16&&W(K,I,Z),_!==K&&u(P,_)):b&16?Y&16?he(K,_,P,k,I,Z,J,j,ae):W(K,I,Z,!0):(b&8&&u(P,""),Y&16&&M(_,P,k,I,Z,J,j,ae))},ce=(y,S,P,k,I,Z,J,j,ae)=>{y=y||zi,S=S||zi;const K=y.length,b=S.length,_=Math.min(K,b);let D;for(D=0;D<_;D++){const Y=S[D]=ae?Rn(S[D]):tn(S[D]);p(y[D],Y,P,null,I,Z,J,j,ae)}K>b?W(y,I,Z,!0,!1,_):M(S,P,k,I,Z,J,j,ae,_)},he=(y,S,P,k,I,Z,J,j,ae)=>{let K=0;const b=S.length;let _=y.length-1,D=b-1;for(;K<=_&&K<=D;){const Y=y[K],Q=S[K]=ae?Rn(S[K]):tn(S[K]);if(rs(Y,Q))p(Y,Q,P,null,I,Z,J,j,ae);else break;K++}for(;K<=_&&K<=D;){const Y=y[_],Q=S[D]=ae?Rn(S[D]):tn(S[D]);if(rs(Y,Q))p(Y,Q,P,null,I,Z,J,j,ae);else break;_--,D--}if(K>_){if(K<=D){const Y=D+1,Q=Y<b?S[Y].el:k;for(;K<=D;)p(null,S[K]=ae?Rn(S[K]):tn(S[K]),P,Q,I,Z,J,j,ae),K++}}else if(K>D)for(;K<=_;)V(y[K],I,Z,!0),K++;else{const Y=K,Q=K,le=new Map;for(K=Q;K<=D;K++){const Se=S[K]=ae?Rn(S[K]):tn(S[K]);Se.key!=null&&le.set(Se.key,K)}let _e,C=0;const z=D-Q+1;let xe=!1,we=0;const be=new Array(z);for(K=0;K<z;K++)be[K]=0;for(K=Y;K<=_;K++){const Se=y[K];if(C>=z){V(Se,I,Z,!0);continue}let De;if(Se.key!=null)De=le.get(Se.key);else for(_e=Q;_e<=D;_e++)if(be[_e-Q]===0&&rs(Se,S[_e])){De=_e;break}De===void 0?V(Se,I,Z,!0):(be[De-Q]=K+1,De>=we?we=De:xe=!0,p(Se,S[De],P,null,I,Z,J,j,ae),C++)}const Le=xe?hd(be):zi;for(_e=Le.length-1,K=z-1;K>=0;K--){const Se=Q+K,De=S[Se],Be=Se+1<b?S[Se+1].el:k;be[K]===0?p(null,De,P,Be,I,Z,J,j,ae):xe&&(_e<0||K!==Le[_e]?Me(De,P,Be,2):_e--)}}},Me=(y,S,P,k,I=null)=>{const{el:Z,type:J,transition:j,children:ae,shapeFlag:K}=y;if(K&6){Me(y.component.subTree,S,P,k);return}if(K&128){y.suspense.move(S,P,k);return}if(K&64){J.move(y,S,P,Ee);return}if(J===vn){i(Z,S,P);for(let _=0;_<ae.length;_++)Me(ae[_],S,P,k);i(y.anchor,S,P);return}if(J===Jr){v(y,S,P);return}if(k!==2&&K&1&&j)if(k===0)j.beforeEnter(Z),i(Z,S,P),At(()=>j.enter(Z),I);else{const{leave:_,delayLeave:D,afterLeave:Y}=j,Q=()=>i(Z,S,P),le=()=>{_(Z,()=>{Q(),Y&&Y()})};D?D(Z,Q,le):le()}else i(Z,S,P)},V=(y,S,P,k=!1,I=!1)=>{const{type:Z,props:J,ref:j,children:ae,dynamicChildren:K,shapeFlag:b,patchFlag:_,dirs:D}=y;if(j!=null&&Ko(j,null,P,y,!0),b&256){S.ctx.deactivate(y);return}const Y=b&1&&D,Q=!_r(y);let le;if(Q&&(le=J&&J.onVnodeBeforeUnmount)&&Qt(le,S,y),b&6)me(y.component,P,k);else{if(b&128){y.suspense.unmount(P,k);return}Y&&Vn(y,null,S,"beforeUnmount"),b&64?y.type.remove(y,S,P,I,Ee,k):K&&(Z!==vn||_>0&&_&64)?W(K,S,P,!1,!0):(Z===vn&&_&384||!I&&b&16)&&W(ae,S,P),k&&oe(y)}(Q&&(le=J&&J.onVnodeUnmounted)||Y)&&At(()=>{le&&Qt(le,S,y),Y&&Vn(y,null,S,"unmounted")},P)},oe=y=>{const{type:S,el:P,anchor:k,transition:I}=y;if(S===vn){de(P,k);return}if(S===Jr){T(y);return}const Z=()=>{s(P),I&&!I.persisted&&I.afterLeave&&I.afterLeave()};if(y.shapeFlag&1&&I&&!I.persisted){const{leave:J,delayLeave:j}=I,ae=()=>J(P,Z);j?j(y.el,Z,ae):ae()}else Z()},de=(y,S)=>{let P;for(;y!==S;)P=f(y),s(y),y=P;s(S)},me=(y,S,P)=>{const{bum:k,scope:I,update:Z,subTree:J,um:j}=y;k&&Yr(k),I.stop(),Z&&(Z.active=!1,V(J,y,S,P)),j&&At(j,S),At(()=>{y.isUnmounted=!0},S),S&&S.pendingBranch&&!S.isUnmounted&&y.asyncDep&&!y.asyncResolved&&y.suspenseId===S.pendingId&&(S.deps--,S.deps===0&&S.resolve())},W=(y,S,P,k=!1,I=!1,Z=0)=>{for(let J=Z;J<y.length;J++)V(y[J],S,P,k,I)},Ce=y=>y.shapeFlag&6?Ce(y.component.subTree):y.shapeFlag&128?y.suspense.next():f(y.anchor||y.el),Ae=(y,S,P)=>{y==null?S._vnode&&V(S._vnode,null,null,!0):p(S._vnode||null,y,S,null,null,null,P),Qa(),au(),S._vnode=y},Ee={p,um:V,m:Me,r:oe,mt:B,mc:M,pc:X,pbc:U,n:Ce,o:n};let pe,Ie;return e&&([pe,Ie]=e(Ee)),{render:Ae,hydrate:pe,createApp:ld(Ae,pe)}}function Wn({effect:n,update:e},t){n.allowRecurse=e.allowRecurse=t}function Su(n,e,t=!1){const i=n.children,s=e.children;if(ze(i)&&ze(s))for(let r=0;r<i.length;r++){const a=i[r];let o=s[r];o.shapeFlag&1&&!o.dynamicChildren&&((o.patchFlag<=0||o.patchFlag===32)&&(o=s[r]=Rn(s[r]),o.el=a.el),t||Su(a,o)),o.type===Ur&&(o.el=a.el)}}function hd(n){const e=n.slice(),t=[0];let i,s,r,a,o;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,a=t.length-1;r<a;)o=r+a>>1,n[t[o]]<c?r=o+1:a=o;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,a=t[r-1];r-- >0;)t[r]=a,a=e[a];return t}const fd=n=>n.__isTeleport,vn=Symbol(void 0),Ur=Symbol(void 0),Ls=Symbol(void 0),Jr=Symbol(void 0),bs=[];let Kt=null;function dd(n=!1){bs.push(Kt=n?null:[])}function pd(){bs.pop(),Kt=bs[bs.length-1]||null}let Ps=1;function al(n){Ps+=n}function md(n){return n.dynamicChildren=Ps>0?Kt||zi:null,pd(),Ps>0&&Kt&&Kt.push(n),n}function gd(n,e,t,i,s,r){return md(Tu(n,e,t,i,s,r,!0))}function _d(n){return n?n.__v_isVNode===!0:!1}function rs(n,e){return n.type===e.type&&n.key===e.key}const zr="__vInternal",wu=({key:n})=>n??null,xr=({ref:n,ref_key:e,ref_for:t})=>n!=null?mt(n)||Tt(n)||Ue(n)?{i:rn,r:n,k:e,f:!!t}:n:null;function Tu(n,e=null,t=null,i=0,s=null,r=n===vn?0:1,a=!1,o=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&wu(e),ref:e&&xr(e),scopeId:uu,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:rn};return o?(Pa(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=mt(t)?8:16),Ps>0&&!a&&Kt&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&Kt.push(l),l}const si=xd;function xd(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===Zf)&&(n=Ls),_d(n)){const o=Xi(n,e,!0);return t&&Pa(o,t),Ps>0&&!r&&Kt&&(o.shapeFlag&6?Kt[Kt.indexOf(n)]=o:Kt.push(o)),o.patchFlag|=-2,o}if(Ld(n)&&(n=n.__vccOpts),e){e=vd(e);let{class:o,style:l}=e;o&&!mt(o)&&(e.class=fa(o)),rt(l)&&(tu(l)&&!ze(l)&&(l=Et({},l)),e.style=ha(l))}const a=mt(n)?1:Df(n)?128:fd(n)?64:rt(n)?4:Ue(n)?2:0;return Tu(n,e,t,i,s,a,r,!0)}function vd(n){return n?tu(n)||zr in n?Et({},n):n:null}function Xi(n,e,t=!1){const{props:i,ref:s,patchFlag:r,children:a}=n,o=e?Md(i||{},e):i;return{__v_isVNode:!0,__v_skip:!0,type:n.type,props:o,key:o&&wu(o),ref:e&&e.ref?t&&s?ze(s)?s.concat(xr(e)):[s,xr(e)]:xr(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==vn?r===-1?16:r|16:r,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:n.transition,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Xi(n.ssContent),ssFallback:n.ssFallback&&Xi(n.ssFallback),el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce}}function yd(n=" ",e=0){return si(Ur,null,n,e)}function tn(n){return n==null||typeof n=="boolean"?si(Ls):ze(n)?si(vn,null,n.slice()):typeof n=="object"?Rn(n):si(Ur,null,String(n))}function Rn(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Xi(n)}function Pa(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(ze(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),Pa(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!(zr in e)?e._ctx=rn:s===3&&rn&&(rn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Ue(e)?(e={default:e,_ctx:rn},t=32):(e=String(e),i&64?(t=16,e=[yd(e)]):t=8);n.children=e,n.shapeFlag|=t}function Md(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=fa([e.class,i.class]));else if(s==="style")e.style=ha([e.style,i.style]);else if(Pr(s)){const r=e[s],a=i[s];a&&r!==a&&!(ze(r)&&r.includes(a))&&(e[s]=r?[].concat(r,a):a)}else s!==""&&(e[s]=i[s])}return e}function Qt(n,e,t,i=null){Jt(n,e,7,[t,i])}const bd=bu();let Sd=0;function wd(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||bd,r={uid:Sd++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,scope:new Uh(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:xu(i,s),emitsOptions:cu(i,s),emit:null,emitted:null,propsDefaults:Qe,inheritAttrs:i.inheritAttrs,ctx:Qe,data:Qe,props:Qe,attrs:Qe,slots:Qe,refs:Qe,setupState:Qe,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Ef.bind(null,r),n.ce&&n.ce(r),r}let at=null;const ji=n=>{at=n,n.scope.on()},ri=()=>{at&&at.scope.off(),at=null};function Eu(n){return n.vnode.shapeFlag&4}let Rs=!1;function Td(n,e=!1){Rs=e;const{props:t,children:i}=n.vnode,s=Eu(n);nd(n,t,s,e),rd(n,i);const r=s?Ed(n,e):void 0;return Rs=!1,r}function Ed(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=nu(new Proxy(n.ctx,Kf));const{setup:i}=t;if(i){const s=n.setupContext=i.length>1?Cd(n):null;ji(n),Qi();const r=Fn(i,n,0,[n.props,s]);if(es(),ri(),Hc(r)){if(r.then(ri,ri),e)return r.then(a=>{ll(n,a,e)}).catch(a=>{Fr(a,n,0)});n.asyncDep=r}else ll(n,r,e)}else Au(n,e)}function ll(n,e,t){Ue(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:rt(e)&&(n.setupState=iu(e)),Au(n,t)}let cl;function Au(n,e,t){const i=n.type;if(!n.render){if(!e&&cl&&!i.render){const s=i.template||Ca(n).template;if(s){const{isCustomElement:r,compilerOptions:a}=n.appContext.config,{delimiters:o,compilerOptions:l}=i,c=Et(Et({isCustomElement:r,delimiters:o},a),l);i.render=cl(s,c)}}n.render=i.render||$t}ji(n),Qi(),$f(n),es(),ri()}function Ad(n){return new Proxy(n.attrs,{get(e,t){return Ct(n,"get","$attrs"),e[t]}})}function Cd(n){const e=i=>{n.exposed=i||{}};let t;return{get attrs(){return t||(t=Ad(n))},slots:n.slots,emit:n.emit,expose:e}}function Ra(n){if(n.exposed)return n.exposeProxy||(n.exposeProxy=new Proxy(iu(nu(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Ms)return Ms[t](n)},has(e,t){return t in e||t in Ms}}))}function Ld(n){return Ue(n)&&"__vccOpts"in n}const Pd=(n,e)=>vf(n,e,Rs),Rd=Symbol(""),Dd=()=>gr(Rd),Id="3.2.47",Fd="http://www.w3.org/2000/svg",Jn=typeof document<"u"?document:null,ul=Jn&&Jn.createElement("template"),Od={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e?Jn.createElementNS(Fd,n):Jn.createElement(n,t?{is:t}:void 0);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Jn.createTextNode(n),createComment:n=>Jn.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Jn.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const a=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{ul.innerHTML=i?`<svg>${n}</svg>`:n;const o=ul.content;if(i){const l=o.firstChild;for(;l.firstChild;)o.appendChild(l.firstChild);o.removeChild(l)}e.insertBefore(o,t)}return[a?a.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}};function Nd(n,e,t){const i=n._vtc;i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}function Ud(n,e,t){const i=n.style,s=mt(t);if(t&&!s){if(e&&!mt(e))for(const r in e)t[r]==null&&$o(i,r,"");for(const r in t)$o(i,r,t[r])}else{const r=i.display;s?e!==t&&(i.cssText=t):e&&n.removeAttribute("style"),"_vod"in n&&(i.display=r)}}const hl=/\s*!important$/;function $o(n,e,t){if(ze(t))t.forEach(i=>$o(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=zd(n,e);hl.test(t)?n.setProperty(Ji(i),t.replace(hl,""),"important"):n[i]=t}}const fl=["Webkit","Moz","ms"],Qr={};function zd(n,e){const t=Qr[e];if(t)return t;let i=qi(e);if(i!=="filter"&&i in n)return Qr[e]=i;i=Vc(i);for(let s=0;s<fl.length;s++){const r=fl[s]+i;if(r in n)return Qr[e]=r}return e}const dl="http://www.w3.org/1999/xlink";function Bd(n,e,t,i,s){if(i&&e.startsWith("xlink:"))t==null?n.removeAttributeNS(dl,e.slice(6,e.length)):n.setAttributeNS(dl,e,t);else{const r=Th(e);t==null||r&&!Gc(t)?n.removeAttribute(e):n.setAttribute(e,r?"":t)}}function kd(n,e,t,i,s,r,a){if(e==="innerHTML"||e==="textContent"){i&&a(i,s,r),n[e]=t??"";return}if(e==="value"&&n.tagName!=="PROGRESS"&&!n.tagName.includes("-")){n._value=t;const l=t??"";(n.value!==l||n.tagName==="OPTION")&&(n.value=l),t==null&&n.removeAttribute(e);return}let o=!1;if(t===""||t==null){const l=typeof n[e];l==="boolean"?t=Gc(t):t==null&&l==="string"?(t="",o=!0):l==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(e)}function Gd(n,e,t,i){n.addEventListener(e,t,i)}function Hd(n,e,t,i){n.removeEventListener(e,t,i)}function Vd(n,e,t,i,s=null){const r=n._vei||(n._vei={}),a=r[e];if(i&&a)a.value=i;else{const[o,l]=Wd(e);if(i){const c=r[e]=jd(i,s);Gd(n,o,c,l)}else a&&(Hd(n,o,a,l),r[e]=void 0)}}const pl=/(?:Once|Passive|Capture)$/;function Wd(n){let e;if(pl.test(n)){e={};let i;for(;i=n.match(pl);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Ji(n.slice(2)),e]}let eo=0;const qd=Promise.resolve(),Xd=()=>eo||(qd.then(()=>eo=0),eo=Date.now());function jd(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;Jt(Yd(i,t.value),e,5,[i])};return t.value=n,t.attached=Xd(),t}function Yd(n,e){if(ze(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const ml=/^on[a-z]/,Zd=(n,e,t,i,s=!1,r,a,o,l)=>{e==="class"?Nd(n,i,s):e==="style"?Ud(n,t,i):Pr(e)?da(e)||Vd(n,e,t,i,a):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Kd(n,e,i,s))?kd(n,e,i,r,a,o,l):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Bd(n,e,i,s))};function Kd(n,e,t,i){return i?!!(e==="innerHTML"||e==="textContent"||e in n&&ml.test(e)&&Ue(t)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA"||ml.test(e)&&mt(t)?!1:e in n}const $d=Et({patchProp:Zd},Od);let gl;function Jd(){return gl||(gl=cd($d))}const Qd=(...n)=>{const e=Jd().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=ep(i);if(!s)return;const r=e._component;!Ue(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.innerHTML="";const a=t(s,!1,s instanceof SVGElement);return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),a},e};function ep(n){return mt(n)?document.querySelector(n):n}var ye=(n=>(n[n.UP=0]="UP",n[n.LEFT=1]="LEFT",n[n.FRONT=2]="FRONT",n[n.RIGHT=3]="RIGHT",n[n.BACK=4]="BACK",n[n.DOWN=5]="DOWN",n))(ye||{});const Jo=()=>Object.keys(ye).filter(n=>!isNaN(Number(n))).map(n=>Number(n)),Xt=class{constructor(){Xt.faceRotatorMap||this.initializeMap()}rotate(e,t){const i=[...e];return Xt.faceRotatorMap.get(t.side).forEach(s=>{t.counterClockwiseDirection?i[s.source]=e[s.destination]:i[s.destination]=e[s.source]}),i}initializeMap(){Xt.faceRotatorMap=new Map;const e=this.createUpFaceClockwiseRotator(),t=this.createLeftFaceClockwiseRotator(),i=this.createFrontFaceClockwiseRotator(),s=this.createRightFaceClockwiseRotator(),r=this.createBackFaceClockwiseRotator(),a=this.createDownFaceClockwiseRotator();Xt.faceRotatorMap.set(ye.UP,e),Xt.faceRotatorMap.set(ye.LEFT,t),Xt.faceRotatorMap.set(ye.FRONT,i),Xt.faceRotatorMap.set(ye.RIGHT,s),Xt.faceRotatorMap.set(ye.BACK,r),Xt.faceRotatorMap.set(ye.DOWN,a)}createDownFaceClockwiseRotator(){return[{destination:6,source:18},{destination:7,source:19},{destination:10,source:6},{destination:11,source:7},{destination:14,source:10},{destination:15,source:11},{destination:18,source:14},{destination:19,source:15},{destination:20,source:23},{destination:21,source:20},{destination:22,source:21},{destination:23,source:22}]}createRightFaceClockwiseRotator(){return[{destination:1,source:9},{destination:2,source:10},{destination:9,source:21},{destination:10,source:22},{destination:12,source:15},{destination:13,source:12},{destination:14,source:13},{destination:15,source:14},{destination:16,source:2},{destination:19,source:1},{destination:21,source:19},{destination:22,source:16}]}createUpFaceClockwiseRotator(){return[{destination:0,source:3},{destination:1,source:0},{destination:2,source:1},{destination:3,source:2},{destination:4,source:8},{destination:5,source:9},{destination:8,source:12},{destination:9,source:13},{destination:12,source:16},{destination:13,source:17},{destination:16,source:4},{destination:17,source:5}]}createBackFaceClockwiseRotator(){return[{destination:0,source:13},{destination:1,source:14},{destination:4,source:1},{destination:7,source:0},{destination:13,source:22},{destination:14,source:23},{destination:16,source:19},{destination:17,source:16},{destination:18,source:17},{destination:19,source:18},{destination:22,source:7},{destination:23,source:4}]}createLeftFaceClockwiseRotator(){return[{destination:0,source:18},{destination:3,source:17},{destination:4,source:7},{destination:5,source:4},{destination:6,source:5},{destination:7,source:6},{destination:8,source:0},{destination:11,source:3},{destination:17,source:23},{destination:18,source:20},{destination:20,source:8},{destination:23,source:11}]}createFrontFaceClockwiseRotator(){return[{destination:2,source:5},{destination:3,source:6},{destination:5,source:20},{destination:6,source:21},{destination:8,source:11},{destination:9,source:8},{destination:10,source:9},{destination:11,source:10},{destination:12,source:3},{destination:15,source:2},{destination:20,source:15},{destination:21,source:12}]}};let vr=Xt;Ke(vr,"faceRotatorMap");var wn=(n=>(n[n.YELLOW=0]="YELLOW",n[n.ORANGE=1]="ORANGE",n[n.BLUE=2]="BLUE",n[n.RED=3]="RED",n[n.GREEN=4]="GREEN",n[n.WHITE=5]="WHITE",n))(wn||{});const tp=n=>{switch(n){case 0:return 12696320;case 1:return 11488e3;case 2:return 1515647;case 3:return 8589842;case 4:return 30991;case 5:return 12895428}},pi=new Map;pi.set(ye.FRONT,wn.BLUE);pi.set(ye.UP,wn.YELLOW);pi.set(ye.RIGHT,wn.RED);pi.set(ye.LEFT,wn.ORANGE);pi.set(ye.BACK,wn.GREEN);pi.set(ye.DOWN,wn.WHITE);class np{constructor(e){Ke(this,"hash");Ke(this,"stickers");Ke(this,"dimension");if(this.dimension=e.dimension,e.clone)this.stickers=[...e.clone];else{let t=pi;e.colorMap&&(t=e.colorMap),this.stickers=[],Jo().forEach(i=>{const s=Array.from(new Array(this.getDimension()*this.getDimension())).map(()=>t.get(i));this.stickers.push(...s)})}this.hash=this.stickers.join(".")}getStickers(){return[...this.stickers]}getDimension(){return this.dimension}getConfiguration(){return[...this.stickers]}isSolved(){const e=this.dimension*this.dimension,t=Jo(),i=Array.from(new Array(e));return t.every((s,r)=>i.every((a,o)=>this.stickers[r*e+o]===this.stickers[r*e]))}getHash(){return this.hash}}const Xs=[[{side:ye.FRONT,id:8},{side:ye.LEFT,id:5},{side:ye.UP,id:3}],[{side:ye.FRONT,id:9},{side:ye.RIGHT,id:12},{side:ye.UP,id:2}],[{side:ye.FRONT,id:11},{side:ye.LEFT,id:6},{side:ye.DOWN,id:20}],[{side:ye.FRONT,id:10},{side:ye.RIGHT,id:15},{side:ye.DOWN,id:21}],[{side:ye.BACK,id:16},{side:ye.RIGHT,id:13},{side:ye.UP,id:1}],[{side:ye.BACK,id:17},{side:ye.LEFT,id:4},{side:ye.UP,id:0}],[{side:ye.BACK,id:19},{side:ye.RIGHT,id:14},{side:ye.DOWN,id:22}],[{side:ye.BACK,id:18},{side:ye.LEFT,id:7},{side:ye.DOWN,id:23}]];class Ar extends np{constructor(t){super({dimension:2,stickersMap:Xs,clone:t&&t.clone,colorMap:t&&(t==null?void 0:t.colorMap)});Ke(this,"faceRotator");this.faceRotator=new vr}clone(){return new Ar({clone:this.stickers})}rotateFace(t){const i=this.faceRotator.rotate(this.stickers,t);return new Ar({clone:i})}getCubeletsBySides(...t){const i=Xs.filter(s=>s.every(r=>t.includes(r.side)));return this.getCubeletsFromStickers(i)}getCubeletsByColor(...t){const i=Xs.filter(s=>s.every(r=>t.includes(this.stickers[r.id])));return this.getCubeletsFromStickers(i)}getAllCubelets(){return this.getCubeletsFromStickers(Xs)}getCubeletsFromStickers(t){return t.map(i=>({stickers:i.map(s=>{const r=s.id%4===0||s.id%4===3?0:1,a=s.id%4===0||s.id%4===1?0:1;return{side:s.side,id:s.id,color:this.stickers[s.id],x:r,y:a}})}))}}class ip{constructor(e=30){Ke(this,"minMoves");this.minMoves=e}scramble(e){let t;const i=Math.floor(e.getDimension()/2),s=Jo(),r=[];return Array.from(new Array(this.minMoves)).forEach(()=>{let a=Math.floor(Math.random()*s.length);for(;t!==void 0&&a===t;)a=Math.floor(Math.random()*s.length);t=a;const o=Math.floor(Math.random()*6)===0,l=Math.floor(Math.random()*2)===0,c=Math.floor(Math.random()*i),u={side:a,counterClockwiseDirection:l,layer:c};r.push(u),o&&r.push(u)}),r}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Da="149",gi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},_i={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},sp=0,_l=1,rp=2,Cu=1,op=2,ms=3,Un=0,Ot=1,Dn=2,On=0,Gi=1,xl=2,vl=3,yl=4,ap=5,Di=100,lp=101,cp=102,Ml=103,bl=104,up=200,hp=201,fp=202,dp=203,Lu=204,Pu=205,pp=206,mp=207,gp=208,_p=209,xp=210,vp=0,yp=1,Mp=2,Qo=3,bp=4,Sp=5,wp=6,Tp=7,Ru=0,Ep=1,Ap=2,Mn=0,Cp=1,Lp=2,Pp=3,Rp=4,Dp=5,Du=300,Yi=301,Zi=302,ea=303,ta=304,Br=306,na=1e3,Yt=1001,ia=1002,wt=1003,Sl=1004,to=1005,kt=1006,Ip=1007,Ds=1008,li=1009,Fp=1010,Op=1011,Iu=1012,Np=1013,ei=1014,ti=1015,Is=1016,Up=1017,zp=1018,Hi=1020,Bp=1021,Zt=1023,kp=1024,Gp=1025,oi=1026,Ki=1027,Hp=1028,Vp=1029,Wp=1030,qp=1031,Xp=1033,no=33776,io=33777,so=33778,ro=33779,wl=35840,Tl=35841,El=35842,Al=35843,jp=36196,Cl=37492,Ll=37496,Pl=37808,Rl=37809,Dl=37810,Il=37811,Fl=37812,Ol=37813,Nl=37814,Ul=37815,zl=37816,Bl=37817,kl=37818,Gl=37819,Hl=37820,Vl=37821,oo=36492,Yp=36283,Wl=36284,ql=36285,Xl=36286,ci=3e3,$e=3001,Zp=3200,Kp=3201,Fu=0,$p=1,en="srgb",Fs="srgb-linear",ao=7680,Jp=519,jl=35044,Yl="300 es",sa=1035;class mi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const _t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lo=Math.PI/180,Zl=180/Math.PI;function ts(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(_t[n&255]+_t[n>>8&255]+_t[n>>16&255]+_t[n>>24&255]+"-"+_t[e&255]+_t[e>>8&255]+"-"+_t[e>>16&15|64]+_t[e>>24&255]+"-"+_t[t&63|128]+_t[t>>8&255]+"-"+_t[t>>16&255]+_t[t>>24&255]+_t[i&255]+_t[i>>8&255]+_t[i>>16&255]+_t[i>>24&255]).toLowerCase()}function xt(n,e,t){return Math.max(e,Math.min(t,n))}function Qp(n,e){return(n%e+e)%e}function co(n,e,t){return(1-t)*n+t*e}function Kl(n){return(n&n-1)===0&&n!==0}function ra(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function js(n,e){switch(e.constructor){case Float32Array:return n;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Rt(n,e){switch(e.constructor){case Float32Array:return n;case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class ge{constructor(e=0,t=0){ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],m=i[5],g=i[8],p=s[0],d=s[3],x=s[6],A=s[1],v=s[4],T=s[7],w=s[2],R=s[5],O=s[8];return r[0]=a*p+o*A+l*w,r[3]=a*d+o*v+l*R,r[6]=a*x+o*T+l*O,r[1]=c*p+u*A+h*w,r[4]=c*d+u*v+h*R,r[7]=c*x+u*T+h*O,r[2]=f*p+m*A+g*w,r[5]=f*d+m*v+g*R,r[8]=f*x+m*T+g*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*r,m=c*r-a*l,g=t*h+i*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/g;return e[0]=h*p,e[1]=(s*c-u*i)*p,e[2]=(o*i-s*a)*p,e[3]=f*p,e[4]=(u*t-s*l)*p,e[5]=(s*r-o*t)*p,e[6]=m*p,e[7]=(i*l-c*t)*p,e[8]=(a*t-i*r)*p,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(uo.makeScale(e,t)),this}rotate(e){return this.premultiply(uo.makeRotation(-e)),this}translate(e,t){return this.premultiply(uo.makeTranslation(e,t)),this}makeTranslation(e,t){return this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const uo=new Ft;function Ou(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Cr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ai(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function yr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const ho={[en]:{[Fs]:ai},[Fs]:{[en]:yr}},Mt={legacyMode:!0,get workingColorSpace(){return Fs},set workingColorSpace(n){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(n,e,t){if(this.legacyMode||e===t||!e||!t)return n;if(ho[e]&&ho[e][t]!==void 0){const i=ho[e][t];return n.r=i(n.r),n.g=i(n.g),n.b=i(n.b),n}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)}},Nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ot={r:0,g:0,b:0},Ht={h:0,s:0,l:0},Ys={h:0,s:0,l:0};function fo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}function Zs(n,e){return e.r=n.r,e.g=n.g,e.b=n.b,e}class je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&i===void 0?this.set(e):this.setRGB(e,t,i)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=en){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=i,Mt.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=Mt.workingColorSpace){if(e=Qp(e,1),t=xt(t,0,1),i=xt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=fo(a,r,e+1/3),this.g=fo(a,r,e),this.b=fo(a,r,e-1/3)}return Mt.toWorkingColorSpace(this,s),this}setStyle(e,t=en){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(r[1],10))/255,this.g=Math.min(255,parseInt(r[2],10))/255,this.b=Math.min(255,parseInt(r[3],10))/255,Mt.toWorkingColorSpace(this,t),i(r[4]),this;if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(r[1],10))/100,this.g=Math.min(100,parseInt(r[2],10))/100,this.b=Math.min(100,parseInt(r[3],10))/100,Mt.toWorkingColorSpace(this,t),i(r[4]),this;break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const l=parseFloat(r[1])/360,c=parseFloat(r[2])/100,u=parseFloat(r[3])/100;return i(r[4]),this.setHSL(l,c,u,t)}break}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.r=parseInt(r.charAt(0)+r.charAt(0),16)/255,this.g=parseInt(r.charAt(1)+r.charAt(1),16)/255,this.b=parseInt(r.charAt(2)+r.charAt(2),16)/255,Mt.toWorkingColorSpace(this,t),this;if(a===6)return this.r=parseInt(r.charAt(0)+r.charAt(1),16)/255,this.g=parseInt(r.charAt(2)+r.charAt(3),16)/255,this.b=parseInt(r.charAt(4)+r.charAt(5),16)/255,Mt.toWorkingColorSpace(this,t),this}return e&&e.length>0?this.setColorName(e,t):this}setColorName(e,t=en){const i=Nu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}copyLinearToSRGB(e){return this.r=yr(e.r),this.g=yr(e.g),this.b=yr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=en){return Mt.fromWorkingColorSpace(Zs(this,ot),e),xt(ot.r*255,0,255)<<16^xt(ot.g*255,0,255)<<8^xt(ot.b*255,0,255)<<0}getHexString(e=en){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.fromWorkingColorSpace(Zs(this,ot),t);const i=ot.r,s=ot.g,r=ot.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Mt.workingColorSpace){return Mt.fromWorkingColorSpace(Zs(this,ot),t),e.r=ot.r,e.g=ot.g,e.b=ot.b,e}getStyle(e=en){return Mt.fromWorkingColorSpace(Zs(this,ot),e),e!==en?`color(${e} ${ot.r} ${ot.g} ${ot.b})`:`rgb(${ot.r*255|0},${ot.g*255|0},${ot.b*255|0})`}offsetHSL(e,t,i){return this.getHSL(Ht),Ht.h+=e,Ht.s+=t,Ht.l+=i,this.setHSL(Ht.h,Ht.s,Ht.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ht),e.getHSL(Ys);const i=co(Ht.h,Ys.h,t),s=co(Ht.s,Ys.s,t),r=co(Ht.l,Ys.l,t);return this.setHSL(i,s,r),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}je.NAMES=Nu;let xi;class Uu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{xi===void 0&&(xi=Cr("canvas")),xi.width=e.width,xi.height=e.height;const i=xi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=xi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Cr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ai(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ai(t[i]/255)*255):t[i]=ai(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class zu{constructor(e=null){this.isSource=!0,this.uuid=ts(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(po(s[a].image)):r.push(po(s[a]))}else r=po(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function po(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Uu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let em=0;class Nt extends mi{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,i=Yt,s=Yt,r=kt,a=Ds,o=Zt,l=li,c=Nt.DEFAULT_ANISOTROPY,u=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=ts(),this.name="",this.source=new zu(e),this.mipmaps=[],this.mapping=t,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case na:e.x=e.x-Math.floor(e.x);break;case Yt:e.x=e.x<0?0:1;break;case ia:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case na:e.y=e.y-Math.floor(e.y);break;case Yt:e.y=e.y<0?0:1;break;case ia:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=Du;Nt.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,i=0,s=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],m=l[5],g=l[9],p=l[2],d=l[6],x=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-p)<.01&&Math.abs(g-d)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+p)<.1&&Math.abs(g+d)<.1&&Math.abs(c+m+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,T=(m+1)/2,w=(x+1)/2,R=(u+f)/4,O=(h+p)/4,M=(g+d)/4;return v>T&&v>w?v<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(v),s=R/i,r=O/i):T>w?T<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),i=R/s,r=M/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=O/r,s=M/r),this.set(i,s,r,t),this}let A=Math.sqrt((d-g)*(d-g)+(h-p)*(h-p)+(f-u)*(f-u));return Math.abs(A)<.001&&(A=1),this.x=(d-g)/A,this.y=(h-p)/A,this.z=(f-u)/A,this.w=Math.acos((c+m+x-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ui extends mi{constructor(e=1,t=1,i={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const s={width:e,height:t,depth:1};this.texture=new Nt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.internalFormat=i.internalFormat!==void 0?i.internalFormat:null,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:kt,this.depthBuffer=i.depthBuffer!==void 0?i.depthBuffer:!0,this.stencilBuffer=i.stencilBuffer!==void 0?i.stencilBuffer:!1,this.depthTexture=i.depthTexture!==void 0?i.depthTexture:null,this.samples=i.samples!==void 0?i.samples:0}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new zu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bu extends Nt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=wt,this.minFilter=wt,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tm extends Nt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=wt,this.minFilter=wt,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[a+0],m=r[a+1],g=r[a+2],p=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=p;return}if(h!==p||l!==f||c!==m||u!==g){let d=1-o;const x=l*f+c*m+u*g+h*p,A=x>=0?1:-1,v=1-x*x;if(v>Number.EPSILON){const w=Math.sqrt(v),R=Math.atan2(w,x*A);d=Math.sin(d*R)/w,o=Math.sin(o*R)/w}const T=o*A;if(l=l*d+f*T,c=c*d+m*T,u=u*d+g*T,h=h*d+p*T,d===1-o){const w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+u*h+l*m-c*f,e[t+1]=l*g+u*f+c*h-o*m,e[t+2]=c*g+u*m+o*f-l*h,e[t+3]=u*g-o*h-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),h=o(r/2),f=l(i/2),m=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*u*h+c*m*g,this._y=c*m*h-f*u*g,this._z=c*u*g+f*m*h,this._w=c*u*h-f*m*g;break;case"YXZ":this._x=f*u*h+c*m*g,this._y=c*m*h-f*u*g,this._z=c*u*g-f*m*h,this._w=c*u*h+f*m*g;break;case"ZXY":this._x=f*u*h-c*m*g,this._y=c*m*h+f*u*g,this._z=c*u*g+f*m*h,this._w=c*u*h-f*m*g;break;case"ZYX":this._x=f*u*h-c*m*g,this._y=c*m*h+f*u*g,this._z=c*u*g-f*m*h,this._w=c*u*h+f*m*g;break;case"YZX":this._x=f*u*h+c*m*g,this._y=c*m*h+f*u*g,this._z=c*u*g-f*m*h,this._w=c*u*h-f*m*g;break;case"XZY":this._x=f*u*h-c*m*g,this._y=c*m*h-f*u*g,this._z=c*u*g+f*m*h,this._w=c*u*h+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=i+o+h;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(i>o&&i>h){const m=2*Math.sqrt(1+i-o-h);this._w=(u-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>h){const m=2*Math.sqrt(1+o-i-h);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+h-i-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,i=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($l.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($l.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=l*t+a*s-o*i,u=l*i+o*t-r*s,h=l*s+r*i-a*t,f=-r*t-a*i-o*s;return this.x=c*l+f*-r+u*-o-h*-a,this.y=u*l+f*-a+h*-r-c*-o,this.z=h*l+f*-o+c*-a-u*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return mo.copy(this).projectOnVector(e),this.sub(mo)}reflect(e){return this.sub(mo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const mo=new N,$l=new hi;class zs{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,i=1/0,s=1/0,r=-1/0,a=-1/0,o=-1/0;for(let l=0,c=e.length;l<c;l+=3){const u=e[l],h=e[l+1],f=e[l+2];u<t&&(t=u),h<i&&(i=h),f<s&&(s=f),u>r&&(r=u),h>a&&(a=h),f>o&&(o=f)}return this.min.set(t,i,s),this.max.set(r,a,o),this}setFromBufferAttribute(e){let t=1/0,i=1/0,s=1/0,r=-1/0,a=-1/0,o=-1/0;for(let l=0,c=e.count;l<c;l++){const u=e.getX(l),h=e.getY(l),f=e.getZ(l);u<t&&(t=u),h<i&&(i=h),f<s&&(s=f),u>r&&(r=u),h>a&&(a=h),f>o&&(o=f)}return this.min.set(t,i,s),this.max.set(r,a,o),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0)if(t&&i.attributes!=null&&i.attributes.position!==void 0){const r=i.attributes.position;for(let a=0,o=r.count;a<o;a++)qn.fromBufferAttribute(r,a).applyMatrix4(e.matrixWorld),this.expandByPoint(qn)}else i.boundingBox===null&&i.computeBoundingBox(),go.copy(i.boundingBox),go.applyMatrix4(e.matrixWorld),this.union(go);const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,qn),qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(os),Ks.subVectors(this.max,os),vi.subVectors(e.a,os),yi.subVectors(e.b,os),Mi.subVectors(e.c,os),An.subVectors(yi,vi),Cn.subVectors(Mi,yi),Xn.subVectors(vi,Mi);let t=[0,-An.z,An.y,0,-Cn.z,Cn.y,0,-Xn.z,Xn.y,An.z,0,-An.x,Cn.z,0,-Cn.x,Xn.z,0,-Xn.x,-An.y,An.x,0,-Cn.y,Cn.x,0,-Xn.y,Xn.x,0];return!_o(t,vi,yi,Mi,Ks)||(t=[1,0,0,0,1,0,0,0,1],!_o(t,vi,yi,Mi,Ks))?!1:($s.crossVectors(An,Cn),t=[$s.x,$s.y,$s.z],_o(t,vi,yi,Mi,Ks))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return qn.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(qn).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const fn=[new N,new N,new N,new N,new N,new N,new N,new N],qn=new N,go=new zs,vi=new N,yi=new N,Mi=new N,An=new N,Cn=new N,Xn=new N,os=new N,Ks=new N,$s=new N,jn=new N;function _o(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){jn.fromArray(n,r);const o=s.x*Math.abs(jn.x)+s.y*Math.abs(jn.y)+s.z*Math.abs(jn.z),l=e.dot(jn),c=t.dot(jn),u=i.dot(jn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const nm=new zs,as=new N,xo=new N;class Ia{constructor(e=new N,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):nm.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;as.subVectors(e,this.center);const t=as.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(as,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(as.copy(e.center).add(xo)),this.expandByPoint(as.copy(e.center).sub(xo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const dn=new N,vo=new N,Js=new N,Ln=new N,yo=new N,Qs=new N,Mo=new N;class im{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(i).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(dn.copy(this.direction).multiplyScalar(t).add(this.origin),dn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){vo.copy(e).add(t).multiplyScalar(.5),Js.copy(t).sub(e).normalize(),Ln.copy(this.origin).sub(vo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Js),o=Ln.dot(this.direction),l=-Ln.dot(Js),c=Ln.lengthSq(),u=Math.abs(1-a*a);let h,f,m,g;if(u>0)if(h=a*l-o,f=a*o-l,g=r*u,h>=0)if(f>=-g)if(f<=g){const p=1/u;h*=p,f*=p,m=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=r,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-l),r),m=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-l),r),m=-h*h+f*(f+2*l)+c);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;return i&&i.copy(this.direction).multiplyScalar(h).add(this.origin),s&&s.copy(Js).multiplyScalar(f).add(vo),m}intersectSphere(e,t){dn.subVectors(e.center,this.origin);const i=dn.dot(this.direction),s=dn.dot(dn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return o<0&&l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,dn)!==null}intersectTriangle(e,t,i,s,r){yo.subVectors(t,e),Qs.subVectors(i,e),Mo.crossVectors(yo,Qs);let a=this.direction.dot(Mo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ln.subVectors(this.origin,e);const l=o*this.direction.dot(Qs.crossVectors(Ln,Qs));if(l<0)return null;const c=o*this.direction.dot(yo.cross(Ln));if(c<0||l+c>a)return null;const u=-o*Ln.dot(Mo);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,i,s,r,a,o,l,c,u,h,f,m,g,p,d){const x=this.elements;return x[0]=e,x[4]=t,x[8]=i,x[12]=s,x[1]=r,x[5]=a,x[9]=o,x[13]=l,x[2]=c,x[6]=u,x[10]=h,x[14]=f,x[3]=m,x[7]=g,x[11]=p,x[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/bi.setFromMatrixColumn(e,0).length(),r=1/bi.setFromMatrixColumn(e,1).length(),a=1/bi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const f=a*u,m=a*h,g=o*u,p=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=m+g*c,t[5]=f-p*c,t[9]=-o*l,t[2]=p-f*c,t[6]=g+m*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,m=l*h,g=c*u,p=c*h;t[0]=f+p*o,t[4]=g*o-m,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=m*o-g,t[6]=p+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,m=l*h,g=c*u,p=c*h;t[0]=f-p*o,t[4]=-a*h,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*u,t[9]=p-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,m=a*h,g=o*u,p=o*h;t[0]=l*u,t[4]=g*c-m,t[8]=f*c+p,t[1]=l*h,t[5]=p*c+f,t[9]=m*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,m=a*c,g=o*l,p=o*c;t[0]=l*u,t[4]=p-f*h,t[8]=g*h+m,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*h+g,t[10]=f-p*h}else if(e.order==="XZY"){const f=a*l,m=a*c,g=o*l,p=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+p,t[5]=a*u,t[9]=m*h-g,t[2]=g*h-m,t[6]=o*u,t[10]=p*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sm,e,rm)}lookAt(e,t,i){const s=this.elements;return Dt.subVectors(e,t),Dt.lengthSq()===0&&(Dt.z=1),Dt.normalize(),Pn.crossVectors(i,Dt),Pn.lengthSq()===0&&(Math.abs(i.z)===1?Dt.x+=1e-4:Dt.z+=1e-4,Dt.normalize(),Pn.crossVectors(i,Dt)),Pn.normalize(),er.crossVectors(Dt,Pn),s[0]=Pn.x,s[4]=er.x,s[8]=Dt.x,s[1]=Pn.y,s[5]=er.y,s[9]=Dt.y,s[2]=Pn.z,s[6]=er.z,s[10]=Dt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],m=i[13],g=i[2],p=i[6],d=i[10],x=i[14],A=i[3],v=i[7],T=i[11],w=i[15],R=s[0],O=s[4],M=s[8],L=s[12],U=s[1],$=s[5],ue=s[9],G=s[13],B=s[2],ee=s[6],se=s[10],ie=s[14],X=s[3],ce=s[7],he=s[11],Me=s[15];return r[0]=a*R+o*U+l*B+c*X,r[4]=a*O+o*$+l*ee+c*ce,r[8]=a*M+o*ue+l*se+c*he,r[12]=a*L+o*G+l*ie+c*Me,r[1]=u*R+h*U+f*B+m*X,r[5]=u*O+h*$+f*ee+m*ce,r[9]=u*M+h*ue+f*se+m*he,r[13]=u*L+h*G+f*ie+m*Me,r[2]=g*R+p*U+d*B+x*X,r[6]=g*O+p*$+d*ee+x*ce,r[10]=g*M+p*ue+d*se+x*he,r[14]=g*L+p*G+d*ie+x*Me,r[3]=A*R+v*U+T*B+w*X,r[7]=A*O+v*$+T*ee+w*ce,r[11]=A*M+v*ue+T*se+w*he,r[15]=A*L+v*G+T*ie+w*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],m=e[14],g=e[3],p=e[7],d=e[11],x=e[15];return g*(+r*l*h-s*c*h-r*o*f+i*c*f+s*o*m-i*l*m)+p*(+t*l*m-t*c*f+r*a*f-s*a*m+s*c*u-r*l*u)+d*(+t*c*h-t*o*m-r*a*h+i*a*m+r*o*u-i*c*u)+x*(-s*o*u-t*l*h+t*o*f+s*a*h-i*a*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],m=e[11],g=e[12],p=e[13],d=e[14],x=e[15],A=h*d*c-p*f*c+p*l*m-o*d*m-h*l*x+o*f*x,v=g*f*c-u*d*c-g*l*m+a*d*m+u*l*x-a*f*x,T=u*p*c-g*h*c+g*o*m-a*p*m-u*o*x+a*h*x,w=g*h*l-u*p*l-g*o*f+a*p*f+u*o*d-a*h*d,R=t*A+i*v+s*T+r*w;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/R;return e[0]=A*O,e[1]=(p*f*r-h*d*r-p*s*m+i*d*m+h*s*x-i*f*x)*O,e[2]=(o*d*r-p*l*r+p*s*c-i*d*c-o*s*x+i*l*x)*O,e[3]=(h*l*r-o*f*r-h*s*c+i*f*c+o*s*m-i*l*m)*O,e[4]=v*O,e[5]=(u*d*r-g*f*r+g*s*m-t*d*m-u*s*x+t*f*x)*O,e[6]=(g*l*r-a*d*r-g*s*c+t*d*c+a*s*x-t*l*x)*O,e[7]=(a*f*r-u*l*r+u*s*c-t*f*c-a*s*m+t*l*m)*O,e[8]=T*O,e[9]=(g*h*r-u*p*r-g*i*m+t*p*m+u*i*x-t*h*x)*O,e[10]=(a*p*r-g*o*r+g*i*c-t*p*c-a*i*x+t*o*x)*O,e[11]=(u*o*r-a*h*r-u*i*c+t*h*c+a*i*m-t*o*m)*O,e[12]=w*O,e[13]=(u*p*s-g*h*s+g*i*f-t*p*f-u*i*d+t*h*d)*O,e[14]=(g*o*s-a*p*s-g*i*l+t*p*l+a*i*d-t*o*d)*O,e[15]=(a*h*s-u*o*s+u*i*l-t*h*l-a*i*f+t*o*f)*O,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,f=r*c,m=r*u,g=r*h,p=a*u,d=a*h,x=o*h,A=l*c,v=l*u,T=l*h,w=i.x,R=i.y,O=i.z;return s[0]=(1-(p+x))*w,s[1]=(m+T)*w,s[2]=(g-v)*w,s[3]=0,s[4]=(m-T)*R,s[5]=(1-(f+x))*R,s[6]=(d+A)*R,s[7]=0,s[8]=(g+v)*O,s[9]=(d-A)*O,s[10]=(1-(f+p))*O,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=bi.set(s[0],s[1],s[2]).length();const a=bi.set(s[4],s[5],s[6]).length(),o=bi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Vt.copy(this);const c=1/r,u=1/a,h=1/o;return Vt.elements[0]*=c,Vt.elements[1]*=c,Vt.elements[2]*=c,Vt.elements[4]*=u,Vt.elements[5]*=u,Vt.elements[6]*=u,Vt.elements[8]*=h,Vt.elements[9]*=h,Vt.elements[10]*=h,t.setFromRotationMatrix(Vt),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a){const o=this.elements,l=2*r/(t-e),c=2*r/(i-s),u=(t+e)/(t-e),h=(i+s)/(i-s),f=-(a+r)/(a-r),m=-2*a*r/(a-r);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=f,o[14]=m,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,i,s,r,a){const o=this.elements,l=1/(t-e),c=1/(i-s),u=1/(a-r),h=(t+e)*l,f=(i+s)*c,m=(a+r)*u;return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-f,o[2]=0,o[6]=0,o[10]=-2*u,o[14]=-m,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const bi=new N,Vt=new st,sm=new N(0,0,0),rm=new N(1,1,1),Pn=new N,er=new N,Dt=new N,Jl=new st,Ql=new hi;class kr{constructor(e=0,t=0,i=0,s=kr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(xt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-xt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Jl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ql.setFromEuler(this),this.setFromQuaternion(Ql,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kr.DEFAULT_ORDER="XYZ";class ku{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let om=0;const ec=new N,Si=new hi,pn=new st,tr=new N,ls=new N,am=new N,lm=new hi,tc=new N(1,0,0),nc=new N(0,1,0),ic=new N(0,0,1),cm={type:"added"},sc={type:"removed"};class pt extends mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:om++}),this.uuid=ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new N,t=new kr,i=new hi,s=new N(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new st},normalMatrix:{value:new Ft}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new ku,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.multiply(Si),this}rotateOnWorldAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.premultiply(Si),this}rotateX(e){return this.rotateOnAxis(tc,e)}rotateY(e){return this.rotateOnAxis(nc,e)}rotateZ(e){return this.rotateOnAxis(ic,e)}translateOnAxis(e,t){return ec.copy(e).applyQuaternion(this.quaternion),this.position.add(ec.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(tc,e)}translateY(e){return this.translateOnAxis(nc,e)}translateZ(e){return this.translateOnAxis(ic,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?tr.copy(e):tr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(ls,tr,this.up):pn.lookAt(tr,ls,this.up),this.quaternion.setFromRotationMatrix(pn),s&&(pn.extractRotation(s.matrixWorld),Si.setFromRotationMatrix(pn),this.quaternion.premultiply(Si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(cm)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sc)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(sc)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t){let i=[];this[e]===t&&i.push(this);for(let s=0,r=this.children.length;s<r;s++){const a=this.children[s].getObjectsByProperty(e,t);a.length>0&&(i=i.concat(a))}return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,e,am),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,lm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}pt.DEFAULT_UP=new N(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wt=new N,mn=new N,bo=new N,gn=new N,wi=new N,Ti=new N,rc=new N,So=new N,wo=new N,To=new N;class yn{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Wt.subVectors(e,t),s.cross(Wt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Wt.subVectors(s,t),mn.subVectors(i,t),bo.subVectors(e,t);const a=Wt.dot(Wt),o=Wt.dot(mn),l=Wt.dot(bo),c=mn.dot(mn),u=mn.dot(bo),h=a*c-o*o;if(h===0)return r.set(-2,-1,-1);const f=1/h,m=(c*l-o*u)*f,g=(a*u-o*l)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,gn),gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getUV(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,gn),l.set(0,0),l.addScaledVector(r,gn.x),l.addScaledVector(a,gn.y),l.addScaledVector(o,gn.z),l}static isFrontFacing(e,t,i,s){return Wt.subVectors(i,t),mn.subVectors(e,t),Wt.cross(mn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Wt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return yn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return yn.getUV(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;wi.subVectors(s,i),Ti.subVectors(r,i),So.subVectors(e,i);const l=wi.dot(So),c=Ti.dot(So);if(l<=0&&c<=0)return t.copy(i);wo.subVectors(e,s);const u=wi.dot(wo),h=Ti.dot(wo);if(u>=0&&h<=u)return t.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(wi,a);To.subVectors(e,r);const m=wi.dot(To),g=Ti.dot(To);if(g>=0&&m<=g)return t.copy(r);const p=m*c-l*g;if(p<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Ti,o);const d=u*g-m*h;if(d<=0&&h-u>=0&&m-g>=0)return rc.subVectors(r,s),o=(h-u)/(h-u+(m-g)),t.copy(s).addScaledVector(rc,o);const x=1/(d+p+f);return a=p*x,o=f*x,t.copy(i).addScaledVector(wi,a).addScaledVector(Ti,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let um=0;class Bs extends mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=ts(),this.name="",this.type="Material",this.blending=Gi,this.side=Un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Lu,this.blendDst=Pu,this.blendEquation=Di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Qo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ao,this.stencilZFail=ao,this.stencilZPass=ao,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}const s=this[t];if(s===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(i.blending=this.blending),this.side!==Un&&(i.side=this.side),this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.stencilWrite=this.stencilWrite,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(i.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(i.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=this.flatShading),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Gu extends Bs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ru,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const it=new N,nr=new ge;class an{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=jl,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)nr.fromBufferAttribute(this,t),nr.applyMatrix3(e),this.setXY(t,nr.x,nr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)it.fromBufferAttribute(this,t),it.applyMatrix3(e),this.setXYZ(t,it.x,it.y,it.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)it.fromBufferAttribute(this,t),it.applyMatrix4(e),this.setXYZ(t,it.x,it.y,it.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)it.fromBufferAttribute(this,t),it.applyNormalMatrix(e),this.setXYZ(t,it.x,it.y,it.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)it.fromBufferAttribute(this,t),it.transformDirection(e),this.setXYZ(t,it.x,it.y,it.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=js(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=js(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=js(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=js(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),i=Rt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),i=Rt(i,this.array),s=Rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),i=Rt(i,this.array),s=Rt(s,this.array),r=Rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==jl&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Hu extends an{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Vu extends an{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class bn extends an{constructor(e,t,i){super(new Float32Array(e),t,i)}}let hm=0;const zt=new st,Eo=new pt,Ei=new N,It=new zs,cs=new zs,ft=new N;class zn extends mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=ts(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ou(e)?Vu:Hu)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ft().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zt.makeRotationFromQuaternion(e),this.applyMatrix4(zt),this}rotateX(e){return zt.makeRotationX(e),this.applyMatrix4(zt),this}rotateY(e){return zt.makeRotationY(e),this.applyMatrix4(zt),this}rotateZ(e){return zt.makeRotationZ(e),this.applyMatrix4(zt),this}translate(e,t,i){return zt.makeTranslation(e,t,i),this.applyMatrix4(zt),this}scale(e,t,i){return zt.makeScale(e,t,i),this.applyMatrix4(zt),this}lookAt(e){return Eo.lookAt(e),Eo.updateMatrix(),this.applyMatrix4(Eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new bn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];It.setFromBufferAttribute(r),this.morphTargetsRelative?(ft.addVectors(this.boundingBox.min,It.min),this.boundingBox.expandByPoint(ft),ft.addVectors(this.boundingBox.max,It.max),this.boundingBox.expandByPoint(ft)):(this.boundingBox.expandByPoint(It.min),this.boundingBox.expandByPoint(It.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ia);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(It.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];cs.setFromBufferAttribute(o),this.morphTargetsRelative?(ft.addVectors(It.min,cs.min),It.expandByPoint(ft),ft.addVectors(It.max,cs.max),It.expandByPoint(ft)):(It.expandByPoint(cs.min),It.expandByPoint(cs.max))}It.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)ft.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(ft));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)ft.fromBufferAttribute(o,c),l&&(Ei.fromBufferAttribute(e,c),ft.add(Ei)),s=Math.max(s,i.distanceToSquared(ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let U=0;U<o;U++)c[U]=new N,u[U]=new N;const h=new N,f=new N,m=new N,g=new ge,p=new ge,d=new ge,x=new N,A=new N;function v(U,$,ue){h.fromArray(s,U*3),f.fromArray(s,$*3),m.fromArray(s,ue*3),g.fromArray(a,U*2),p.fromArray(a,$*2),d.fromArray(a,ue*2),f.sub(h),m.sub(h),p.sub(g),d.sub(g);const G=1/(p.x*d.y-d.x*p.y);isFinite(G)&&(x.copy(f).multiplyScalar(d.y).addScaledVector(m,-p.y).multiplyScalar(G),A.copy(m).multiplyScalar(p.x).addScaledVector(f,-d.x).multiplyScalar(G),c[U].add(x),c[$].add(x),c[ue].add(x),u[U].add(A),u[$].add(A),u[ue].add(A))}let T=this.groups;T.length===0&&(T=[{start:0,count:i.length}]);for(let U=0,$=T.length;U<$;++U){const ue=T[U],G=ue.start,B=ue.count;for(let ee=G,se=G+B;ee<se;ee+=3)v(i[ee+0],i[ee+1],i[ee+2])}const w=new N,R=new N,O=new N,M=new N;function L(U){O.fromArray(r,U*3),M.copy(O);const $=c[U];w.copy($),w.sub(O.multiplyScalar(O.dot($))).normalize(),R.crossVectors(M,$);const G=R.dot(u[U])<0?-1:1;l[U*4]=w.x,l[U*4+1]=w.y,l[U*4+2]=w.z,l[U*4+3]=G}for(let U=0,$=T.length;U<$;++U){const ue=T[U],G=ue.start,B=ue.count;for(let ee=G,se=G+B;ee<se;ee+=3)L(i[ee+0]),L(i[ee+1]),L(i[ee+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new an(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,u=new N,h=new N;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),p=e.getX(f+1),d=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,p),a.fromBufferAttribute(t,d),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,p),c.fromBufferAttribute(i,d),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(p,l.x,l.y,l.z),i.setXYZ(d,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)ft.fromBufferAttribute(e,t),ft.normalize(),e.setXYZ(t,ft.x,ft.y,ft.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let m=0,g=0;for(let p=0,d=l.length;p<d;p++){o.isInterleavedBufferAttribute?m=l[p]*o.data.stride+o.offset:m=l[p]*u;for(let x=0;x<u;x++)f[g++]=c[m++]}return new an(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new zn,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],m=e(f,i);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const m=c[h];u.push(m.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,m=h.length;f<m;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const oc=new st,Ai=new im,Ao=new Ia,us=new N,hs=new N,fs=new N,Co=new N,ir=new N,sr=new ge,rr=new ge,or=new ge,Lo=new N,ar=new N;class on extends pt{constructor(e=new zn,t=new Gu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ir.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(Co.fromBufferAttribute(h,e),a?ir.addScaledVector(Co,u):ir.addScaledVector(Co.sub(t),u))}t.add(ir)}return this.isSkinnedMesh&&this.boneTransform(e,t),t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;if(s===void 0||(i.boundingSphere===null&&i.computeBoundingSphere(),Ao.copy(i.boundingSphere),Ao.applyMatrix4(r),e.ray.intersectsSphere(Ao)===!1)||(oc.copy(r).invert(),Ai.copy(e.ray).applyMatrix4(oc),i.boundingBox!==null&&Ai.intersectsBox(i.boundingBox)===!1))return;let a;const o=i.index,l=i.attributes.position,c=i.attributes.uv,u=i.attributes.uv2,h=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(s))for(let m=0,g=h.length;m<g;m++){const p=h[m],d=s[p.materialIndex],x=Math.max(p.start,f.start),A=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let v=x,T=A;v<T;v+=3){const w=o.getX(v),R=o.getX(v+1),O=o.getX(v+2);a=lr(this,d,e,Ai,c,u,w,R,O),a&&(a.faceIndex=Math.floor(v/3),a.face.materialIndex=p.materialIndex,t.push(a))}}else{const m=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let p=m,d=g;p<d;p+=3){const x=o.getX(p),A=o.getX(p+1),v=o.getX(p+2);a=lr(this,s,e,Ai,c,u,x,A,v),a&&(a.faceIndex=Math.floor(p/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let m=0,g=h.length;m<g;m++){const p=h[m],d=s[p.materialIndex],x=Math.max(p.start,f.start),A=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=x,T=A;v<T;v+=3){const w=v,R=v+1,O=v+2;a=lr(this,d,e,Ai,c,u,w,R,O),a&&(a.faceIndex=Math.floor(v/3),a.face.materialIndex=p.materialIndex,t.push(a))}}else{const m=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let p=m,d=g;p<d;p+=3){const x=p,A=p+1,v=p+2;a=lr(this,s,e,Ai,c,u,x,A,v),a&&(a.faceIndex=Math.floor(p/3),t.push(a))}}}}function fm(n,e,t,i,s,r,a,o){let l;if(e.side===Ot?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Un,o),l===null)return null;ar.copy(o),ar.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ar);return c<t.near||c>t.far?null:{distance:c,point:ar.clone(),object:n}}function lr(n,e,t,i,s,r,a,o,l){n.getVertexPosition(a,us),n.getVertexPosition(o,hs),n.getVertexPosition(l,fs);const c=fm(n,e,t,i,us,hs,fs,Lo);if(c){s&&(sr.fromBufferAttribute(s,a),rr.fromBufferAttribute(s,o),or.fromBufferAttribute(s,l),c.uv=yn.getUV(Lo,us,hs,fs,sr,rr,or,new ge)),r&&(sr.fromBufferAttribute(r,a),rr.fromBufferAttribute(r,o),or.fromBufferAttribute(r,l),c.uv2=yn.getUV(Lo,us,hs,fs,sr,rr,or,new ge));const u={a,b:o,c:l,normal:new N,materialIndex:0};yn.getNormal(us,hs,fs,u.normal),c.face=u}return c}class ns extends zn{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,m=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new bn(c,3)),this.setAttribute("normal",new bn(u,3)),this.setAttribute("uv",new bn(h,2));function g(p,d,x,A,v,T,w,R,O,M,L){const U=T/O,$=w/M,ue=T/2,G=w/2,B=R/2,ee=O+1,se=M+1;let ie=0,X=0;const ce=new N;for(let he=0;he<se;he++){const Me=he*$-G;for(let V=0;V<ee;V++){const oe=V*U-ue;ce[p]=oe*A,ce[d]=Me*v,ce[x]=B,c.push(ce.x,ce.y,ce.z),ce[p]=0,ce[d]=0,ce[x]=R>0?1:-1,u.push(ce.x,ce.y,ce.z),h.push(V/O),h.push(1-he/M),ie+=1}}for(let he=0;he<M;he++)for(let Me=0;Me<O;Me++){const V=f+Me+ee*he,oe=f+Me+ee*(he+1),de=f+(Me+1)+ee*(he+1),me=f+(Me+1)+ee*he;l.push(V,oe,me),l.push(oe,de,me),X+=6}o.addGroup(m,X,L),m+=X,f+=ie}}static fromJSON(e){return new ns(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function $i(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function St(n){const e={};for(let t=0;t<n.length;t++){const i=$i(n[t]);for(const s in i)e[s]=i[s]}return e}function dm(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Wu(n){return n.getRenderTarget()===null&&n.outputEncoding===$e?en:Fs}const pm={clone:$i,merge:St};var mm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fi extends Bs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mm,this.fragmentShader=gm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=dm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class qu extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Gt extends qu{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Zl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zl*2*Math.atan(Math.tan(lo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(lo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ci=-90,Li=1;class _m extends pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i;const s=new Gt(Ci,Li,e,t);s.layers=this.layers,s.up.set(0,1,0),s.lookAt(1,0,0),this.add(s);const r=new Gt(Ci,Li,e,t);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(-1,0,0),this.add(r);const a=new Gt(Ci,Li,e,t);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(0,1,0),this.add(a);const o=new Gt(Ci,Li,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const l=new Gt(Ci,Li,e,t);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,1),this.add(l);const c=new Gt(Ci,Li,e,t);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,-1),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const i=this.renderTarget,[s,r,a,o,l,c]=this.children,u=e.getRenderTarget(),h=e.toneMapping,f=e.xr.enabled;e.toneMapping=Mn,e.xr.enabled=!1;const m=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0),e.render(t,s),e.setRenderTarget(i,1),e.render(t,r),e.setRenderTarget(i,2),e.render(t,a),e.setRenderTarget(i,3),e.render(t,o),e.setRenderTarget(i,4),e.render(t,l),i.texture.generateMipmaps=m,e.setRenderTarget(i,5),e.render(t,c),e.setRenderTarget(u),e.toneMapping=h,e.xr.enabled=f,i.texture.needsPMREMUpdate=!0}}class Xu extends Nt{constructor(e,t,i,s,r,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Yi,super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xm extends ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Xu(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:kt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ns(5,5,5),r=new fi({name:"CubemapFromEquirect",uniforms:$i(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ot,blending:On});r.uniforms.tEquirect.value=t;const a=new on(s,r),o=t.minFilter;return t.minFilter===Ds&&(t.minFilter=kt),new _m(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const Po=new N,vm=new N,ym=new Ft;class Zn{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Po.subVectors(i,t).cross(vm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const i=e.delta(Po),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(i).multiplyScalar(r).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ym.getNormalMatrix(e),s=this.coplanarPoint(Po).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new Ia,cr=new N;class Fa{constructor(e=new Zn,t=new Zn,i=new Zn,s=new Zn,r=new Zn,a=new Zn){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e){const t=this.planes,i=e.elements,s=i[0],r=i[1],a=i[2],o=i[3],l=i[4],c=i[5],u=i[6],h=i[7],f=i[8],m=i[9],g=i[10],p=i[11],d=i[12],x=i[13],A=i[14],v=i[15];return t[0].setComponents(o-s,h-l,p-f,v-d).normalize(),t[1].setComponents(o+s,h+l,p+f,v+d).normalize(),t[2].setComponents(o+r,h+c,p+m,v+x).normalize(),t[3].setComponents(o-r,h-c,p-m,v-x).normalize(),t[4].setComponents(o-a,h-u,p-g,v-A).normalize(),t[5].setComponents(o+a,h+u,p+g,v+A).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSprite(e){return Pi.center.set(0,0,0),Pi.radius=.7071067811865476,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(cr.x=s.normal.x>0?e.max.x:e.min.x,cr.y=s.normal.y>0?e.max.y:e.min.y,cr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(cr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ju(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Mm(n,e){const t=e.isWebGL2,i=new WeakMap;function s(c,u){const h=c.array,f=c.usage,m=n.createBuffer();n.bindBuffer(u,m),n.bufferData(u,h,f),c.onUploadCallback();let g;if(h instanceof Float32Array)g=5126;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(h instanceof Int16Array)g=5122;else if(h instanceof Uint32Array)g=5125;else if(h instanceof Int32Array)g=5124;else if(h instanceof Int8Array)g=5120;else if(h instanceof Uint8Array)g=5121;else if(h instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:m,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version}}function r(c,u,h){const f=u.array,m=u.updateRange;n.bindBuffer(h,c),m.count===-1?n.bufferSubData(h,0,f):(t?n.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):n.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=i.get(c);(!f||f.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h===void 0?i.set(c,s(c,u)):h.version<c.version&&(r(h.buffer,c,u),h.version=c.version)}return{get:a,remove:o,update:l}}class Oa extends zn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,h=e/o,f=t/l,m=[],g=[],p=[],d=[];for(let x=0;x<u;x++){const A=x*f-a;for(let v=0;v<c;v++){const T=v*h-r;g.push(T,-A,0),p.push(0,0,1),d.push(v/o),d.push(1-x/l)}}for(let x=0;x<l;x++)for(let A=0;A<o;A++){const v=A+c*x,T=A+c*(x+1),w=A+1+c*(x+1),R=A+1+c*x;m.push(v,T,R),m.push(T,w,R)}this.setIndex(m),this.setAttribute("position",new bn(g,3)),this.setAttribute("normal",new bn(p,3)),this.setAttribute("uv",new bn(d,2))}static fromJSON(e){return new Oa(e.width,e.height,e.widthSegments,e.heightSegments)}}var bm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,Sm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Tm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Em=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Am=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cm="vec3 transformed = vec3( position );",Lm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pm=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,Rm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Dm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Fm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Om=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Bm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,km=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Gm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Hm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Vm=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Wm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Xm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ym="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zm=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Km=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$m=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Jm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,eg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ng=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ig=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,og=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,ag=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ug=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,hg=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,fg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,_g=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,xg=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,yg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,Mg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bg=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,wg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Tg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Eg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ag=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Cg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rg=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Ig=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Fg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Og=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,Ng=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ug=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,Gg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Hg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,Vg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,Wg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,jg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$g=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qg=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,e_=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,t_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,n_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,i_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,s_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,r_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,o_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,a_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,l_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,c_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,u_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,h_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,f_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,d_=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,p_=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,m_=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,g_=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,__=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,x_=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,v_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const y_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,b_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,S_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,w_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,E_=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,A_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,C_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,L_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,P_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,R_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,D_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,I_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,F_=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,O_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,B_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,G_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,H_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,q_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Z_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,K_=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,J_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Q_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Oe={alphamap_fragment:bm,alphamap_pars_fragment:Sm,alphatest_fragment:wm,alphatest_pars_fragment:Tm,aomap_fragment:Em,aomap_pars_fragment:Am,begin_vertex:Cm,beginnormal_vertex:Lm,bsdfs:Pm,iridescence_fragment:Rm,bumpmap_pars_fragment:Dm,clipping_planes_fragment:Im,clipping_planes_pars_fragment:Fm,clipping_planes_pars_vertex:Om,clipping_planes_vertex:Nm,color_fragment:Um,color_pars_fragment:zm,color_pars_vertex:Bm,color_vertex:km,common:Gm,cube_uv_reflection_fragment:Hm,defaultnormal_vertex:Vm,displacementmap_pars_vertex:Wm,displacementmap_vertex:qm,emissivemap_fragment:Xm,emissivemap_pars_fragment:jm,encodings_fragment:Ym,encodings_pars_fragment:Zm,envmap_fragment:Km,envmap_common_pars_fragment:$m,envmap_pars_fragment:Jm,envmap_pars_vertex:Qm,envmap_physical_pars_fragment:hg,envmap_vertex:eg,fog_vertex:tg,fog_pars_vertex:ng,fog_fragment:ig,fog_pars_fragment:sg,gradientmap_pars_fragment:rg,lightmap_fragment:og,lightmap_pars_fragment:ag,lights_lambert_fragment:lg,lights_lambert_pars_fragment:cg,lights_pars_begin:ug,lights_toon_fragment:fg,lights_toon_pars_fragment:dg,lights_phong_fragment:pg,lights_phong_pars_fragment:mg,lights_physical_fragment:gg,lights_physical_pars_fragment:_g,lights_fragment_begin:xg,lights_fragment_maps:vg,lights_fragment_end:yg,logdepthbuf_fragment:Mg,logdepthbuf_pars_fragment:bg,logdepthbuf_pars_vertex:Sg,logdepthbuf_vertex:wg,map_fragment:Tg,map_pars_fragment:Eg,map_particle_fragment:Ag,map_particle_pars_fragment:Cg,metalnessmap_fragment:Lg,metalnessmap_pars_fragment:Pg,morphcolor_vertex:Rg,morphnormal_vertex:Dg,morphtarget_pars_vertex:Ig,morphtarget_vertex:Fg,normal_fragment_begin:Og,normal_fragment_maps:Ng,normal_pars_fragment:Ug,normal_pars_vertex:zg,normal_vertex:Bg,normalmap_pars_fragment:kg,clearcoat_normal_fragment_begin:Gg,clearcoat_normal_fragment_maps:Hg,clearcoat_pars_fragment:Vg,iridescence_pars_fragment:Wg,output_fragment:qg,packing:Xg,premultiplied_alpha_fragment:jg,project_vertex:Yg,dithering_fragment:Zg,dithering_pars_fragment:Kg,roughnessmap_fragment:$g,roughnessmap_pars_fragment:Jg,shadowmap_pars_fragment:Qg,shadowmap_pars_vertex:e_,shadowmap_vertex:t_,shadowmask_pars_fragment:n_,skinbase_vertex:i_,skinning_pars_vertex:s_,skinning_vertex:r_,skinnormal_vertex:o_,specularmap_fragment:a_,specularmap_pars_fragment:l_,tonemapping_fragment:c_,tonemapping_pars_fragment:u_,transmission_fragment:h_,transmission_pars_fragment:f_,uv_pars_fragment:d_,uv_pars_vertex:p_,uv_vertex:m_,uv2_pars_fragment:g_,uv2_pars_vertex:__,uv2_vertex:x_,worldpos_vertex:v_,background_vert:y_,background_frag:M_,backgroundCube_vert:b_,backgroundCube_frag:S_,cube_vert:w_,cube_frag:T_,depth_vert:E_,depth_frag:A_,distanceRGBA_vert:C_,distanceRGBA_frag:L_,equirect_vert:P_,equirect_frag:R_,linedashed_vert:D_,linedashed_frag:I_,meshbasic_vert:F_,meshbasic_frag:O_,meshlambert_vert:N_,meshlambert_frag:U_,meshmatcap_vert:z_,meshmatcap_frag:B_,meshnormal_vert:k_,meshnormal_frag:G_,meshphong_vert:H_,meshphong_frag:V_,meshphysical_vert:W_,meshphysical_frag:q_,meshtoon_vert:X_,meshtoon_frag:j_,points_vert:Y_,points_frag:Z_,shadow_vert:K_,shadow_frag:$_,sprite_vert:J_,sprite_frag:Q_},ve={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new Ft},uv2Transform:{value:new Ft},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Ft}}},nn={basic:{uniforms:St([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:St([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new je(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:St([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:St([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:St([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new je(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:St([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:St([ve.points,ve.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:St([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:St([ve.common,ve.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:St([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:St([ve.sprite,ve.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:St([ve.common,ve.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:St([ve.lights,ve.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};nn.physical={uniforms:St([nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new ge(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const ur={r:0,b:0,g:0};function e0(n,e,t,i,s,r,a){const o=new je(0);let l=r===!0?0:1,c,u,h=null,f=0,m=null;function g(d,x){let A=!1,v=x.isScene===!0?x.background:null;v&&v.isTexture&&(v=(x.backgroundBlurriness>0?t:e).get(v));const T=n.xr,w=T.getSession&&T.getSession();w&&w.environmentBlendMode==="additive"&&(v=null),v===null?p(o,l):v&&v.isColor&&(p(v,1),A=!0),(n.autoClear||A)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Br)?(u===void 0&&(u=new on(new ns(1,1,1),new fi({name:"BackgroundCubeMaterial",uniforms:$i(nn.backgroundCube.uniforms),vertexShader:nn.backgroundCube.vertexShader,fragmentShader:nn.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,O,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.toneMapped=v.encoding!==$e,(h!==v||f!==v.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,h=v,f=v.version,m=n.toneMapping),u.layers.enableAll(),d.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new on(new Oa(2,2),new fi({name:"BackgroundMaterial",uniforms:$i(nn.background.uniforms),vertexShader:nn.background.vertexShader,fragmentShader:nn.background.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=v.encoding!==$e,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||f!==v.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,h=v,f=v.version,m=n.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null))}function p(d,x){d.getRGB(ur,Wu(n)),i.buffers.color.setClear(ur.r,ur.g,ur.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(d,x=1){o.set(d),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(d){l=d,p(o,l)},render:g}}function t0(n,e,t,i){const s=n.getParameter(34921),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=d(null);let c=l,u=!1;function h(B,ee,se,ie,X){let ce=!1;if(a){const he=p(ie,se,ee);c!==he&&(c=he,m(c.object)),ce=x(B,ie,se,X),ce&&A(B,ie,se,X)}else{const he=ee.wireframe===!0;(c.geometry!==ie.id||c.program!==se.id||c.wireframe!==he)&&(c.geometry=ie.id,c.program=se.id,c.wireframe=he,ce=!0)}X!==null&&t.update(X,34963),(ce||u)&&(u=!1,M(B,ee,se,ie),X!==null&&n.bindBuffer(34963,t.get(X).buffer))}function f(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function m(B){return i.isWebGL2?n.bindVertexArray(B):r.bindVertexArrayOES(B)}function g(B){return i.isWebGL2?n.deleteVertexArray(B):r.deleteVertexArrayOES(B)}function p(B,ee,se){const ie=se.wireframe===!0;let X=o[B.id];X===void 0&&(X={},o[B.id]=X);let ce=X[ee.id];ce===void 0&&(ce={},X[ee.id]=ce);let he=ce[ie];return he===void 0&&(he=d(f()),ce[ie]=he),he}function d(B){const ee=[],se=[],ie=[];for(let X=0;X<s;X++)ee[X]=0,se[X]=0,ie[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:ee,enabledAttributes:se,attributeDivisors:ie,object:B,attributes:{},index:null}}function x(B,ee,se,ie){const X=c.attributes,ce=ee.attributes;let he=0;const Me=se.getAttributes();for(const V in Me)if(Me[V].location>=0){const de=X[V];let me=ce[V];if(me===void 0&&(V==="instanceMatrix"&&B.instanceMatrix&&(me=B.instanceMatrix),V==="instanceColor"&&B.instanceColor&&(me=B.instanceColor)),de===void 0||de.attribute!==me||me&&de.data!==me.data)return!0;he++}return c.attributesNum!==he||c.index!==ie}function A(B,ee,se,ie){const X={},ce=ee.attributes;let he=0;const Me=se.getAttributes();for(const V in Me)if(Me[V].location>=0){let de=ce[V];de===void 0&&(V==="instanceMatrix"&&B.instanceMatrix&&(de=B.instanceMatrix),V==="instanceColor"&&B.instanceColor&&(de=B.instanceColor));const me={};me.attribute=de,de&&de.data&&(me.data=de.data),X[V]=me,he++}c.attributes=X,c.attributesNum=he,c.index=ie}function v(){const B=c.newAttributes;for(let ee=0,se=B.length;ee<se;ee++)B[ee]=0}function T(B){w(B,0)}function w(B,ee){const se=c.newAttributes,ie=c.enabledAttributes,X=c.attributeDivisors;se[B]=1,ie[B]===0&&(n.enableVertexAttribArray(B),ie[B]=1),X[B]!==ee&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,ee),X[B]=ee)}function R(){const B=c.newAttributes,ee=c.enabledAttributes;for(let se=0,ie=ee.length;se<ie;se++)ee[se]!==B[se]&&(n.disableVertexAttribArray(se),ee[se]=0)}function O(B,ee,se,ie,X,ce){i.isWebGL2===!0&&(se===5124||se===5125)?n.vertexAttribIPointer(B,ee,se,X,ce):n.vertexAttribPointer(B,ee,se,ie,X,ce)}function M(B,ee,se,ie){if(i.isWebGL2===!1&&(B.isInstancedMesh||ie.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const X=ie.attributes,ce=se.getAttributes(),he=ee.defaultAttributeValues;for(const Me in ce){const V=ce[Me];if(V.location>=0){let oe=X[Me];if(oe===void 0&&(Me==="instanceMatrix"&&B.instanceMatrix&&(oe=B.instanceMatrix),Me==="instanceColor"&&B.instanceColor&&(oe=B.instanceColor)),oe!==void 0){const de=oe.normalized,me=oe.itemSize,W=t.get(oe);if(W===void 0)continue;const Ce=W.buffer,Ae=W.type,Ee=W.bytesPerElement;if(oe.isInterleavedBufferAttribute){const pe=oe.data,Ie=pe.stride,y=oe.offset;if(pe.isInstancedInterleavedBuffer){for(let S=0;S<V.locationSize;S++)w(V.location+S,pe.meshPerAttribute);B.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let S=0;S<V.locationSize;S++)T(V.location+S);n.bindBuffer(34962,Ce);for(let S=0;S<V.locationSize;S++)O(V.location+S,me/V.locationSize,Ae,de,Ie*Ee,(y+me/V.locationSize*S)*Ee)}else{if(oe.isInstancedBufferAttribute){for(let pe=0;pe<V.locationSize;pe++)w(V.location+pe,oe.meshPerAttribute);B.isInstancedMesh!==!0&&ie._maxInstanceCount===void 0&&(ie._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let pe=0;pe<V.locationSize;pe++)T(V.location+pe);n.bindBuffer(34962,Ce);for(let pe=0;pe<V.locationSize;pe++)O(V.location+pe,me/V.locationSize,Ae,de,me*Ee,me/V.locationSize*pe*Ee)}}else if(he!==void 0){const de=he[Me];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(V.location,de);break;case 3:n.vertexAttrib3fv(V.location,de);break;case 4:n.vertexAttrib4fv(V.location,de);break;default:n.vertexAttrib1fv(V.location,de)}}}}R()}function L(){ue();for(const B in o){const ee=o[B];for(const se in ee){const ie=ee[se];for(const X in ie)g(ie[X].object),delete ie[X];delete ee[se]}delete o[B]}}function U(B){if(o[B.id]===void 0)return;const ee=o[B.id];for(const se in ee){const ie=ee[se];for(const X in ie)g(ie[X].object),delete ie[X];delete ee[se]}delete o[B.id]}function $(B){for(const ee in o){const se=o[ee];if(se[B.id]===void 0)continue;const ie=se[B.id];for(const X in ie)g(ie[X].object),delete ie[X];delete se[B.id]}}function ue(){G(),u=!0,c!==l&&(c=l,m(c.object))}function G(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:ue,resetDefaultState:G,dispose:L,releaseStatesOfGeometry:U,releaseStatesOfProgram:$,initAttributes:v,enableAttribute:T,disableUnusedAttributes:R}}function n0(n,e,t,i){const s=i.isWebGL2;let r;function a(c){r=c}function o(c,u){n.drawArrays(r,c,u),t.update(u,r,1)}function l(c,u,h){if(h===0)return;let f,m;if(s)f=n,m="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[m](r,c,u,h),t.update(u,r,h)}this.setMode=a,this.render=o,this.renderInstances=l}function i0(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(O){if(O==="highp"){if(n.getShaderPrecisionFormat(35633,36338).precision>0&&n.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";O="mediump"}return O==="mediump"&&n.getShaderPrecisionFormat(35633,36337).precision>0&&n.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n instanceof WebGL2RenderingContext;let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=n.getParameter(34930),f=n.getParameter(35660),m=n.getParameter(3379),g=n.getParameter(34076),p=n.getParameter(34921),d=n.getParameter(36347),x=n.getParameter(36348),A=n.getParameter(36349),v=f>0,T=a||e.has("OES_texture_float"),w=v&&T,R=a?n.getParameter(36183):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:d,maxVaryings:x,maxFragmentUniforms:A,vertexTextures:v,floatFragmentTextures:T,floatVertexTextures:w,maxSamples:R}}function s0(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Zn,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const m=h.length!==0||f||i!==0||s;return s=f,i=h.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,m){const g=h.clippingPlanes,p=h.clipIntersection,d=h.clipShadows,x=n.get(h);if(!s||g===null||g.length===0||r&&!d)r?u(null):c();else{const A=r?0:i,v=A*4;let T=x.clippingState||null;l.value=T,T=u(g,f,v,m);for(let w=0;w!==v;++w)T[w]=t[w];x.clippingState=T,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,m,g){const p=h!==null?h.length:0;let d=null;if(p!==0){if(d=l.value,g!==!0||d===null){const x=m+p*4,A=f.matrixWorldInverse;o.getNormalMatrix(A),(d===null||d.length<x)&&(d=new Float32Array(x));for(let v=0,T=m;v!==p;++v,T+=4)a.copy(h[v]).applyMatrix4(A,o),a.normal.toArray(d,T),d[T+3]=a.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,d}}function r0(n){let e=new WeakMap;function t(a,o){return o===ea?a.mapping=Yi:o===ta&&(a.mapping=Zi),a}function i(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===ea||o===ta)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new xm(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Yu extends qu{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Oi=4,ac=[.125,.215,.35,.446,.526,.582],Qn=20,Ro=new Yu,lc=new je;let Do=null;const Kn=(1+Math.sqrt(5))/2,Ri=1/Kn,cc=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,Kn,Ri),new N(0,Kn,-Ri),new N(Ri,0,Kn),new N(-Ri,0,Kn),new N(Kn,Ri,0),new N(-Kn,Ri,0)];class uc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Do=this._renderer.getRenderTarget(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Do),e.scissorTest=!1,hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Yi||e.mapping===Zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Do=this._renderer.getRenderTarget();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Is,format:Zt,encoding:ci,depthBuffer:!1},s=hc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hc(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=o0(r)),this._blurMaterial=a0(r,e,t)}return s}_compileMaterial(e){const t=new on(this._lodPlanes[0],e);this._renderer.compile(t,Ro)}_sceneToCubeUV(e,t,i,s){const o=new Gt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(lc),u.toneMapping=Mn,u.autoClear=!1;const m=new Gu({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),g=new on(new ns,m);let p=!1;const d=e.background;d?d.isColor&&(m.color.copy(d),e.background=null,p=!0):(m.color.copy(lc),p=!0);for(let x=0;x<6;x++){const A=x%3;A===0?(o.up.set(0,l[x],0),o.lookAt(c[x],0,0)):A===1?(o.up.set(0,0,l[x]),o.lookAt(0,c[x],0)):(o.up.set(0,l[x],0),o.lookAt(0,0,c[x]));const v=this._cubeSize;hr(s,A*v,x>2?v:0,v,v),u.setRenderTarget(s),p&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=d}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Yi||e.mapping===Zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new on(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;hr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Ro)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=cc[(s-1)%cc.length];this._blur(e,s-1,s,r,a)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new on(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Qn-1),p=r/g,d=isFinite(r)?1+Math.floor(u*p):Qn;d>Qn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Qn}`);const x=[];let A=0;for(let O=0;O<Qn;++O){const M=O/p,L=Math.exp(-M*M/2);x.push(L),O===0?A+=L:O<d&&(A+=2*L)}for(let O=0;O<x.length;O++)x[O]=x[O]/A;f.envMap.value=e.texture,f.samples.value=d,f.weights.value=x,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-i;const T=this._sizeLods[s],w=3*T*(s>v-Oi?s-v+Oi:0),R=4*(this._cubeSize-T);hr(t,w,R,3*T,2*T),l.setRenderTarget(t),l.render(h,Ro)}}function o0(n){const e=[],t=[],i=[];let s=n;const r=n-Oi+1+ac.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-Oi?l=ac[a-n+Oi-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,g=6,p=3,d=2,x=1,A=new Float32Array(p*g*m),v=new Float32Array(d*g*m),T=new Float32Array(x*g*m);for(let R=0;R<m;R++){const O=R%3*2/3-1,M=R>2?0:-1,L=[O,M,0,O+2/3,M,0,O+2/3,M+1,0,O,M,0,O+2/3,M+1,0,O,M+1,0];A.set(L,p*g*R),v.set(f,d*g*R);const U=[R,R,R,R,R,R];T.set(U,x*g*R)}const w=new zn;w.setAttribute("position",new an(A,p)),w.setAttribute("uv",new an(v,d)),w.setAttribute("faceIndex",new an(T,x)),e.push(w),s>Oi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function hc(n,e,t){const i=new ui(n,e,t);return i.texture.mapping=Br,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function hr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function a0(n,e,t){const i=new Float32Array(Qn),s=new N(0,1,0);return new fi({name:"SphericalGaussianBlur",defines:{n:Qn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function fc(){return new fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function dc(){return new fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Na(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function l0(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ea||l===ta,u=l===Yi||l===Zi;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new uc(n)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&s(h)){t===null&&(t=new uc(n));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function c0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function u0(n,e,t,i){const s={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],34962);const m=h.morphAttributes;for(const g in m){const p=m[g];for(let d=0,x=p.length;d<x;d++)e.update(p[d],34962)}}function c(h){const f=[],m=h.index,g=h.attributes.position;let p=0;if(m!==null){const A=m.array;p=m.version;for(let v=0,T=A.length;v<T;v+=3){const w=A[v+0],R=A[v+1],O=A[v+2];f.push(w,R,R,O,O,w)}}else{const A=g.array;p=g.version;for(let v=0,T=A.length/3-1;v<T;v+=3){const w=v+0,R=v+1,O=v+2;f.push(w,R,R,O,O,w)}}const d=new(Ou(f)?Vu:Hu)(f,1);d.version=p;const x=r.get(h);x&&e.remove(x),r.set(h,d)}function u(h){const f=r.get(h);if(f){const m=h.index;m!==null&&f.version<m.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function h0(n,e,t,i){const s=i.isWebGL2;let r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,m){n.drawElements(r,m,o,f*l),t.update(m,r,1)}function h(f,m,g){if(g===0)return;let p,d;if(s)p=n,d="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,m,o,f*l,g),t.update(m,r,g)}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h}function f0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case 4:t.triangles+=o*(r/3);break;case 1:t.lines+=o*(r/2);break;case 3:t.lines+=o*(r-1);break;case 2:t.lines+=o*r;break;case 0:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function d0(n,e){return n[0]-e[0]}function p0(n,e){return Math.abs(e[1])-Math.abs(n[1])}function m0(n,e,t){const i={},s=new Float32Array(8),r=new WeakMap,a=new dt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h,f){const m=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,d=p!==void 0?p.length:0;let x=r.get(u);if(x===void 0||x.count!==d){let se=function(){B.dispose(),r.delete(u),u.removeEventListener("dispose",se)};var g=se;x!==void 0&&x.texture.dispose();const T=u.morphAttributes.position!==void 0,w=u.morphAttributes.normal!==void 0,R=u.morphAttributes.color!==void 0,O=u.morphAttributes.position||[],M=u.morphAttributes.normal||[],L=u.morphAttributes.color||[];let U=0;T===!0&&(U=1),w===!0&&(U=2),R===!0&&(U=3);let $=u.attributes.position.count*U,ue=1;$>e.maxTextureSize&&(ue=Math.ceil($/e.maxTextureSize),$=e.maxTextureSize);const G=new Float32Array($*ue*4*d),B=new Bu(G,$,ue,d);B.type=ti,B.needsUpdate=!0;const ee=U*4;for(let ie=0;ie<d;ie++){const X=O[ie],ce=M[ie],he=L[ie],Me=$*ue*4*ie;for(let V=0;V<X.count;V++){const oe=V*ee;T===!0&&(a.fromBufferAttribute(X,V),G[Me+oe+0]=a.x,G[Me+oe+1]=a.y,G[Me+oe+2]=a.z,G[Me+oe+3]=0),w===!0&&(a.fromBufferAttribute(ce,V),G[Me+oe+4]=a.x,G[Me+oe+5]=a.y,G[Me+oe+6]=a.z,G[Me+oe+7]=0),R===!0&&(a.fromBufferAttribute(he,V),G[Me+oe+8]=a.x,G[Me+oe+9]=a.y,G[Me+oe+10]=a.z,G[Me+oe+11]=he.itemSize===4?a.w:1)}}x={count:d,texture:B,size:new ge($,ue)},r.set(u,x),u.addEventListener("dispose",se)}let A=0;for(let T=0;T<m.length;T++)A+=m[T];const v=u.morphTargetsRelative?1:1-A;f.getUniforms().setValue(n,"morphTargetBaseInfluence",v),f.getUniforms().setValue(n,"morphTargetInfluences",m),f.getUniforms().setValue(n,"morphTargetsTexture",x.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",x.size)}else{const p=m===void 0?0:m.length;let d=i[u.id];if(d===void 0||d.length!==p){d=[];for(let w=0;w<p;w++)d[w]=[w,0];i[u.id]=d}for(let w=0;w<p;w++){const R=d[w];R[0]=w,R[1]=m[w]}d.sort(p0);for(let w=0;w<8;w++)w<p&&d[w][1]?(o[w][0]=d[w][0],o[w][1]=d[w][1]):(o[w][0]=Number.MAX_SAFE_INTEGER,o[w][1]=0);o.sort(d0);const x=u.morphAttributes.position,A=u.morphAttributes.normal;let v=0;for(let w=0;w<8;w++){const R=o[w],O=R[0],M=R[1];O!==Number.MAX_SAFE_INTEGER&&M?(x&&u.getAttribute("morphTarget"+w)!==x[O]&&u.setAttribute("morphTarget"+w,x[O]),A&&u.getAttribute("morphNormal"+w)!==A[O]&&u.setAttribute("morphNormal"+w,A[O]),s[w]=M,v+=M):(x&&u.hasAttribute("morphTarget"+w)===!0&&u.deleteAttribute("morphTarget"+w),A&&u.hasAttribute("morphNormal"+w)===!0&&u.deleteAttribute("morphNormal"+w),s[w]=0)}const T=u.morphTargetsRelative?1:1-v;f.getUniforms().setValue(n,"morphTargetBaseInfluence",T),f.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function g0(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);return s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),h}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const Zu=new Nt,Ku=new Bu,$u=new tm,Ju=new Xu,pc=[],mc=[],gc=new Float32Array(16),_c=new Float32Array(9),xc=new Float32Array(4);function is(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=pc[s];if(r===void 0&&(r=new Float32Array(s),pc[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function ct(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Gr(n,e){let t=mc[e];t===void 0&&(t=new Int32Array(e),mc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function _0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function x0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;n.uniform2fv(this.addr,e),ct(t,e)}}function v0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(lt(t,e))return;n.uniform3fv(this.addr,e),ct(t,e)}}function y0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;n.uniform4fv(this.addr,e),ct(t,e)}}function M0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,i))return;xc.set(i),n.uniformMatrix2fv(this.addr,!1,xc),ct(t,i)}}function b0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,i))return;_c.set(i),n.uniformMatrix3fv(this.addr,!1,_c),ct(t,i)}}function S0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),ct(t,e)}else{if(lt(t,i))return;gc.set(i),n.uniformMatrix4fv(this.addr,!1,gc),ct(t,i)}}function w0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function T0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;n.uniform2iv(this.addr,e),ct(t,e)}}function E0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(lt(t,e))return;n.uniform3iv(this.addr,e),ct(t,e)}}function A0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;n.uniform4iv(this.addr,e),ct(t,e)}}function C0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function L0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(lt(t,e))return;n.uniform2uiv(this.addr,e),ct(t,e)}}function P0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(lt(t,e))return;n.uniform3uiv(this.addr,e),ct(t,e)}}function R0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(lt(t,e))return;n.uniform4uiv(this.addr,e),ct(t,e)}}function D0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2D(e||Zu,s)}function I0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||$u,s)}function F0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Ju,s)}function O0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Ku,s)}function N0(n){switch(n){case 5126:return _0;case 35664:return x0;case 35665:return v0;case 35666:return y0;case 35674:return M0;case 35675:return b0;case 35676:return S0;case 5124:case 35670:return w0;case 35667:case 35671:return T0;case 35668:case 35672:return E0;case 35669:case 35673:return A0;case 5125:return C0;case 36294:return L0;case 36295:return P0;case 36296:return R0;case 35678:case 36198:case 36298:case 36306:case 35682:return D0;case 35679:case 36299:case 36307:return I0;case 35680:case 36300:case 36308:case 36293:return F0;case 36289:case 36303:case 36311:case 36292:return O0}}function U0(n,e){n.uniform1fv(this.addr,e)}function z0(n,e){const t=is(e,this.size,2);n.uniform2fv(this.addr,t)}function B0(n,e){const t=is(e,this.size,3);n.uniform3fv(this.addr,t)}function k0(n,e){const t=is(e,this.size,4);n.uniform4fv(this.addr,t)}function G0(n,e){const t=is(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function H0(n,e){const t=is(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function V0(n,e){const t=is(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function W0(n,e){n.uniform1iv(this.addr,e)}function q0(n,e){n.uniform2iv(this.addr,e)}function X0(n,e){n.uniform3iv(this.addr,e)}function j0(n,e){n.uniform4iv(this.addr,e)}function Y0(n,e){n.uniform1uiv(this.addr,e)}function Z0(n,e){n.uniform2uiv(this.addr,e)}function K0(n,e){n.uniform3uiv(this.addr,e)}function $0(n,e){n.uniform4uiv(this.addr,e)}function J0(n,e,t){const i=this.cache,s=e.length,r=Gr(t,s);lt(i,r)||(n.uniform1iv(this.addr,r),ct(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Zu,r[a])}function Q0(n,e,t){const i=this.cache,s=e.length,r=Gr(t,s);lt(i,r)||(n.uniform1iv(this.addr,r),ct(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||$u,r[a])}function ex(n,e,t){const i=this.cache,s=e.length,r=Gr(t,s);lt(i,r)||(n.uniform1iv(this.addr,r),ct(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ju,r[a])}function tx(n,e,t){const i=this.cache,s=e.length,r=Gr(t,s);lt(i,r)||(n.uniform1iv(this.addr,r),ct(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Ku,r[a])}function nx(n){switch(n){case 5126:return U0;case 35664:return z0;case 35665:return B0;case 35666:return k0;case 35674:return G0;case 35675:return H0;case 35676:return V0;case 5124:case 35670:return W0;case 35667:case 35671:return q0;case 35668:case 35672:return X0;case 35669:case 35673:return j0;case 5125:return Y0;case 36294:return Z0;case 36295:return K0;case 36296:return $0;case 35678:case 36198:case 36298:case 36306:case 35682:return J0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return ex;case 36289:case 36303:case 36311:case 36292:return tx}}class ix{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=N0(t.type)}}class sx{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=nx(t.type)}}class rx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Io=/(\w+)(\])?(\[|\.)?/g;function vc(n,e){n.seq.push(e),n.map[e.id]=e}function ox(n,e,t){const i=n.name,s=i.length;for(Io.lastIndex=0;;){const r=Io.exec(i),a=Io.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){vc(t,c===void 0?new ix(o,n,e):new sx(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new rx(o),vc(t,h)),t=h}}}class Mr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,35718);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);ox(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function yc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}let ax=0;function lx(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function cx(n){switch(n){case ci:return["Linear","( value )"];case $e:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",n),["Linear","( value )"]}}function Mc(n,e,t){const i=n.getShaderParameter(e,35713),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+lx(n.getShaderSource(e),a)}else return s}function ux(n,e){const t=cx(e);return"vec4 "+n+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function hx(n,e){let t;switch(e){case Cp:t="Linear";break;case Lp:t="Reinhard";break;case Pp:t="OptimizedCineon";break;case Rp:t="ACESFilmic";break;case Dp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function fx(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.tangentSpaceNormalMap||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(gs).join(`
`)}function dx(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function px(n,e){const t={},i=n.getProgramParameter(e,35721);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===35674&&(o=2),r.type===35675&&(o=3),r.type===35676&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function gs(n){return n!==""}function bc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const mx=/^[ \t]*#include +<([\w\d./]+)>/gm;function oa(n){return n.replace(mx,gx)}function gx(n,e){const t=Oe[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return oa(t)}const _x=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(n){return n.replace(_x,xx)}function xx(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tc(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vx(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Cu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===op?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ms&&(e="SHADOWMAP_TYPE_VSM"),e}function yx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Yi:case Zi:e="ENVMAP_TYPE_CUBE";break;case Br:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Mx(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Zi:e="ENVMAP_MODE_REFRACTION";break}return e}function bx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Ru:e="ENVMAP_BLENDING_MULTIPLY";break;case Ep:e="ENVMAP_BLENDING_MIX";break;case Ap:e="ENVMAP_BLENDING_ADD";break}return e}function Sx(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function wx(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=vx(t),c=yx(t),u=Mx(t),h=bx(t),f=Sx(t),m=t.isWebGL2?"":fx(t),g=dx(r),p=s.createProgram();let d,x,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=[g].filter(gs).join(`
`),d.length>0&&(d+=`
`),x=[m,g].filter(gs).join(`
`),x.length>0&&(x+=`
`)):(d=[Tc(t),"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gs).join(`
`),x=[m,Tc(t),"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mn?"#define TONE_MAPPING":"",t.toneMapping!==Mn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Mn?hx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.encodings_pars_fragment,ux("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(gs).join(`
`)),a=oa(a),a=bc(a,t),a=Sc(a,t),o=oa(o),o=bc(o,t),o=Sc(o,t),a=wc(a),o=wc(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,x=["#define varying in",t.glslVersion===Yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const v=A+d+a,T=A+x+o,w=yc(s,35633,v),R=yc(s,35632,T);if(s.attachShader(p,w),s.attachShader(p,R),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p),n.debug.checkShaderErrors){const L=s.getProgramInfoLog(p).trim(),U=s.getShaderInfoLog(w).trim(),$=s.getShaderInfoLog(R).trim();let ue=!0,G=!0;if(s.getProgramParameter(p,35714)===!1){ue=!1;const B=Mc(s,w,"vertex"),ee=Mc(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,35715)+`

Program Info Log: `+L+`
`+B+`
`+ee)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(U===""||$==="")&&(G=!1);G&&(this.diagnostics={runnable:ue,programLog:L,vertexShader:{log:U,prefix:d},fragmentShader:{log:$,prefix:x}})}s.deleteShader(w),s.deleteShader(R);let O;this.getUniforms=function(){return O===void 0&&(O=new Mr(s,p)),O};let M;return this.getAttributes=function(){return M===void 0&&(M=px(s,p)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.name=t.shaderName,this.id=ax++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=R,this}let Tx=0;class Ex{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Ax(e),t.set(e,i)),i}}class Ax{constructor(e){this.id=Tx++,this.code=e,this.usedTimes=0}}function Cx(n,e,t,i,s,r,a){const o=new ku,l=new Ex,c=[],u=s.isWebGL2,h=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(M,L,U,$,ue){const G=$.fog,B=ue.geometry,ee=M.isMeshStandardMaterial?$.environment:null,se=(M.isMeshStandardMaterial?t:e).get(M.envMap||ee),ie=se&&se.mapping===Br?se.image.height:null,X=g[M.type];M.precision!==null&&(m=s.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const ce=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,he=ce!==void 0?ce.length:0;let Me=0;B.morphAttributes.position!==void 0&&(Me=1),B.morphAttributes.normal!==void 0&&(Me=2),B.morphAttributes.color!==void 0&&(Me=3);let V,oe,de,me;if(X){const Ie=nn[X];V=Ie.vertexShader,oe=Ie.fragmentShader}else V=M.vertexShader,oe=M.fragmentShader,l.update(M),de=l.getVertexShaderID(M),me=l.getFragmentShaderID(M);const W=n.getRenderTarget(),Ce=M.alphaTest>0,Ae=M.clearcoat>0,Ee=M.iridescence>0;return{isWebGL2:u,shaderID:X,shaderName:M.type,vertexShader:V,fragmentShader:oe,defines:M.defines,customVertexShaderID:de,customFragmentShaderID:me,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,instancing:ue.isInstancedMesh===!0,instancingColor:ue.isInstancedMesh===!0&&ue.instanceColor!==null,supportsVertexTextures:f,outputEncoding:W===null?n.outputEncoding:W.isXRRenderTarget===!0?W.texture.encoding:ci,map:!!M.map,matcap:!!M.matcap,envMap:!!se,envMapMode:se&&se.mapping,envMapCubeUVHeight:ie,lightMap:!!M.lightMap,aoMap:!!M.aoMap,emissiveMap:!!M.emissiveMap,bumpMap:!!M.bumpMap,normalMap:!!M.normalMap,objectSpaceNormalMap:M.normalMapType===$p,tangentSpaceNormalMap:M.normalMapType===Fu,decodeVideoTexture:!!M.map&&M.map.isVideoTexture===!0&&M.map.encoding===$e,clearcoat:Ae,clearcoatMap:Ae&&!!M.clearcoatMap,clearcoatRoughnessMap:Ae&&!!M.clearcoatRoughnessMap,clearcoatNormalMap:Ae&&!!M.clearcoatNormalMap,iridescence:Ee,iridescenceMap:Ee&&!!M.iridescenceMap,iridescenceThicknessMap:Ee&&!!M.iridescenceThicknessMap,displacementMap:!!M.displacementMap,roughnessMap:!!M.roughnessMap,metalnessMap:!!M.metalnessMap,specularMap:!!M.specularMap,specularIntensityMap:!!M.specularIntensityMap,specularColorMap:!!M.specularColorMap,opaque:M.transparent===!1&&M.blending===Gi,alphaMap:!!M.alphaMap,alphaTest:Ce,gradientMap:!!M.gradientMap,sheen:M.sheen>0,sheenColorMap:!!M.sheenColorMap,sheenRoughnessMap:!!M.sheenRoughnessMap,transmission:M.transmission>0,transmissionMap:!!M.transmissionMap,thicknessMap:!!M.thicknessMap,combine:M.combine,vertexTangents:!!M.normalMap&&!!B.attributes.tangent,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUvs:!!M.map||!!M.bumpMap||!!M.normalMap||!!M.specularMap||!!M.alphaMap||!!M.emissiveMap||!!M.roughnessMap||!!M.metalnessMap||!!M.clearcoatMap||!!M.clearcoatRoughnessMap||!!M.clearcoatNormalMap||!!M.iridescenceMap||!!M.iridescenceThicknessMap||!!M.displacementMap||!!M.transmissionMap||!!M.thicknessMap||!!M.specularIntensityMap||!!M.specularColorMap||!!M.sheenColorMap||!!M.sheenRoughnessMap,uvsVertexOnly:!(M.map||M.bumpMap||M.normalMap||M.specularMap||M.alphaMap||M.emissiveMap||M.roughnessMap||M.metalnessMap||M.clearcoatNormalMap||M.iridescenceMap||M.iridescenceThicknessMap||M.transmission>0||M.transmissionMap||M.thicknessMap||M.specularIntensityMap||M.specularColorMap||M.sheen>0||M.sheenColorMap||M.sheenRoughnessMap)&&!!M.displacementMap,fog:!!G,useFog:M.fog===!0,fogExp2:G&&G.isFogExp2,flatShading:!!M.flatShading,sizeAttenuation:M.sizeAttenuation,logarithmicDepthBuffer:h,skinning:ue.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:Me,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:M.toneMapped?n.toneMapping:Mn,physicallyCorrectLights:n.physicallyCorrectLights,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Dn,flipSided:M.side===Ot,useDepthPacking:!!M.depthPacking,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:M.extensions&&M.extensions.derivatives,extensionFragDepth:M.extensions&&M.extensions.fragDepth,extensionDrawBuffers:M.extensions&&M.extensions.drawBuffers,extensionShaderTextureLOD:M.extensions&&M.extensions.shaderTextureLOD,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),customProgramCacheKey:M.customProgramCacheKey()}}function d(M){const L=[];if(M.shaderID?L.push(M.shaderID):(L.push(M.customVertexShaderID),L.push(M.customFragmentShaderID)),M.defines!==void 0)for(const U in M.defines)L.push(U),L.push(M.defines[U]);return M.isRawShaderMaterial===!1&&(x(L,M),A(L,M),L.push(n.outputEncoding)),L.push(M.customProgramCacheKey),L.join()}function x(M,L){M.push(L.precision),M.push(L.outputEncoding),M.push(L.envMapMode),M.push(L.envMapCubeUVHeight),M.push(L.combine),M.push(L.vertexUvs),M.push(L.fogExp2),M.push(L.sizeAttenuation),M.push(L.morphTargetsCount),M.push(L.morphAttributeCount),M.push(L.numDirLights),M.push(L.numPointLights),M.push(L.numSpotLights),M.push(L.numSpotLightMaps),M.push(L.numHemiLights),M.push(L.numRectAreaLights),M.push(L.numDirLightShadows),M.push(L.numPointLightShadows),M.push(L.numSpotLightShadows),M.push(L.numSpotLightShadowsWithMaps),M.push(L.shadowMapType),M.push(L.toneMapping),M.push(L.numClippingPlanes),M.push(L.numClipIntersection),M.push(L.depthPacking)}function A(M,L){o.disableAll(),L.isWebGL2&&o.enable(0),L.supportsVertexTextures&&o.enable(1),L.instancing&&o.enable(2),L.instancingColor&&o.enable(3),L.map&&o.enable(4),L.matcap&&o.enable(5),L.envMap&&o.enable(6),L.lightMap&&o.enable(7),L.aoMap&&o.enable(8),L.emissiveMap&&o.enable(9),L.bumpMap&&o.enable(10),L.normalMap&&o.enable(11),L.objectSpaceNormalMap&&o.enable(12),L.tangentSpaceNormalMap&&o.enable(13),L.clearcoat&&o.enable(14),L.clearcoatMap&&o.enable(15),L.clearcoatRoughnessMap&&o.enable(16),L.clearcoatNormalMap&&o.enable(17),L.iridescence&&o.enable(18),L.iridescenceMap&&o.enable(19),L.iridescenceThicknessMap&&o.enable(20),L.displacementMap&&o.enable(21),L.specularMap&&o.enable(22),L.roughnessMap&&o.enable(23),L.metalnessMap&&o.enable(24),L.gradientMap&&o.enable(25),L.alphaMap&&o.enable(26),L.alphaTest&&o.enable(27),L.vertexColors&&o.enable(28),L.vertexAlphas&&o.enable(29),L.vertexUvs&&o.enable(30),L.vertexTangents&&o.enable(31),L.uvsVertexOnly&&o.enable(32),M.push(o.mask),o.disableAll(),L.fog&&o.enable(0),L.useFog&&o.enable(1),L.flatShading&&o.enable(2),L.logarithmicDepthBuffer&&o.enable(3),L.skinning&&o.enable(4),L.morphTargets&&o.enable(5),L.morphNormals&&o.enable(6),L.morphColors&&o.enable(7),L.premultipliedAlpha&&o.enable(8),L.shadowMapEnabled&&o.enable(9),L.physicallyCorrectLights&&o.enable(10),L.doubleSided&&o.enable(11),L.flipSided&&o.enable(12),L.useDepthPacking&&o.enable(13),L.dithering&&o.enable(14),L.specularIntensityMap&&o.enable(15),L.specularColorMap&&o.enable(16),L.transmission&&o.enable(17),L.transmissionMap&&o.enable(18),L.thicknessMap&&o.enable(19),L.sheen&&o.enable(20),L.sheenColorMap&&o.enable(21),L.sheenRoughnessMap&&o.enable(22),L.decodeVideoTexture&&o.enable(23),L.opaque&&o.enable(24),M.push(o.mask)}function v(M){const L=g[M.type];let U;if(L){const $=nn[L];U=pm.clone($.uniforms)}else U=M.uniforms;return U}function T(M,L){let U;for(let $=0,ue=c.length;$<ue;$++){const G=c[$];if(G.cacheKey===L){U=G,++U.usedTimes;break}}return U===void 0&&(U=new wx(n,L,M,r),c.push(U)),U}function w(M){if(--M.usedTimes===0){const L=c.indexOf(M);c[L]=c[c.length-1],c.pop(),M.destroy()}}function R(M){l.remove(M)}function O(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:v,acquireProgram:T,releaseProgram:w,releaseShaderCache:R,programs:c,dispose:O}}function Lx(){let n=new WeakMap;function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function t(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function Px(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Ec(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ac(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h,f,m,g,p,d){let x=n[e];return x===void 0?(x={id:h.id,object:h,geometry:f,material:m,groupOrder:g,renderOrder:h.renderOrder,z:p,group:d},n[e]=x):(x.id=h.id,x.object=h,x.geometry=f,x.material=m,x.groupOrder=g,x.renderOrder=h.renderOrder,x.z=p,x.group=d),e++,x}function o(h,f,m,g,p,d){const x=a(h,f,m,g,p,d);m.transmission>0?i.push(x):m.transparent===!0?s.push(x):t.push(x)}function l(h,f,m,g,p,d){const x=a(h,f,m,g,p,d);m.transmission>0?i.unshift(x):m.transparent===!0?s.unshift(x):t.unshift(x)}function c(h,f){t.length>1&&t.sort(h||Px),i.length>1&&i.sort(f||Ec),s.length>1&&s.sort(f||Ec)}function u(){for(let h=e,f=n.length;h<f;h++){const m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function Rx(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Ac,n.set(i,[a])):s>=r.length?(a=new Ac,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Dx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new je};break;case"SpotLight":t={position:new N,direction:new N,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function Ix(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Fx=0;function Ox(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Nx(n,e){const t=new Dx,i=Ix(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)s.probe.push(new N);const r=new N,a=new st,o=new st;function l(u,h){let f=0,m=0,g=0;for(let $=0;$<9;$++)s.probe[$].set(0,0,0);let p=0,d=0,x=0,A=0,v=0,T=0,w=0,R=0,O=0,M=0;u.sort(Ox);const L=h!==!0?Math.PI:1;for(let $=0,ue=u.length;$<ue;$++){const G=u[$],B=G.color,ee=G.intensity,se=G.distance,ie=G.shadow&&G.shadow.map?G.shadow.map.texture:null;if(G.isAmbientLight)f+=B.r*ee*L,m+=B.g*ee*L,g+=B.b*ee*L;else if(G.isLightProbe)for(let X=0;X<9;X++)s.probe[X].addScaledVector(G.sh.coefficients[X],ee);else if(G.isDirectionalLight){const X=t.get(G);if(X.color.copy(G.color).multiplyScalar(G.intensity*L),G.castShadow){const ce=G.shadow,he=i.get(G);he.shadowBias=ce.bias,he.shadowNormalBias=ce.normalBias,he.shadowRadius=ce.radius,he.shadowMapSize=ce.mapSize,s.directionalShadow[p]=he,s.directionalShadowMap[p]=ie,s.directionalShadowMatrix[p]=G.shadow.matrix,T++}s.directional[p]=X,p++}else if(G.isSpotLight){const X=t.get(G);X.position.setFromMatrixPosition(G.matrixWorld),X.color.copy(B).multiplyScalar(ee*L),X.distance=se,X.coneCos=Math.cos(G.angle),X.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),X.decay=G.decay,s.spot[x]=X;const ce=G.shadow;if(G.map&&(s.spotLightMap[O]=G.map,O++,ce.updateMatrices(G),G.castShadow&&M++),s.spotLightMatrix[x]=ce.matrix,G.castShadow){const he=i.get(G);he.shadowBias=ce.bias,he.shadowNormalBias=ce.normalBias,he.shadowRadius=ce.radius,he.shadowMapSize=ce.mapSize,s.spotShadow[x]=he,s.spotShadowMap[x]=ie,R++}x++}else if(G.isRectAreaLight){const X=t.get(G);X.color.copy(B).multiplyScalar(ee),X.halfWidth.set(G.width*.5,0,0),X.halfHeight.set(0,G.height*.5,0),s.rectArea[A]=X,A++}else if(G.isPointLight){const X=t.get(G);if(X.color.copy(G.color).multiplyScalar(G.intensity*L),X.distance=G.distance,X.decay=G.decay,G.castShadow){const ce=G.shadow,he=i.get(G);he.shadowBias=ce.bias,he.shadowNormalBias=ce.normalBias,he.shadowRadius=ce.radius,he.shadowMapSize=ce.mapSize,he.shadowCameraNear=ce.camera.near,he.shadowCameraFar=ce.camera.far,s.pointShadow[d]=he,s.pointShadowMap[d]=ie,s.pointShadowMatrix[d]=G.shadow.matrix,w++}s.point[d]=X,d++}else if(G.isHemisphereLight){const X=t.get(G);X.skyColor.copy(G.color).multiplyScalar(ee*L),X.groundColor.copy(G.groundColor).multiplyScalar(ee*L),s.hemi[v]=X,v++}}A>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ve.LTC_FLOAT_1,s.rectAreaLTC2=ve.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=ve.LTC_HALF_1,s.rectAreaLTC2=ve.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=m,s.ambient[2]=g;const U=s.hash;(U.directionalLength!==p||U.pointLength!==d||U.spotLength!==x||U.rectAreaLength!==A||U.hemiLength!==v||U.numDirectionalShadows!==T||U.numPointShadows!==w||U.numSpotShadows!==R||U.numSpotMaps!==O)&&(s.directional.length=p,s.spot.length=x,s.rectArea.length=A,s.point.length=d,s.hemi.length=v,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.pointShadow.length=w,s.pointShadowMap.length=w,s.spotShadow.length=R,s.spotShadowMap.length=R,s.directionalShadowMatrix.length=T,s.pointShadowMatrix.length=w,s.spotLightMatrix.length=R+O-M,s.spotLightMap.length=O,s.numSpotLightShadowsWithMaps=M,U.directionalLength=p,U.pointLength=d,U.spotLength=x,U.rectAreaLength=A,U.hemiLength=v,U.numDirectionalShadows=T,U.numPointShadows=w,U.numSpotShadows=R,U.numSpotMaps=O,s.version=Fx++)}function c(u,h){let f=0,m=0,g=0,p=0,d=0;const x=h.matrixWorldInverse;for(let A=0,v=u.length;A<v;A++){const T=u[A];if(T.isDirectionalLight){const w=s.directional[f];w.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(x),f++}else if(T.isSpotLight){const w=s.spot[g];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(x),w.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(x),g++}else if(T.isRectAreaLight){const w=s.rectArea[p];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(x),o.identity(),a.copy(T.matrixWorld),a.premultiply(x),o.extractRotation(a),w.halfWidth.set(T.width*.5,0,0),w.halfHeight.set(0,T.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),p++}else if(T.isPointLight){const w=s.point[m];w.position.setFromMatrixPosition(T.matrixWorld),w.position.applyMatrix4(x),m++}else if(T.isHemisphereLight){const w=s.hemi[d];w.direction.setFromMatrixPosition(T.matrixWorld),w.direction.transformDirection(x),d++}}}return{setup:l,setupView:c,state:s}}function Cc(n,e){const t=new Nx(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function a(h){i.push(h)}function o(h){s.push(h)}function l(h){t.setup(i,h)}function c(h){t.setupView(i,h)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Ux(n,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Cc(n,e),t.set(r,[l])):a>=o.length?(l=new Cc(n,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class zx extends Bs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Bx extends Bs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new N,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const kx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Hx(n,e,t){let i=new Fa;const s=new ge,r=new ge,a=new dt,o=new zx({depthPacking:Kp}),l=new Bx,c={},u=t.maxTextureSize,h={[Un]:Ot,[Ot]:Un,[Dn]:Dn},f=new fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:kx,fragmentShader:Gx}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new zn;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const p=new on(g,f),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cu,this.render=function(T,w,R){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||T.length===0)return;const O=n.getRenderTarget(),M=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),U=n.state;U.setBlending(On),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);for(let $=0,ue=T.length;$<ue;$++){const G=T[$],B=G.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const ee=B.getFrameExtents();if(s.multiply(ee),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ee.x),s.x=r.x*ee.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ee.y),s.y=r.y*ee.y,B.mapSize.y=r.y)),B.map===null){const ie=this.type!==ms?{minFilter:wt,magFilter:wt}:{};B.map=new ui(s.x,s.y,ie),B.map.texture.name=G.name+".shadowMap",B.camera.updateProjectionMatrix()}n.setRenderTarget(B.map),n.clear();const se=B.getViewportCount();for(let ie=0;ie<se;ie++){const X=B.getViewport(ie);a.set(r.x*X.x,r.y*X.y,r.x*X.z,r.y*X.w),U.viewport(a),B.updateMatrices(G,ie),i=B.getFrustum(),v(w,R,B.camera,G,this.type)}B.isPointLightShadow!==!0&&this.type===ms&&x(B,R),B.needsUpdate=!1}d.needsUpdate=!1,n.setRenderTarget(O,M,L)};function x(T,w){const R=e.update(p);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ui(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(w,null,R,f,p,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(w,null,R,m,p,null)}function A(T,w,R,O,M,L){let U=null;const $=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if($!==void 0)U=$;else if(U=R.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const ue=U.uuid,G=w.uuid;let B=c[ue];B===void 0&&(B={},c[ue]=B);let ee=B[G];ee===void 0&&(ee=U.clone(),B[G]=ee),U=ee}return U.visible=w.visible,U.wireframe=w.wireframe,L===ms?U.side=w.shadowSide!==null?w.shadowSide:w.side:U.side=w.shadowSide!==null?w.shadowSide:h[w.side],U.alphaMap=w.alphaMap,U.alphaTest=w.alphaTest,U.map=w.map,U.clipShadows=w.clipShadows,U.clippingPlanes=w.clippingPlanes,U.clipIntersection=w.clipIntersection,U.displacementMap=w.displacementMap,U.displacementScale=w.displacementScale,U.displacementBias=w.displacementBias,U.wireframeLinewidth=w.wireframeLinewidth,U.linewidth=w.linewidth,R.isPointLight===!0&&U.isMeshDistanceMaterial===!0&&(U.referencePosition.setFromMatrixPosition(R.matrixWorld),U.nearDistance=O,U.farDistance=M),U}function v(T,w,R,O,M){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===ms)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const $=e.update(T),ue=T.material;if(Array.isArray(ue)){const G=$.groups;for(let B=0,ee=G.length;B<ee;B++){const se=G[B],ie=ue[se.materialIndex];if(ie&&ie.visible){const X=A(T,ie,O,R.near,R.far,M);n.renderBufferDirect(R,null,$,X,T,se)}}}else if(ue.visible){const G=A(T,ue,O,R.near,R.far,M);n.renderBufferDirect(R,null,$,G,T,null)}}const U=T.children;for(let $=0,ue=U.length;$<ue;$++)v(U[$],w,R,O,M)}}function Vx(n,e,t){const i=t.isWebGL2;function s(){let F=!1;const te=new dt;let fe=null;const Te=new dt(0,0,0,0);return{setMask:function(Pe){fe!==Pe&&!F&&(n.colorMask(Pe,Pe,Pe,Pe),fe=Pe)},setLocked:function(Pe){F=Pe},setClear:function(Pe,Xe,ut,gt,Bn){Bn===!0&&(Pe*=gt,Xe*=gt,ut*=gt),te.set(Pe,Xe,ut,gt),Te.equals(te)===!1&&(n.clearColor(Pe,Xe,ut,gt),Te.copy(te))},reset:function(){F=!1,fe=null,Te.set(-1,0,0,0)}}}function r(){let F=!1,te=null,fe=null,Te=null;return{setTest:function(Pe){Pe?Ce(2929):Ae(2929)},setMask:function(Pe){te!==Pe&&!F&&(n.depthMask(Pe),te=Pe)},setFunc:function(Pe){if(fe!==Pe){switch(Pe){case vp:n.depthFunc(512);break;case yp:n.depthFunc(519);break;case Mp:n.depthFunc(513);break;case Qo:n.depthFunc(515);break;case bp:n.depthFunc(514);break;case Sp:n.depthFunc(518);break;case wp:n.depthFunc(516);break;case Tp:n.depthFunc(517);break;default:n.depthFunc(515)}fe=Pe}},setLocked:function(Pe){F=Pe},setClear:function(Pe){Te!==Pe&&(n.clearDepth(Pe),Te=Pe)},reset:function(){F=!1,te=null,fe=null,Te=null}}}function a(){let F=!1,te=null,fe=null,Te=null,Pe=null,Xe=null,ut=null,gt=null,Bn=null;return{setTest:function(Je){F||(Je?Ce(2960):Ae(2960))},setMask:function(Je){te!==Je&&!F&&(n.stencilMask(Je),te=Je)},setFunc:function(Je,un,Ut){(fe!==Je||Te!==un||Pe!==Ut)&&(n.stencilFunc(Je,un,Ut),fe=Je,Te=un,Pe=Ut)},setOp:function(Je,un,Ut){(Xe!==Je||ut!==un||gt!==Ut)&&(n.stencilOp(Je,un,Ut),Xe=Je,ut=un,gt=Ut)},setLocked:function(Je){F=Je},setClear:function(Je){Bn!==Je&&(n.clearStencil(Je),Bn=Je)},reset:function(){F=!1,te=null,fe=null,Te=null,Pe=null,Xe=null,ut=null,gt=null,Bn=null}}}const o=new s,l=new r,c=new a,u=new WeakMap,h=new WeakMap;let f={},m={},g=new WeakMap,p=[],d=null,x=!1,A=null,v=null,T=null,w=null,R=null,O=null,M=null,L=!1,U=null,$=null,ue=null,G=null,B=null;const ee=n.getParameter(35661);let se=!1,ie=0;const X=n.getParameter(7938);X.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(X)[1]),se=ie>=1):X.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),se=ie>=2);let ce=null,he={};const Me=n.getParameter(3088),V=n.getParameter(2978),oe=new dt().fromArray(Me),de=new dt().fromArray(V);function me(F,te,fe){const Te=new Uint8Array(4),Pe=n.createTexture();n.bindTexture(F,Pe),n.texParameteri(F,10241,9728),n.texParameteri(F,10240,9728);for(let Xe=0;Xe<fe;Xe++)n.texImage2D(te+Xe,0,6408,1,1,0,6408,5121,Te);return Pe}const W={};W[3553]=me(3553,3553,1),W[34067]=me(34067,34069,6),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ce(2929),l.setFunc(Qo),I(!1),Z(_l),Ce(2884),P(On);function Ce(F){f[F]!==!0&&(n.enable(F),f[F]=!0)}function Ae(F){f[F]!==!1&&(n.disable(F),f[F]=!1)}function Ee(F,te){return m[F]!==te?(n.bindFramebuffer(F,te),m[F]=te,i&&(F===36009&&(m[36160]=te),F===36160&&(m[36009]=te)),!0):!1}function pe(F,te){let fe=p,Te=!1;if(F)if(fe=g.get(te),fe===void 0&&(fe=[],g.set(te,fe)),F.isWebGLMultipleRenderTargets){const Pe=F.texture;if(fe.length!==Pe.length||fe[0]!==36064){for(let Xe=0,ut=Pe.length;Xe<ut;Xe++)fe[Xe]=36064+Xe;fe.length=Pe.length,Te=!0}}else fe[0]!==36064&&(fe[0]=36064,Te=!0);else fe[0]!==1029&&(fe[0]=1029,Te=!0);Te&&(t.isWebGL2?n.drawBuffers(fe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(fe))}function Ie(F){return d!==F?(n.useProgram(F),d=F,!0):!1}const y={[Di]:32774,[lp]:32778,[cp]:32779};if(i)y[Ml]=32775,y[bl]=32776;else{const F=e.get("EXT_blend_minmax");F!==null&&(y[Ml]=F.MIN_EXT,y[bl]=F.MAX_EXT)}const S={[up]:0,[hp]:1,[fp]:768,[Lu]:770,[xp]:776,[gp]:774,[pp]:772,[dp]:769,[Pu]:771,[_p]:775,[mp]:773};function P(F,te,fe,Te,Pe,Xe,ut,gt){if(F===On){x===!0&&(Ae(3042),x=!1);return}if(x===!1&&(Ce(3042),x=!0),F!==ap){if(F!==A||gt!==L){if((v!==Di||R!==Di)&&(n.blendEquation(32774),v=Di,R=Di),gt)switch(F){case Gi:n.blendFuncSeparate(1,771,1,771);break;case xl:n.blendFunc(1,1);break;case vl:n.blendFuncSeparate(0,769,0,1);break;case yl:n.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Gi:n.blendFuncSeparate(770,771,1,771);break;case xl:n.blendFunc(770,1);break;case vl:n.blendFuncSeparate(0,769,0,1);break;case yl:n.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}T=null,w=null,O=null,M=null,A=F,L=gt}return}Pe=Pe||te,Xe=Xe||fe,ut=ut||Te,(te!==v||Pe!==R)&&(n.blendEquationSeparate(y[te],y[Pe]),v=te,R=Pe),(fe!==T||Te!==w||Xe!==O||ut!==M)&&(n.blendFuncSeparate(S[fe],S[Te],S[Xe],S[ut]),T=fe,w=Te,O=Xe,M=ut),A=F,L=!1}function k(F,te){F.side===Dn?Ae(2884):Ce(2884);let fe=F.side===Ot;te&&(fe=!fe),I(fe),F.blending===Gi&&F.transparent===!1?P(On):P(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.premultipliedAlpha),l.setFunc(F.depthFunc),l.setTest(F.depthTest),l.setMask(F.depthWrite),o.setMask(F.colorWrite);const Te=F.stencilWrite;c.setTest(Te),Te&&(c.setMask(F.stencilWriteMask),c.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),c.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),j(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Ce(32926):Ae(32926)}function I(F){U!==F&&(F?n.frontFace(2304):n.frontFace(2305),U=F)}function Z(F){F!==sp?(Ce(2884),F!==$&&(F===_l?n.cullFace(1029):F===rp?n.cullFace(1028):n.cullFace(1032))):Ae(2884),$=F}function J(F){F!==ue&&(se&&n.lineWidth(F),ue=F)}function j(F,te,fe){F?(Ce(32823),(G!==te||B!==fe)&&(n.polygonOffset(te,fe),G=te,B=fe)):Ae(32823)}function ae(F){F?Ce(3089):Ae(3089)}function K(F){F===void 0&&(F=33984+ee-1),ce!==F&&(n.activeTexture(F),ce=F)}function b(F,te,fe){fe===void 0&&(ce===null?fe=33984+ee-1:fe=ce);let Te=he[fe];Te===void 0&&(Te={type:void 0,texture:void 0},he[fe]=Te),(Te.type!==F||Te.texture!==te)&&(ce!==fe&&(n.activeTexture(fe),ce=fe),n.bindTexture(F,te||W[F]),Te.type=F,Te.texture=te)}function _(){const F=he[ce];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function D(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Y(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Q(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function le(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function _e(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function C(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function z(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function xe(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function we(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Le(F){oe.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),oe.copy(F))}function Se(F){de.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),de.copy(F))}function De(F,te){let fe=h.get(te);fe===void 0&&(fe=new WeakMap,h.set(te,fe));let Te=fe.get(F);Te===void 0&&(Te=n.getUniformBlockIndex(te,F.name),fe.set(F,Te))}function Be(F,te){const Te=h.get(te).get(F);u.get(te)!==Te&&(n.uniformBlockBinding(te,Te,F.__bindingPointIndex),u.set(te,Te))}function Ze(){n.disable(3042),n.disable(2884),n.disable(2929),n.disable(32823),n.disable(3089),n.disable(2960),n.disable(32926),n.blendEquation(32774),n.blendFunc(1,0),n.blendFuncSeparate(1,0,1,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(513),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(519,0,4294967295),n.stencilOp(7680,7680,7680),n.clearStencil(0),n.cullFace(1029),n.frontFace(2305),n.polygonOffset(0,0),n.activeTexture(33984),n.bindFramebuffer(36160,null),i===!0&&(n.bindFramebuffer(36009,null),n.bindFramebuffer(36008,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},ce=null,he={},m={},g=new WeakMap,p=[],d=null,x=!1,A=null,v=null,T=null,w=null,R=null,O=null,M=null,L=!1,U=null,$=null,ue=null,G=null,B=null,oe.set(0,0,n.canvas.width,n.canvas.height),de.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ce,disable:Ae,bindFramebuffer:Ee,drawBuffers:pe,useProgram:Ie,setBlending:P,setMaterial:k,setFlipSided:I,setCullFace:Z,setLineWidth:J,setPolygonOffset:j,setScissorTest:ae,activeTexture:K,bindTexture:b,unbindTexture:_,compressedTexImage2D:D,compressedTexImage3D:Y,texImage2D:we,texImage3D:be,updateUBOMapping:De,uniformBlockBinding:Be,texStorage2D:z,texStorage3D:xe,texSubImage2D:Q,texSubImage3D:le,compressedTexSubImage2D:_e,compressedTexSubImage3D:C,scissor:Le,viewport:Se,reset:Ze}}function Wx(n,e,t,i,s,r,a){const o=s.isWebGL2,l=s.maxTextures,c=s.maxCubemapSize,u=s.maxTextureSize,h=s.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let p;const d=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(b,_){return x?new OffscreenCanvas(b,_):Cr("canvas")}function v(b,_,D,Y){let Q=1;if((b.width>Y||b.height>Y)&&(Q=Y/Math.max(b.width,b.height)),Q<1||_===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const le=_?ra:Math.floor,_e=le(Q*b.width),C=le(Q*b.height);p===void 0&&(p=A(_e,C));const z=D?A(_e,C):p;return z.width=_e,z.height=C,z.getContext("2d").drawImage(b,0,0,_e,C),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+_e+"x"+C+")."),z}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function T(b){return Kl(b.width)&&Kl(b.height)}function w(b){return o?!1:b.wrapS!==Yt||b.wrapT!==Yt||b.minFilter!==wt&&b.minFilter!==kt}function R(b,_){return b.generateMipmaps&&_&&b.minFilter!==wt&&b.minFilter!==kt}function O(b){n.generateMipmap(b)}function M(b,_,D,Y,Q=!1){if(o===!1)return _;if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let le=_;return _===6403&&(D===5126&&(le=33326),D===5131&&(le=33325),D===5121&&(le=33321)),_===33319&&(D===5126&&(le=33328),D===5131&&(le=33327),D===5121&&(le=33323)),_===6408&&(D===5126&&(le=34836),D===5131&&(le=34842),D===5121&&(le=Y===$e&&Q===!1?35907:32856),D===32819&&(le=32854),D===32820&&(le=32855)),(le===33325||le===33326||le===33327||le===33328||le===34842||le===34836)&&e.get("EXT_color_buffer_float"),le}function L(b,_,D){return R(b,D)===!0||b.isFramebufferTexture&&b.minFilter!==wt&&b.minFilter!==kt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function U(b){return b===wt||b===Sl||b===to?9728:9729}function $(b){const _=b.target;_.removeEventListener("dispose",$),G(_),_.isVideoTexture&&g.delete(_)}function ue(b){const _=b.target;_.removeEventListener("dispose",ue),ee(_)}function G(b){const _=i.get(b);if(_.__webglInit===void 0)return;const D=b.source,Y=d.get(D);if(Y){const Q=Y[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&B(b),Object.keys(Y).length===0&&d.delete(D)}i.remove(b)}function B(b){const _=i.get(b);n.deleteTexture(_.__webglTexture);const D=b.source,Y=d.get(D);delete Y[_.__cacheKey],a.memory.textures--}function ee(b){const _=b.texture,D=i.get(b),Y=i.get(_);if(Y.__webglTexture!==void 0&&(n.deleteTexture(Y.__webglTexture),a.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++)n.deleteFramebuffer(D.__webglFramebuffer[Q]),D.__webglDepthbuffer&&n.deleteRenderbuffer(D.__webglDepthbuffer[Q]);else{if(n.deleteFramebuffer(D.__webglFramebuffer),D.__webglDepthbuffer&&n.deleteRenderbuffer(D.__webglDepthbuffer),D.__webglMultisampledFramebuffer&&n.deleteFramebuffer(D.__webglMultisampledFramebuffer),D.__webglColorRenderbuffer)for(let Q=0;Q<D.__webglColorRenderbuffer.length;Q++)D.__webglColorRenderbuffer[Q]&&n.deleteRenderbuffer(D.__webglColorRenderbuffer[Q]);D.__webglDepthRenderbuffer&&n.deleteRenderbuffer(D.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let Q=0,le=_.length;Q<le;Q++){const _e=i.get(_[Q]);_e.__webglTexture&&(n.deleteTexture(_e.__webglTexture),a.memory.textures--),i.remove(_[Q])}i.remove(_),i.remove(b)}let se=0;function ie(){se=0}function X(){const b=se;return b>=l&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+l),se+=1,b}function ce(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.encoding),_.join()}function he(b,_){const D=i.get(b);if(b.isVideoTexture&&ae(b),b.isRenderTargetTexture===!1&&b.version>0&&D.__version!==b.version){const Y=b.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(D,b,_);return}}t.bindTexture(3553,D.__webglTexture,33984+_)}function Me(b,_){const D=i.get(b);if(b.version>0&&D.__version!==b.version){Ae(D,b,_);return}t.bindTexture(35866,D.__webglTexture,33984+_)}function V(b,_){const D=i.get(b);if(b.version>0&&D.__version!==b.version){Ae(D,b,_);return}t.bindTexture(32879,D.__webglTexture,33984+_)}function oe(b,_){const D=i.get(b);if(b.version>0&&D.__version!==b.version){Ee(D,b,_);return}t.bindTexture(34067,D.__webglTexture,33984+_)}const de={[na]:10497,[Yt]:33071,[ia]:33648},me={[wt]:9728,[Sl]:9984,[to]:9986,[kt]:9729,[Ip]:9985,[Ds]:9987};function W(b,_,D){if(D?(n.texParameteri(b,10242,de[_.wrapS]),n.texParameteri(b,10243,de[_.wrapT]),(b===32879||b===35866)&&n.texParameteri(b,32882,de[_.wrapR]),n.texParameteri(b,10240,me[_.magFilter]),n.texParameteri(b,10241,me[_.minFilter])):(n.texParameteri(b,10242,33071),n.texParameteri(b,10243,33071),(b===32879||b===35866)&&n.texParameteri(b,32882,33071),(_.wrapS!==Yt||_.wrapT!==Yt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(b,10240,U(_.magFilter)),n.texParameteri(b,10241,U(_.minFilter)),_.minFilter!==wt&&_.minFilter!==kt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const Y=e.get("EXT_texture_filter_anisotropic");if(_.magFilter===wt||_.minFilter!==to&&_.minFilter!==Ds||_.type===ti&&e.has("OES_texture_float_linear")===!1||o===!1&&_.type===Is&&e.has("OES_texture_half_float_linear")===!1)return;(_.anisotropy>1||i.get(_).__currentAnisotropy)&&(n.texParameterf(b,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy)}}function Ce(b,_){let D=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",$));const Y=_.source;let Q=d.get(Y);Q===void 0&&(Q={},d.set(Y,Q));const le=ce(_);if(le!==b.__cacheKey){Q[le]===void 0&&(Q[le]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,D=!0),Q[le].usedTimes++;const _e=Q[b.__cacheKey];_e!==void 0&&(Q[b.__cacheKey].usedTimes--,_e.usedTimes===0&&B(_)),b.__cacheKey=le,b.__webglTexture=Q[le].texture}return D}function Ae(b,_,D){let Y=3553;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=35866),_.isData3DTexture&&(Y=32879);const Q=Ce(b,_),le=_.source;t.bindTexture(Y,b.__webglTexture,33984+D);const _e=i.get(le);if(le.version!==_e.__version||Q===!0){t.activeTexture(33984+D),n.pixelStorei(37440,_.flipY),n.pixelStorei(37441,_.premultiplyAlpha),n.pixelStorei(3317,_.unpackAlignment),n.pixelStorei(37443,0);const C=w(_)&&T(_.image)===!1;let z=v(_.image,C,!1,u);z=K(_,z);const xe=T(z)||o,we=r.convert(_.format,_.encoding);let be=r.convert(_.type),Le=M(_.internalFormat,we,be,_.encoding,_.isVideoTexture);W(Y,_,xe);let Se;const De=_.mipmaps,Be=o&&_.isVideoTexture!==!0,Ze=_e.__version===void 0||Q===!0,F=L(_,z,xe);if(_.isDepthTexture)Le=6402,o?_.type===ti?Le=36012:_.type===ei?Le=33190:_.type===Hi?Le=35056:Le=33189:_.type===ti&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===oi&&Le===6402&&_.type!==Iu&&_.type!==ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=ei,be=r.convert(_.type)),_.format===Ki&&Le===6402&&(Le=34041,_.type!==Hi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=Hi,be=r.convert(_.type))),Ze&&(Be?t.texStorage2D(3553,1,Le,z.width,z.height):t.texImage2D(3553,0,Le,z.width,z.height,0,we,be,null));else if(_.isDataTexture)if(De.length>0&&xe){Be&&Ze&&t.texStorage2D(3553,F,Le,De[0].width,De[0].height);for(let te=0,fe=De.length;te<fe;te++)Se=De[te],Be?t.texSubImage2D(3553,te,0,0,Se.width,Se.height,we,be,Se.data):t.texImage2D(3553,te,Le,Se.width,Se.height,0,we,be,Se.data);_.generateMipmaps=!1}else Be?(Ze&&t.texStorage2D(3553,F,Le,z.width,z.height),t.texSubImage2D(3553,0,0,0,z.width,z.height,we,be,z.data)):t.texImage2D(3553,0,Le,z.width,z.height,0,we,be,z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Be&&Ze&&t.texStorage3D(35866,F,Le,De[0].width,De[0].height,z.depth);for(let te=0,fe=De.length;te<fe;te++)Se=De[te],_.format!==Zt?we!==null?Be?t.compressedTexSubImage3D(35866,te,0,0,0,Se.width,Se.height,z.depth,we,Se.data,0,0):t.compressedTexImage3D(35866,te,Le,Se.width,Se.height,z.depth,0,Se.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?t.texSubImage3D(35866,te,0,0,0,Se.width,Se.height,z.depth,we,be,Se.data):t.texImage3D(35866,te,Le,Se.width,Se.height,z.depth,0,we,be,Se.data)}else{Be&&Ze&&t.texStorage2D(3553,F,Le,De[0].width,De[0].height);for(let te=0,fe=De.length;te<fe;te++)Se=De[te],_.format!==Zt?we!==null?Be?t.compressedTexSubImage2D(3553,te,0,0,Se.width,Se.height,we,Se.data):t.compressedTexImage2D(3553,te,Le,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?t.texSubImage2D(3553,te,0,0,Se.width,Se.height,we,be,Se.data):t.texImage2D(3553,te,Le,Se.width,Se.height,0,we,be,Se.data)}else if(_.isDataArrayTexture)Be?(Ze&&t.texStorage3D(35866,F,Le,z.width,z.height,z.depth),t.texSubImage3D(35866,0,0,0,0,z.width,z.height,z.depth,we,be,z.data)):t.texImage3D(35866,0,Le,z.width,z.height,z.depth,0,we,be,z.data);else if(_.isData3DTexture)Be?(Ze&&t.texStorage3D(32879,F,Le,z.width,z.height,z.depth),t.texSubImage3D(32879,0,0,0,0,z.width,z.height,z.depth,we,be,z.data)):t.texImage3D(32879,0,Le,z.width,z.height,z.depth,0,we,be,z.data);else if(_.isFramebufferTexture){if(Ze)if(Be)t.texStorage2D(3553,F,Le,z.width,z.height);else{let te=z.width,fe=z.height;for(let Te=0;Te<F;Te++)t.texImage2D(3553,Te,Le,te,fe,0,we,be,null),te>>=1,fe>>=1}}else if(De.length>0&&xe){Be&&Ze&&t.texStorage2D(3553,F,Le,De[0].width,De[0].height);for(let te=0,fe=De.length;te<fe;te++)Se=De[te],Be?t.texSubImage2D(3553,te,0,0,we,be,Se):t.texImage2D(3553,te,Le,we,be,Se);_.generateMipmaps=!1}else Be?(Ze&&t.texStorage2D(3553,F,Le,z.width,z.height),t.texSubImage2D(3553,0,0,0,we,be,z)):t.texImage2D(3553,0,Le,we,be,z);R(_,xe)&&O(Y),_e.__version=le.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Ee(b,_,D){if(_.image.length!==6)return;const Y=Ce(b,_),Q=_.source;t.bindTexture(34067,b.__webglTexture,33984+D);const le=i.get(Q);if(Q.version!==le.__version||Y===!0){t.activeTexture(33984+D),n.pixelStorei(37440,_.flipY),n.pixelStorei(37441,_.premultiplyAlpha),n.pixelStorei(3317,_.unpackAlignment),n.pixelStorei(37443,0);const _e=_.isCompressedTexture||_.image[0].isCompressedTexture,C=_.image[0]&&_.image[0].isDataTexture,z=[];for(let te=0;te<6;te++)!_e&&!C?z[te]=v(_.image[te],!1,!0,c):z[te]=C?_.image[te].image:_.image[te],z[te]=K(_,z[te]);const xe=z[0],we=T(xe)||o,be=r.convert(_.format,_.encoding),Le=r.convert(_.type),Se=M(_.internalFormat,be,Le,_.encoding),De=o&&_.isVideoTexture!==!0,Be=le.__version===void 0||Y===!0;let Ze=L(_,xe,we);W(34067,_,we);let F;if(_e){De&&Be&&t.texStorage2D(34067,Ze,Se,xe.width,xe.height);for(let te=0;te<6;te++){F=z[te].mipmaps;for(let fe=0;fe<F.length;fe++){const Te=F[fe];_.format!==Zt?be!==null?De?t.compressedTexSubImage2D(34069+te,fe,0,0,Te.width,Te.height,be,Te.data):t.compressedTexImage2D(34069+te,fe,Se,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?t.texSubImage2D(34069+te,fe,0,0,Te.width,Te.height,be,Le,Te.data):t.texImage2D(34069+te,fe,Se,Te.width,Te.height,0,be,Le,Te.data)}}}else{F=_.mipmaps,De&&Be&&(F.length>0&&Ze++,t.texStorage2D(34067,Ze,Se,z[0].width,z[0].height));for(let te=0;te<6;te++)if(C){De?t.texSubImage2D(34069+te,0,0,0,z[te].width,z[te].height,be,Le,z[te].data):t.texImage2D(34069+te,0,Se,z[te].width,z[te].height,0,be,Le,z[te].data);for(let fe=0;fe<F.length;fe++){const Pe=F[fe].image[te].image;De?t.texSubImage2D(34069+te,fe+1,0,0,Pe.width,Pe.height,be,Le,Pe.data):t.texImage2D(34069+te,fe+1,Se,Pe.width,Pe.height,0,be,Le,Pe.data)}}else{De?t.texSubImage2D(34069+te,0,0,0,be,Le,z[te]):t.texImage2D(34069+te,0,Se,be,Le,z[te]);for(let fe=0;fe<F.length;fe++){const Te=F[fe];De?t.texSubImage2D(34069+te,fe+1,0,0,be,Le,Te.image[te]):t.texImage2D(34069+te,fe+1,Se,be,Le,Te.image[te])}}}R(_,we)&&O(34067),le.__version=Q.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function pe(b,_,D,Y,Q){const le=r.convert(D.format,D.encoding),_e=r.convert(D.type),C=M(D.internalFormat,le,_e,D.encoding);i.get(_).__hasExternalTextures||(Q===32879||Q===35866?t.texImage3D(Q,0,C,_.width,_.height,_.depth,0,le,_e,null):t.texImage2D(Q,0,C,_.width,_.height,0,le,_e,null)),t.bindFramebuffer(36160,b),j(_)?f.framebufferTexture2DMultisampleEXT(36160,Y,Q,i.get(D).__webglTexture,0,J(_)):(Q===3553||Q>=34069&&Q<=34074)&&n.framebufferTexture2D(36160,Y,Q,i.get(D).__webglTexture,0),t.bindFramebuffer(36160,null)}function Ie(b,_,D){if(n.bindRenderbuffer(36161,b),_.depthBuffer&&!_.stencilBuffer){let Y=33189;if(D||j(_)){const Q=_.depthTexture;Q&&Q.isDepthTexture&&(Q.type===ti?Y=36012:Q.type===ei&&(Y=33190));const le=J(_);j(_)?f.renderbufferStorageMultisampleEXT(36161,le,Y,_.width,_.height):n.renderbufferStorageMultisample(36161,le,Y,_.width,_.height)}else n.renderbufferStorage(36161,Y,_.width,_.height);n.framebufferRenderbuffer(36160,36096,36161,b)}else if(_.depthBuffer&&_.stencilBuffer){const Y=J(_);D&&j(_)===!1?n.renderbufferStorageMultisample(36161,Y,35056,_.width,_.height):j(_)?f.renderbufferStorageMultisampleEXT(36161,Y,35056,_.width,_.height):n.renderbufferStorage(36161,34041,_.width,_.height),n.framebufferRenderbuffer(36160,33306,36161,b)}else{const Y=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let Q=0;Q<Y.length;Q++){const le=Y[Q],_e=r.convert(le.format,le.encoding),C=r.convert(le.type),z=M(le.internalFormat,_e,C,le.encoding),xe=J(_);D&&j(_)===!1?n.renderbufferStorageMultisample(36161,xe,z,_.width,_.height):j(_)?f.renderbufferStorageMultisampleEXT(36161,xe,z,_.width,_.height):n.renderbufferStorage(36161,z,_.width,_.height)}}n.bindRenderbuffer(36161,null)}function y(b,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),he(_.depthTexture,0);const Y=i.get(_.depthTexture).__webglTexture,Q=J(_);if(_.depthTexture.format===oi)j(_)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,Y,0,Q):n.framebufferTexture2D(36160,36096,3553,Y,0);else if(_.depthTexture.format===Ki)j(_)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,Y,0,Q):n.framebufferTexture2D(36160,33306,3553,Y,0);else throw new Error("Unknown depthTexture format")}function S(b){const _=i.get(b),D=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!_.__autoAllocateDepthBuffer){if(D)throw new Error("target.depthTexture not supported in Cube render targets");y(_.__webglFramebuffer,b)}else if(D){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)t.bindFramebuffer(36160,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]=n.createRenderbuffer(),Ie(_.__webglDepthbuffer[Y],b,!1)}else t.bindFramebuffer(36160,_.__webglFramebuffer),_.__webglDepthbuffer=n.createRenderbuffer(),Ie(_.__webglDepthbuffer,b,!1);t.bindFramebuffer(36160,null)}function P(b,_,D){const Y=i.get(b);_!==void 0&&pe(Y.__webglFramebuffer,b,b.texture,36064,3553),D!==void 0&&S(b)}function k(b){const _=b.texture,D=i.get(b),Y=i.get(_);b.addEventListener("dispose",ue),b.isWebGLMultipleRenderTargets!==!0&&(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=_.version,a.memory.textures++);const Q=b.isWebGLCubeRenderTarget===!0,le=b.isWebGLMultipleRenderTargets===!0,_e=T(b)||o;if(Q){D.__webglFramebuffer=[];for(let C=0;C<6;C++)D.__webglFramebuffer[C]=n.createFramebuffer()}else{if(D.__webglFramebuffer=n.createFramebuffer(),le)if(s.drawBuffers){const C=b.texture;for(let z=0,xe=C.length;z<xe;z++){const we=i.get(C[z]);we.__webglTexture===void 0&&(we.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&b.samples>0&&j(b)===!1){const C=le?_:[_];D.__webglMultisampledFramebuffer=n.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,D.__webglMultisampledFramebuffer);for(let z=0;z<C.length;z++){const xe=C[z];D.__webglColorRenderbuffer[z]=n.createRenderbuffer(),n.bindRenderbuffer(36161,D.__webglColorRenderbuffer[z]);const we=r.convert(xe.format,xe.encoding),be=r.convert(xe.type),Le=M(xe.internalFormat,we,be,xe.encoding,b.isXRRenderTarget===!0),Se=J(b);n.renderbufferStorageMultisample(36161,Se,Le,b.width,b.height),n.framebufferRenderbuffer(36160,36064+z,36161,D.__webglColorRenderbuffer[z])}n.bindRenderbuffer(36161,null),b.depthBuffer&&(D.__webglDepthRenderbuffer=n.createRenderbuffer(),Ie(D.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(36160,null)}}if(Q){t.bindTexture(34067,Y.__webglTexture),W(34067,_,_e);for(let C=0;C<6;C++)pe(D.__webglFramebuffer[C],b,_,36064,34069+C);R(_,_e)&&O(34067),t.unbindTexture()}else if(le){const C=b.texture;for(let z=0,xe=C.length;z<xe;z++){const we=C[z],be=i.get(we);t.bindTexture(3553,be.__webglTexture),W(3553,we,_e),pe(D.__webglFramebuffer,b,we,36064+z,3553),R(we,_e)&&O(3553)}t.unbindTexture()}else{let C=3553;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(o?C=b.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(C,Y.__webglTexture),W(C,_,_e),pe(D.__webglFramebuffer,b,_,36064,C),R(_,_e)&&O(C),t.unbindTexture()}b.depthBuffer&&S(b)}function I(b){const _=T(b)||o,D=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let Y=0,Q=D.length;Y<Q;Y++){const le=D[Y];if(R(le,_)){const _e=b.isWebGLCubeRenderTarget?34067:3553,C=i.get(le).__webglTexture;t.bindTexture(_e,C),O(_e),t.unbindTexture()}}}function Z(b){if(o&&b.samples>0&&j(b)===!1){const _=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],D=b.width,Y=b.height;let Q=16384;const le=[],_e=b.stencilBuffer?33306:36096,C=i.get(b),z=b.isWebGLMultipleRenderTargets===!0;if(z)for(let xe=0;xe<_.length;xe++)t.bindFramebuffer(36160,C.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(36160,36064+xe,36161,null),t.bindFramebuffer(36160,C.__webglFramebuffer),n.framebufferTexture2D(36009,36064+xe,3553,null,0);t.bindFramebuffer(36008,C.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,C.__webglFramebuffer);for(let xe=0;xe<_.length;xe++){le.push(36064+xe),b.depthBuffer&&le.push(_e);const we=C.__ignoreDepthValues!==void 0?C.__ignoreDepthValues:!1;if(we===!1&&(b.depthBuffer&&(Q|=256),b.stencilBuffer&&(Q|=1024)),z&&n.framebufferRenderbuffer(36008,36064,36161,C.__webglColorRenderbuffer[xe]),we===!0&&(n.invalidateFramebuffer(36008,[_e]),n.invalidateFramebuffer(36009,[_e])),z){const be=i.get(_[xe]).__webglTexture;n.framebufferTexture2D(36009,36064,3553,be,0)}n.blitFramebuffer(0,0,D,Y,0,0,D,Y,Q,9728),m&&n.invalidateFramebuffer(36008,le)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),z)for(let xe=0;xe<_.length;xe++){t.bindFramebuffer(36160,C.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(36160,36064+xe,36161,C.__webglColorRenderbuffer[xe]);const we=i.get(_[xe]).__webglTexture;t.bindFramebuffer(36160,C.__webglFramebuffer),n.framebufferTexture2D(36009,36064+xe,3553,we,0)}t.bindFramebuffer(36009,C.__webglMultisampledFramebuffer)}}function J(b){return Math.min(h,b.samples)}function j(b){const _=i.get(b);return o&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ae(b){const _=a.render.frame;g.get(b)!==_&&(g.set(b,_),b.update())}function K(b,_){const D=b.encoding,Y=b.format,Q=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===sa||D!==ci&&(D===$e?o===!1?e.has("EXT_sRGB")===!0&&Y===Zt?(b.format=sa,b.minFilter=kt,b.generateMipmaps=!1):_=Uu.sRGBToLinear(_):(Y!==Zt||Q!==li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",D)),_}this.allocateTextureUnit=X,this.resetTextureUnits=ie,this.setTexture2D=he,this.setTexture2DArray=Me,this.setTexture3D=V,this.setTextureCube=oe,this.rebindTextures=P,this.setupRenderTarget=k,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=S,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=j}function qx(n,e,t){const i=t.isWebGL2;function s(r,a=null){let o;if(r===li)return 5121;if(r===Up)return 32819;if(r===zp)return 32820;if(r===Fp)return 5120;if(r===Op)return 5122;if(r===Iu)return 5123;if(r===Np)return 5124;if(r===ei)return 5125;if(r===ti)return 5126;if(r===Is)return i?5131:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Bp)return 6406;if(r===Zt)return 6408;if(r===kp)return 6409;if(r===Gp)return 6410;if(r===oi)return 6402;if(r===Ki)return 34041;if(r===sa)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Hp)return 6403;if(r===Vp)return 36244;if(r===Wp)return 33319;if(r===qp)return 33320;if(r===Xp)return 36249;if(r===no||r===io||r===so||r===ro)if(a===$e)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===no)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===io)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===so)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ro)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===no)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===io)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===so)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ro)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===wl||r===Tl||r===El||r===Al)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===wl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Tl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===El)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Al)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===jp)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Cl||r===Ll)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Cl)return a===$e?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Ll)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Pl||r===Rl||r===Dl||r===Il||r===Fl||r===Ol||r===Nl||r===Ul||r===zl||r===Bl||r===kl||r===Gl||r===Hl||r===Vl)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Pl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Rl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Dl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Il)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Fl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ol)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Nl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ul)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===zl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Bl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===kl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Gl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Hl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Vl)return a===$e?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===oo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===oo)return a===$e?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(r===Yp||r===Wl||r===ql||r===Xl)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===oo)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Wl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ql)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Xl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Hi?i?34042:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class Xx extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}let Ni=class extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}};const jx={type:"move"};class Fo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ni,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ni,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ni,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const p of e.hand.values()){const d=t.getJointPose(p,i),x=this._getHandJoint(c,p);d!==null&&(x.matrix.fromArray(d.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.jointRadius=d.radius),x.visible=d!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jx)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ni;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Yx extends Nt{constructor(e,t,i,s,r,a,o,l,c,u){if(u=u!==void 0?u:oi,u!==oi&&u!==Ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===oi&&(i=ei),i===void 0&&u===Ki&&(i=Hi),super(null,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:wt,this.minFilter=l!==void 0?l:wt,this.flipY=!1,this.generateMipmaps=!1}}class Zx extends mi{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,m=null,g=null;const p=t.getContextAttributes();let d=null,x=null;const A=[],v=[],T=new Set,w=new Map,R=new Gt;R.layers.enable(1),R.viewport=new dt;const O=new Gt;O.layers.enable(2),O.viewport=new dt;const M=[R,O],L=new Xx;L.layers.enable(1),L.layers.enable(2);let U=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let oe=A[V];return oe===void 0&&(oe=new Fo,A[V]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(V){let oe=A[V];return oe===void 0&&(oe=new Fo,A[V]=oe),oe.getGripSpace()},this.getHand=function(V){let oe=A[V];return oe===void 0&&(oe=new Fo,A[V]=oe),oe.getHandSpace()};function ue(V){const oe=v.indexOf(V.inputSource);if(oe===-1)return;const de=A[oe];de!==void 0&&de.dispatchEvent({type:V.type,data:V.inputSource})}function G(){s.removeEventListener("select",ue),s.removeEventListener("selectstart",ue),s.removeEventListener("selectend",ue),s.removeEventListener("squeeze",ue),s.removeEventListener("squeezestart",ue),s.removeEventListener("squeezeend",ue),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",B);for(let V=0;V<A.length;V++){const oe=v[V];oe!==null&&(v[V]=null,A[V].disconnect(oe))}U=null,$=null,e.setRenderTarget(d),m=null,f=null,h=null,s=null,x=null,Me.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",ue),s.addEventListener("selectstart",ue),s.addEventListener("selectend",ue),s.addEventListener("squeeze",ue),s.addEventListener("squeezestart",ue),s.addEventListener("squeezeend",ue),s.addEventListener("end",G),s.addEventListener("inputsourceschange",B),p.xrCompatible!==!0&&await t.makeXRCompatible(),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const oe={antialias:s.renderState.layers===void 0?p.antialias:!0,alpha:p.alpha,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,oe),s.updateRenderState({baseLayer:m}),x=new ui(m.framebufferWidth,m.framebufferHeight,{format:Zt,type:li,encoding:e.outputEncoding,stencilBuffer:p.stencil})}else{let oe=null,de=null,me=null;p.depth&&(me=p.stencil?35056:33190,oe=p.stencil?Ki:oi,de=p.stencil?Hi:ei);const W={colorFormat:32856,depthFormat:me,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(W),s.updateRenderState({layers:[f]}),x=new ui(f.textureWidth,f.textureHeight,{format:Zt,type:li,depthTexture:new Yx(f.textureWidth,f.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:p.stencil,encoding:e.outputEncoding,samples:p.antialias?4:0});const Ce=e.properties.get(x);Ce.__ignoreDepthValues=f.ignoreDepthValues}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Me.setContext(s),Me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}};function B(V){for(let oe=0;oe<V.removed.length;oe++){const de=V.removed[oe],me=v.indexOf(de);me>=0&&(v[me]=null,A[me].disconnect(de))}for(let oe=0;oe<V.added.length;oe++){const de=V.added[oe];let me=v.indexOf(de);if(me===-1){for(let Ce=0;Ce<A.length;Ce++)if(Ce>=v.length){v.push(de),me=Ce;break}else if(v[Ce]===null){v[Ce]=de,me=Ce;break}if(me===-1)break}const W=A[me];W&&W.connect(de)}}const ee=new N,se=new N;function ie(V,oe,de){ee.setFromMatrixPosition(oe.matrixWorld),se.setFromMatrixPosition(de.matrixWorld);const me=ee.distanceTo(se),W=oe.projectionMatrix.elements,Ce=de.projectionMatrix.elements,Ae=W[14]/(W[10]-1),Ee=W[14]/(W[10]+1),pe=(W[9]+1)/W[5],Ie=(W[9]-1)/W[5],y=(W[8]-1)/W[0],S=(Ce[8]+1)/Ce[0],P=Ae*y,k=Ae*S,I=me/(-y+S),Z=I*-y;oe.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Z),V.translateZ(I),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const J=Ae+I,j=Ee+I,ae=P-Z,K=k+(me-Z),b=pe*Ee/j*J,_=Ie*Ee/j*J;V.projectionMatrix.makePerspective(ae,K,b,_,J,j)}function X(V,oe){oe===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(oe.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;L.near=O.near=R.near=V.near,L.far=O.far=R.far=V.far,(U!==L.near||$!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),U=L.near,$=L.far);const oe=V.parent,de=L.cameras;X(L,oe);for(let W=0;W<de.length;W++)X(de[W],oe);L.matrixWorld.decompose(L.position,L.quaternion,L.scale),V.matrix.copy(L.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale);const me=V.children;for(let W=0,Ce=me.length;W<Ce;W++)me[W].updateMatrixWorld(!0);de.length===2?ie(L,R,O):L.projectionMatrix.copy(R.projectionMatrix)},this.getCamera=function(){return L},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(V){l=V,f!==null&&(f.fixedFoveation=V),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=V)},this.getPlanes=function(){return T};let ce=null;function he(V,oe){if(u=oe.getViewerPose(c||a),g=oe,u!==null){const de=u.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let me=!1;de.length!==L.cameras.length&&(L.cameras.length=0,me=!0);for(let W=0;W<de.length;W++){const Ce=de[W];let Ae=null;if(m!==null)Ae=m.getViewport(Ce);else{const pe=h.getViewSubImage(f,Ce);Ae=pe.viewport,W===0&&(e.setRenderTargetTextures(x,pe.colorTexture,f.ignoreDepthValues?void 0:pe.depthStencilTexture),e.setRenderTarget(x))}let Ee=M[W];Ee===void 0&&(Ee=new Gt,Ee.layers.enable(W),Ee.viewport=new dt,M[W]=Ee),Ee.matrix.fromArray(Ce.transform.matrix),Ee.projectionMatrix.fromArray(Ce.projectionMatrix),Ee.viewport.set(Ae.x,Ae.y,Ae.width,Ae.height),W===0&&L.matrix.copy(Ee.matrix),me===!0&&L.cameras.push(Ee)}}for(let de=0;de<A.length;de++){const me=v[de],W=A[de];me!==null&&W!==void 0&&W.update(me,oe,c||a)}if(ce&&ce(V,oe),oe.detectedPlanes){i.dispatchEvent({type:"planesdetected",data:oe.detectedPlanes});let de=null;for(const me of T)oe.detectedPlanes.has(me)||(de===null&&(de=[]),de.push(me));if(de!==null)for(const me of de)T.delete(me),w.delete(me),i.dispatchEvent({type:"planeremoved",data:me});for(const me of oe.detectedPlanes)if(!T.has(me))T.add(me),w.set(me,oe.lastChangedTime),i.dispatchEvent({type:"planeadded",data:me});else{const W=w.get(me);me.lastChangedTime>W&&(w.set(me,me.lastChangedTime),i.dispatchEvent({type:"planechanged",data:me}))}}g=null}const Me=new ju;Me.setAnimationLoop(he),this.setAnimationLoop=function(V){ce=V},this.dispose=function(){}}}function Kx(n,e){function t(p,d){d.color.getRGB(p.fogColor.value,Wu(n)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function i(p,d,x,A,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(p,d):d.isMeshToonMaterial?(s(p,d),u(p,d)):d.isMeshPhongMaterial?(s(p,d),c(p,d)):d.isMeshStandardMaterial?(s(p,d),h(p,d),d.isMeshPhysicalMaterial&&f(p,d,v)):d.isMeshMatcapMaterial?(s(p,d),m(p,d)):d.isMeshDepthMaterial?s(p,d):d.isMeshDistanceMaterial?(s(p,d),g(p,d)):d.isMeshNormalMaterial?s(p,d):d.isLineBasicMaterial?(r(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?o(p,d,x,A):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map),d.alphaMap&&(p.alphaMap.value=d.alphaMap),d.bumpMap&&(p.bumpMap.value=d.bumpMap,p.bumpScale.value=d.bumpScale,d.side===Ot&&(p.bumpScale.value*=-1)),d.displacementMap&&(p.displacementMap.value=d.displacementMap,p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap),d.normalMap&&(p.normalMap.value=d.normalMap,p.normalScale.value.copy(d.normalScale),d.side===Ot&&p.normalScale.value.negate()),d.specularMap&&(p.specularMap.value=d.specularMap),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const x=e.get(d).envMap;if(x&&(p.envMap.value=x,p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;const T=n.physicallyCorrectLights!==!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*T}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity);let A;d.map?A=d.map:d.specularMap?A=d.specularMap:d.displacementMap?A=d.displacementMap:d.normalMap?A=d.normalMap:d.bumpMap?A=d.bumpMap:d.roughnessMap?A=d.roughnessMap:d.metalnessMap?A=d.metalnessMap:d.alphaMap?A=d.alphaMap:d.emissiveMap?A=d.emissiveMap:d.clearcoatMap?A=d.clearcoatMap:d.clearcoatNormalMap?A=d.clearcoatNormalMap:d.clearcoatRoughnessMap?A=d.clearcoatRoughnessMap:d.iridescenceMap?A=d.iridescenceMap:d.iridescenceThicknessMap?A=d.iridescenceThicknessMap:d.specularIntensityMap?A=d.specularIntensityMap:d.specularColorMap?A=d.specularColorMap:d.transmissionMap?A=d.transmissionMap:d.thicknessMap?A=d.thicknessMap:d.sheenColorMap?A=d.sheenColorMap:d.sheenRoughnessMap&&(A=d.sheenRoughnessMap),A!==void 0&&(A.isWebGLRenderTarget&&(A=A.texture),A.matrixAutoUpdate===!0&&A.updateMatrix(),p.uvTransform.value.copy(A.matrix));let v;d.aoMap?v=d.aoMap:d.lightMap&&(v=d.lightMap),v!==void 0&&(v.isWebGLRenderTarget&&(v=v.texture),v.matrixAutoUpdate===!0&&v.updateMatrix(),p.uv2Transform.value.copy(v.matrix))}function r(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function o(p,d,x,A){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*x,p.scale.value=A*.5,d.map&&(p.map.value=d.map),d.alphaMap&&(p.alphaMap.value=d.alphaMap),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let v;d.map?v=d.map:d.alphaMap&&(v=d.alphaMap),v!==void 0&&(v.matrixAutoUpdate===!0&&v.updateMatrix(),p.uvTransform.value.copy(v.matrix))}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map),d.alphaMap&&(p.alphaMap.value=d.alphaMap),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let x;d.map?x=d.map:d.alphaMap&&(x=d.alphaMap),x!==void 0&&(x.matrixAutoUpdate===!0&&x.updateMatrix(),p.uvTransform.value.copy(x.matrix))}function c(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function h(p,d){p.roughness.value=d.roughness,p.metalness.value=d.metalness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap),d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function f(p,d,x){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap)),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap),d.clearcoatNormalMap&&(p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),p.clearcoatNormalMap.value=d.clearcoatNormalMap,d.side===Ot&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap)),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap)}function m(p,d){d.matcap&&(p.matcap.value=d.matcap)}function g(p,d){p.referencePosition.value.copy(d.referencePosition),p.nearDistance.value=d.nearDistance,p.farDistance.value=d.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:i}}function $x(n,e,t,i){let s={},r={},a=[];const o=t.isWebGL2?n.getParameter(35375):0;function l(A,v){const T=v.program;i.uniformBlockBinding(A,T)}function c(A,v){let T=s[A.id];T===void 0&&(g(A),T=u(A),s[A.id]=T,A.addEventListener("dispose",d));const w=v.program;i.updateUBOMapping(A,w);const R=e.render.frame;r[A.id]!==R&&(f(A),r[A.id]=R)}function u(A){const v=h();A.__bindingPointIndex=v;const T=n.createBuffer(),w=A.__size,R=A.usage;return n.bindBuffer(35345,T),n.bufferData(35345,w,R),n.bindBuffer(35345,null),n.bindBufferBase(35345,v,T),T}function h(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const v=s[A.id],T=A.uniforms,w=A.__cache;n.bindBuffer(35345,v);for(let R=0,O=T.length;R<O;R++){const M=T[R];if(m(M,R,w)===!0){const L=M.__offset,U=Array.isArray(M.value)?M.value:[M.value];let $=0;for(let ue=0;ue<U.length;ue++){const G=U[ue],B=p(G);typeof G=="number"?(M.__data[0]=G,n.bufferSubData(35345,L+$,M.__data)):G.isMatrix3?(M.__data[0]=G.elements[0],M.__data[1]=G.elements[1],M.__data[2]=G.elements[2],M.__data[3]=G.elements[0],M.__data[4]=G.elements[3],M.__data[5]=G.elements[4],M.__data[6]=G.elements[5],M.__data[7]=G.elements[0],M.__data[8]=G.elements[6],M.__data[9]=G.elements[7],M.__data[10]=G.elements[8],M.__data[11]=G.elements[0]):(G.toArray(M.__data,$),$+=B.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(35345,L,M.__data)}}n.bindBuffer(35345,null)}function m(A,v,T){const w=A.value;if(T[v]===void 0){if(typeof w=="number")T[v]=w;else{const R=Array.isArray(w)?w:[w],O=[];for(let M=0;M<R.length;M++)O.push(R[M].clone());T[v]=O}return!0}else if(typeof w=="number"){if(T[v]!==w)return T[v]=w,!0}else{const R=Array.isArray(T[v])?T[v]:[T[v]],O=Array.isArray(w)?w:[w];for(let M=0;M<R.length;M++){const L=R[M];if(L.equals(O[M])===!1)return L.copy(O[M]),!0}}return!1}function g(A){const v=A.uniforms;let T=0;const w=16;let R=0;for(let O=0,M=v.length;O<M;O++){const L=v[O],U={boundary:0,storage:0},$=Array.isArray(L.value)?L.value:[L.value];for(let ue=0,G=$.length;ue<G;ue++){const B=$[ue],ee=p(B);U.boundary+=ee.boundary,U.storage+=ee.storage}if(L.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=T,O>0){R=T%w;const ue=w-R;R!==0&&ue-U.boundary<0&&(T+=w-R,L.__offset=T)}T+=U.storage}return R=T%w,R>0&&(T+=w-R),A.__size=T,A.__cache={},this}function p(A){const v={boundary:0,storage:0};return typeof A=="number"?(v.boundary=4,v.storage=4):A.isVector2?(v.boundary=8,v.storage=8):A.isVector3||A.isColor?(v.boundary=16,v.storage=12):A.isVector4?(v.boundary=16,v.storage=16):A.isMatrix3?(v.boundary=48,v.storage=48):A.isMatrix4?(v.boundary=64,v.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),v}function d(A){const v=A.target;v.removeEventListener("dispose",d);const T=a.indexOf(v.__bindingPointIndex);a.splice(T,1),n.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function x(){for(const A in s)n.deleteBuffer(s[A]);a=[],s={},r={}}return{bind:l,update:c,dispose:x}}function Jx(){const n=Cr("canvas");return n.style.display="block",n}function Qu(n={}){this.isWebGLRenderer=!0;const e=n.canvas!==void 0?n.canvas:Jx(),t=n.context!==void 0?n.context:null,i=n.depth!==void 0?n.depth:!0,s=n.stencil!==void 0?n.stencil:!0,r=n.antialias!==void 0?n.antialias:!1,a=n.premultipliedAlpha!==void 0?n.premultipliedAlpha:!0,o=n.preserveDrawingBuffer!==void 0?n.preserveDrawingBuffer:!1,l=n.powerPreference!==void 0?n.powerPreference:"default",c=n.failIfMajorPerformanceCaveat!==void 0?n.failIfMajorPerformanceCaveat:!1;let u;t!==null?u=t.getContextAttributes().alpha:u=n.alpha!==void 0?n.alpha:!1;let h=null,f=null;const m=[],g=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=ci,this.physicallyCorrectLights=!1,this.toneMapping=Mn,this.toneMappingExposure=1;const p=this;let d=!1,x=0,A=0,v=null,T=-1,w=null;const R=new dt,O=new dt;let M=null,L=e.width,U=e.height,$=1,ue=null,G=null;const B=new dt(0,0,L,U),ee=new dt(0,0,L,U);let se=!1;const ie=new Fa;let X=!1,ce=!1,he=null;const Me=new st,V=new ge,oe=new N,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function me(){return v===null?$:1}let W=t;function Ce(E,q){for(let ne=0;ne<E.length;ne++){const H=E[ne],re=e.getContext(H,q);if(re!==null)return re}return null}try{const E={alpha:!0,depth:i,stencil:s,antialias:r,premultipliedAlpha:a,preserveDrawingBuffer:o,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Da}`),e.addEventListener("webglcontextlost",Le,!1),e.addEventListener("webglcontextrestored",Se,!1),e.addEventListener("webglcontextcreationerror",De,!1),W===null){const q=["webgl2","webgl","experimental-webgl"];if(p.isWebGL1Renderer===!0&&q.shift(),W=Ce(q,E),W===null)throw Ce(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}W.getShaderPrecisionFormat===void 0&&(W.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ae,Ee,pe,Ie,y,S,P,k,I,Z,J,j,ae,K,b,_,D,Y,Q,le,_e,C,z,xe;function we(){Ae=new c0(W),Ee=new i0(W,Ae,n),Ae.init(Ee),C=new qx(W,Ae,Ee),pe=new Vx(W,Ae,Ee),Ie=new f0,y=new Lx,S=new Wx(W,Ae,pe,y,Ee,C,Ie),P=new r0(p),k=new l0(p),I=new Mm(W,Ee),z=new t0(W,Ae,I,Ee),Z=new u0(W,I,Ie,z),J=new g0(W,Z,I,Ie),Q=new m0(W,Ee,S),_=new s0(y),j=new Cx(p,P,k,Ae,Ee,z,_),ae=new Kx(p,y),K=new Rx,b=new Ux(Ae,Ee),Y=new e0(p,P,k,pe,J,u,a),D=new Hx(p,J,Ee),xe=new $x(W,Ie,Ee,pe),le=new n0(W,Ae,Ie,Ee),_e=new h0(W,Ae,Ie,Ee),Ie.programs=j.programs,p.capabilities=Ee,p.extensions=Ae,p.properties=y,p.renderLists=K,p.shadowMap=D,p.state=pe,p.info=Ie}we();const be=new Zx(p,W);this.xr=be,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const E=Ae.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ae.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(E){E!==void 0&&($=E,this.setSize(L,U,!1))},this.getSize=function(E){return E.set(L,U)},this.setSize=function(E,q,ne){if(be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=E,U=q,e.width=Math.floor(E*$),e.height=Math.floor(q*$),ne!==!1&&(e.style.width=E+"px",e.style.height=q+"px"),this.setViewport(0,0,E,q)},this.getDrawingBufferSize=function(E){return E.set(L*$,U*$).floor()},this.setDrawingBufferSize=function(E,q,ne){L=E,U=q,$=ne,e.width=Math.floor(E*ne),e.height=Math.floor(q*ne),this.setViewport(0,0,E,q)},this.getCurrentViewport=function(E){return E.copy(R)},this.getViewport=function(E){return E.copy(B)},this.setViewport=function(E,q,ne,H){E.isVector4?B.set(E.x,E.y,E.z,E.w):B.set(E,q,ne,H),pe.viewport(R.copy(B).multiplyScalar($).floor())},this.getScissor=function(E){return E.copy(ee)},this.setScissor=function(E,q,ne,H){E.isVector4?ee.set(E.x,E.y,E.z,E.w):ee.set(E,q,ne,H),pe.scissor(O.copy(ee).multiplyScalar($).floor())},this.getScissorTest=function(){return se},this.setScissorTest=function(E){pe.setScissorTest(se=E)},this.setOpaqueSort=function(E){ue=E},this.setTransparentSort=function(E){G=E},this.getClearColor=function(E){return E.copy(Y.getClearColor())},this.setClearColor=function(){Y.setClearColor.apply(Y,arguments)},this.getClearAlpha=function(){return Y.getClearAlpha()},this.setClearAlpha=function(){Y.setClearAlpha.apply(Y,arguments)},this.clear=function(E=!0,q=!0,ne=!0){let H=0;E&&(H|=16384),q&&(H|=256),ne&&(H|=1024),W.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Le,!1),e.removeEventListener("webglcontextrestored",Se,!1),e.removeEventListener("webglcontextcreationerror",De,!1),K.dispose(),b.dispose(),y.dispose(),P.dispose(),k.dispose(),J.dispose(),z.dispose(),xe.dispose(),j.dispose(),be.dispose(),be.removeEventListener("sessionstart",Te),be.removeEventListener("sessionend",Pe),he&&(he.dispose(),he=null),Xe.stop()};function Le(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),d=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),d=!1;const E=Ie.autoReset,q=D.enabled,ne=D.autoUpdate,H=D.needsUpdate,re=D.type;we(),Ie.autoReset=E,D.enabled=q,D.autoUpdate=ne,D.needsUpdate=H,D.type=re}function De(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Be(E){const q=E.target;q.removeEventListener("dispose",Be),Ze(q)}function Ze(E){F(E),y.remove(E)}function F(E){const q=y.get(E).programs;q!==void 0&&(q.forEach(function(ne){j.releaseProgram(ne)}),E.isShaderMaterial&&j.releaseShaderCache(E))}this.renderBufferDirect=function(E,q,ne,H,re,Re){q===null&&(q=de);const Fe=re.isMesh&&re.matrixWorld.determinant()<0,Ne=ph(E,q,ne,H,re);pe.setMaterial(H,Fe);let ke=ne.index,qe=1;H.wireframe===!0&&(ke=Z.getWireframeAttribute(ne),qe=2);const Ge=ne.drawRange,He=ne.attributes.position;let tt=Ge.start*qe,Lt=(Ge.start+Ge.count)*qe;Re!==null&&(tt=Math.max(tt,Re.start*qe),Lt=Math.min(Lt,(Re.start+Re.count)*qe)),ke!==null?(tt=Math.max(tt,0),Lt=Math.min(Lt,ke.count)):He!=null&&(tt=Math.max(tt,0),Lt=Math.min(Lt,He.count));const hn=Lt-tt;if(hn<0||hn===1/0)return;z.setup(re,H,Ne,ne,ke);let kn,nt=le;if(ke!==null&&(kn=I.get(ke),nt=_e,nt.setIndex(kn)),re.isMesh)H.wireframe===!0?(pe.setLineWidth(H.wireframeLinewidth*me()),nt.setMode(1)):nt.setMode(4);else if(re.isLine){let Ve=H.linewidth;Ve===void 0&&(Ve=1),pe.setLineWidth(Ve*me()),re.isLineSegments?nt.setMode(1):re.isLineLoop?nt.setMode(2):nt.setMode(3)}else re.isPoints?nt.setMode(0):re.isSprite&&nt.setMode(4);if(re.isInstancedMesh)nt.renderInstances(tt,hn,re.count);else if(ne.isInstancedBufferGeometry){const Ve=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Vr=Math.min(ne.instanceCount,Ve);nt.renderInstances(tt,hn,Vr)}else nt.render(tt,hn)},this.compile=function(E,q){function ne(H,re,Re){H.transparent===!0&&H.side===Dn&&H.forceSinglePass===!1?(H.side=Ot,H.needsUpdate=!0,Ut(H,re,Re),H.side=Un,H.needsUpdate=!0,Ut(H,re,Re),H.side=Dn):Ut(H,re,Re)}f=b.get(E),f.init(),g.push(f),E.traverseVisible(function(H){H.isLight&&H.layers.test(q.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),f.setupLights(p.physicallyCorrectLights),E.traverse(function(H){const re=H.material;if(re)if(Array.isArray(re))for(let Re=0;Re<re.length;Re++){const Fe=re[Re];ne(Fe,E,H)}else ne(re,E,H)}),g.pop(),f=null};let te=null;function fe(E){te&&te(E)}function Te(){Xe.stop()}function Pe(){Xe.start()}const Xe=new ju;Xe.setAnimationLoop(fe),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(E){te=E,be.setAnimationLoop(E),E===null?Xe.stop():Xe.start()},be.addEventListener("sessionstart",Te),be.addEventListener("sessionend",Pe),this.render=function(E,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(be.cameraAutoUpdate===!0&&be.updateCamera(q),q=be.getCamera()),E.isScene===!0&&E.onBeforeRender(p,E,q,v),f=b.get(E,g.length),f.init(),g.push(f),Me.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),ie.setFromProjectionMatrix(Me),ce=this.localClippingEnabled,X=_.init(this.clippingPlanes,ce),h=K.get(E,m.length),h.init(),m.push(h),ut(E,q,0,p.sortObjects),h.finish(),p.sortObjects===!0&&h.sort(ue,G),X===!0&&_.beginShadows();const ne=f.state.shadowsArray;if(D.render(ne,E,q),X===!0&&_.endShadows(),this.info.autoReset===!0&&this.info.reset(),Y.render(h,E),f.setupLights(p.physicallyCorrectLights),q.isArrayCamera){const H=q.cameras;for(let re=0,Re=H.length;re<Re;re++){const Fe=H[re];gt(h,E,Fe,Fe.viewport)}}else gt(h,E,q);v!==null&&(S.updateMultisampleRenderTarget(v),S.updateRenderTargetMipmap(v)),E.isScene===!0&&E.onAfterRender(p,E,q),z.resetDefaultState(),T=-1,w=null,g.pop(),g.length>0?f=g[g.length-1]:f=null,m.pop(),m.length>0?h=m[m.length-1]:h=null};function ut(E,q,ne,H){if(E.visible===!1)return;if(E.layers.test(q.layers)){if(E.isGroup)ne=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(q);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ie.intersectsSprite(E)){H&&oe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Me);const Fe=J.update(E),Ne=E.material;Ne.visible&&h.push(E,Fe,Ne,ne,oe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(E.isSkinnedMesh&&E.skeleton.frame!==Ie.render.frame&&(E.skeleton.update(),E.skeleton.frame=Ie.render.frame),!E.frustumCulled||ie.intersectsObject(E))){H&&oe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Me);const Fe=J.update(E),Ne=E.material;if(Array.isArray(Ne)){const ke=Fe.groups;for(let qe=0,Ge=ke.length;qe<Ge;qe++){const He=ke[qe],tt=Ne[He.materialIndex];tt&&tt.visible&&h.push(E,Fe,tt,ne,oe.z,He)}}else Ne.visible&&h.push(E,Fe,Ne,ne,oe.z,null)}}const Re=E.children;for(let Fe=0,Ne=Re.length;Fe<Ne;Fe++)ut(Re[Fe],q,ne,H)}function gt(E,q,ne,H){const re=E.opaque,Re=E.transmissive,Fe=E.transparent;f.setupLightsView(ne),X===!0&&_.setGlobalState(p.clippingPlanes,ne),Re.length>0&&Bn(re,q,ne),H&&pe.viewport(R.copy(H)),re.length>0&&Je(re,q,ne),Re.length>0&&Je(Re,q,ne),Fe.length>0&&Je(Fe,q,ne),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Bn(E,q,ne){const H=Ee.isWebGL2;he===null&&(he=new ui(1,1,{generateMipmaps:!0,type:Ae.has("EXT_color_buffer_half_float")?Is:li,minFilter:Ds,samples:H&&r===!0?4:0})),p.getDrawingBufferSize(V),H?he.setSize(V.x,V.y):he.setSize(ra(V.x),ra(V.y));const re=p.getRenderTarget();p.setRenderTarget(he),p.clear();const Re=p.toneMapping;p.toneMapping=Mn,Je(E,q,ne),p.toneMapping=Re,S.updateMultisampleRenderTarget(he),S.updateRenderTargetMipmap(he),p.setRenderTarget(re)}function Je(E,q,ne){const H=q.isScene===!0?q.overrideMaterial:null;for(let re=0,Re=E.length;re<Re;re++){const Fe=E[re],Ne=Fe.object,ke=Fe.geometry,qe=H===null?Fe.material:H,Ge=Fe.group;Ne.layers.test(ne.layers)&&un(Ne,q,ne,ke,qe,Ge)}}function un(E,q,ne,H,re,Re){E.onBeforeRender(p,q,ne,H,re,Re),E.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),re.onBeforeRender(p,q,ne,H,E,Re),re.transparent===!0&&re.side===Dn&&re.forceSinglePass===!1?(re.side=Ot,re.needsUpdate=!0,p.renderBufferDirect(ne,q,H,re,E,Re),re.side=Un,re.needsUpdate=!0,p.renderBufferDirect(ne,q,H,re,E,Re),re.side=Dn):p.renderBufferDirect(ne,q,H,re,E,Re),E.onAfterRender(p,q,ne,H,re,Re)}function Ut(E,q,ne){q.isScene!==!0&&(q=de);const H=y.get(E),re=f.state.lights,Re=f.state.shadowsArray,Fe=re.state.version,Ne=j.getParameters(E,re.state,Re,q,ne),ke=j.getProgramCacheKey(Ne);let qe=H.programs;H.environment=E.isMeshStandardMaterial?q.environment:null,H.fog=q.fog,H.envMap=(E.isMeshStandardMaterial?k:P).get(E.envMap||H.environment),qe===void 0&&(E.addEventListener("dispose",Be),qe=new Map,H.programs=qe);let Ge=qe.get(ke);if(Ge!==void 0){if(H.currentProgram===Ge&&H.lightsStateVersion===Fe)return Ha(E,Ne),Ge}else Ne.uniforms=j.getUniforms(E),E.onBuild(ne,Ne,p),E.onBeforeCompile(Ne,p),Ge=j.acquireProgram(Ne,ke),qe.set(ke,Ge),H.uniforms=Ne.uniforms;const He=H.uniforms;(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(He.clippingPlanes=_.uniform),Ha(E,Ne),H.needsLights=gh(E),H.lightsStateVersion=Fe,H.needsLights&&(He.ambientLightColor.value=re.state.ambient,He.lightProbe.value=re.state.probe,He.directionalLights.value=re.state.directional,He.directionalLightShadows.value=re.state.directionalShadow,He.spotLights.value=re.state.spot,He.spotLightShadows.value=re.state.spotShadow,He.rectAreaLights.value=re.state.rectArea,He.ltc_1.value=re.state.rectAreaLTC1,He.ltc_2.value=re.state.rectAreaLTC2,He.pointLights.value=re.state.point,He.pointLightShadows.value=re.state.pointShadow,He.hemisphereLights.value=re.state.hemi,He.directionalShadowMap.value=re.state.directionalShadowMap,He.directionalShadowMatrix.value=re.state.directionalShadowMatrix,He.spotShadowMap.value=re.state.spotShadowMap,He.spotLightMatrix.value=re.state.spotLightMatrix,He.spotLightMap.value=re.state.spotLightMap,He.pointShadowMap.value=re.state.pointShadowMap,He.pointShadowMatrix.value=re.state.pointShadowMatrix);const tt=Ge.getUniforms(),Lt=Mr.seqWithValue(tt.seq,He);return H.currentProgram=Ge,H.uniformsList=Lt,Ge}function Ha(E,q){const ne=y.get(E);ne.outputEncoding=q.outputEncoding,ne.instancing=q.instancing,ne.skinning=q.skinning,ne.morphTargets=q.morphTargets,ne.morphNormals=q.morphNormals,ne.morphColors=q.morphColors,ne.morphTargetsCount=q.morphTargetsCount,ne.numClippingPlanes=q.numClippingPlanes,ne.numIntersection=q.numClipIntersection,ne.vertexAlphas=q.vertexAlphas,ne.vertexTangents=q.vertexTangents,ne.toneMapping=q.toneMapping}function ph(E,q,ne,H,re){q.isScene!==!0&&(q=de),S.resetTextureUnits();const Re=q.fog,Fe=H.isMeshStandardMaterial?q.environment:null,Ne=v===null?p.outputEncoding:v.isXRRenderTarget===!0?v.texture.encoding:ci,ke=(H.isMeshStandardMaterial?k:P).get(H.envMap||Fe),qe=H.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,Ge=!!H.normalMap&&!!ne.attributes.tangent,He=!!ne.morphAttributes.position,tt=!!ne.morphAttributes.normal,Lt=!!ne.morphAttributes.color,hn=H.toneMapped?p.toneMapping:Mn,kn=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,nt=kn!==void 0?kn.length:0,Ve=y.get(H),Vr=f.state.lights;if(X===!0&&(ce===!0||E!==w)){const Pt=E===w&&H.id===T;_.setState(H,E,Pt)}let ht=!1;H.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Vr.state.version||Ve.outputEncoding!==Ne||re.isInstancedMesh&&Ve.instancing===!1||!re.isInstancedMesh&&Ve.instancing===!0||re.isSkinnedMesh&&Ve.skinning===!1||!re.isSkinnedMesh&&Ve.skinning===!0||Ve.envMap!==ke||H.fog===!0&&Ve.fog!==Re||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==_.numPlanes||Ve.numIntersection!==_.numIntersection)||Ve.vertexAlphas!==qe||Ve.vertexTangents!==Ge||Ve.morphTargets!==He||Ve.morphNormals!==tt||Ve.morphColors!==Lt||Ve.toneMapping!==hn||Ee.isWebGL2===!0&&Ve.morphTargetsCount!==nt)&&(ht=!0):(ht=!0,Ve.__version=H.version);let Gn=Ve.currentProgram;ht===!0&&(Gn=Ut(H,q,re));let Va=!1,ss=!1,Wr=!1;const yt=Gn.getUniforms(),Hn=Ve.uniforms;if(pe.useProgram(Gn.program)&&(Va=!0,ss=!0,Wr=!0),H.id!==T&&(T=H.id,ss=!0),Va||w!==E){if(yt.setValue(W,"projectionMatrix",E.projectionMatrix),Ee.logarithmicDepthBuffer&&yt.setValue(W,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),w!==E&&(w=E,ss=!0,Wr=!0),H.isShaderMaterial||H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshStandardMaterial||H.envMap){const Pt=yt.map.cameraPosition;Pt!==void 0&&Pt.setValue(W,oe.setFromMatrixPosition(E.matrixWorld))}(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&yt.setValue(W,"isOrthographic",E.isOrthographicCamera===!0),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial||H.isShadowMaterial||re.isSkinnedMesh)&&yt.setValue(W,"viewMatrix",E.matrixWorldInverse)}if(re.isSkinnedMesh){yt.setOptional(W,re,"bindMatrix"),yt.setOptional(W,re,"bindMatrixInverse");const Pt=re.skeleton;Pt&&(Ee.floatVertexTextures?(Pt.boneTexture===null&&Pt.computeBoneTexture(),yt.setValue(W,"boneTexture",Pt.boneTexture,S),yt.setValue(W,"boneTextureSize",Pt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const qr=ne.morphAttributes;if((qr.position!==void 0||qr.normal!==void 0||qr.color!==void 0&&Ee.isWebGL2===!0)&&Q.update(re,ne,H,Gn),(ss||Ve.receiveShadow!==re.receiveShadow)&&(Ve.receiveShadow=re.receiveShadow,yt.setValue(W,"receiveShadow",re.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Hn.envMap.value=ke,Hn.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),ss&&(yt.setValue(W,"toneMappingExposure",p.toneMappingExposure),Ve.needsLights&&mh(Hn,Wr),Re&&H.fog===!0&&ae.refreshFogUniforms(Hn,Re),ae.refreshMaterialUniforms(Hn,H,$,U,he),Mr.upload(W,Ve.uniformsList,Hn,S)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Mr.upload(W,Ve.uniformsList,Hn,S),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&yt.setValue(W,"center",re.center),yt.setValue(W,"modelViewMatrix",re.modelViewMatrix),yt.setValue(W,"normalMatrix",re.normalMatrix),yt.setValue(W,"modelMatrix",re.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Pt=H.uniformsGroups;for(let Xr=0,_h=Pt.length;Xr<_h;Xr++)if(Ee.isWebGL2){const Wa=Pt[Xr];xe.update(Wa,Gn),xe.bind(Wa,Gn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Gn}function mh(E,q){E.ambientLightColor.needsUpdate=q,E.lightProbe.needsUpdate=q,E.directionalLights.needsUpdate=q,E.directionalLightShadows.needsUpdate=q,E.pointLights.needsUpdate=q,E.pointLightShadows.needsUpdate=q,E.spotLights.needsUpdate=q,E.spotLightShadows.needsUpdate=q,E.rectAreaLights.needsUpdate=q,E.hemisphereLights.needsUpdate=q}function gh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(E,q,ne){y.get(E.texture).__webglTexture=q,y.get(E.depthTexture).__webglTexture=ne;const H=y.get(E);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=ne===void 0,H.__autoAllocateDepthBuffer||Ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,q){const ne=y.get(E);ne.__webglFramebuffer=q,ne.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(E,q=0,ne=0){v=E,x=q,A=ne;let H=!0,re=null,Re=!1,Fe=!1;if(E){const ke=y.get(E);ke.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(36160,null),H=!1):ke.__webglFramebuffer===void 0?S.setupRenderTarget(E):ke.__hasExternalTextures&&S.rebindTextures(E,y.get(E.texture).__webglTexture,y.get(E.depthTexture).__webglTexture);const qe=E.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Fe=!0);const Ge=y.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(re=Ge[q],Re=!0):Ee.isWebGL2&&E.samples>0&&S.useMultisampledRTT(E)===!1?re=y.get(E).__webglMultisampledFramebuffer:re=Ge,R.copy(E.viewport),O.copy(E.scissor),M=E.scissorTest}else R.copy(B).multiplyScalar($).floor(),O.copy(ee).multiplyScalar($).floor(),M=se;if(pe.bindFramebuffer(36160,re)&&Ee.drawBuffers&&H&&pe.drawBuffers(E,re),pe.viewport(R),pe.scissor(O),pe.setScissorTest(M),Re){const ke=y.get(E.texture);W.framebufferTexture2D(36160,36064,34069+q,ke.__webglTexture,ne)}else if(Fe){const ke=y.get(E.texture),qe=q||0;W.framebufferTextureLayer(36160,36064,ke.__webglTexture,ne||0,qe)}T=-1},this.readRenderTargetPixels=function(E,q,ne,H,re,Re,Fe){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=y.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Fe!==void 0&&(Ne=Ne[Fe]),Ne){pe.bindFramebuffer(36160,Ne);try{const ke=E.texture,qe=ke.format,Ge=ke.type;if(qe!==Zt&&C.convert(qe)!==W.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const He=Ge===Is&&(Ae.has("EXT_color_buffer_half_float")||Ee.isWebGL2&&Ae.has("EXT_color_buffer_float"));if(Ge!==li&&C.convert(Ge)!==W.getParameter(35738)&&!(Ge===ti&&(Ee.isWebGL2||Ae.has("OES_texture_float")||Ae.has("WEBGL_color_buffer_float")))&&!He){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=E.width-H&&ne>=0&&ne<=E.height-re&&W.readPixels(q,ne,H,re,C.convert(qe),C.convert(Ge),Re)}finally{const ke=v!==null?y.get(v).__webglFramebuffer:null;pe.bindFramebuffer(36160,ke)}}},this.copyFramebufferToTexture=function(E,q,ne=0){const H=Math.pow(2,-ne),re=Math.floor(q.image.width*H),Re=Math.floor(q.image.height*H);S.setTexture2D(q,0),W.copyTexSubImage2D(3553,ne,0,0,E.x,E.y,re,Re),pe.unbindTexture()},this.copyTextureToTexture=function(E,q,ne,H=0){const re=q.image.width,Re=q.image.height,Fe=C.convert(ne.format),Ne=C.convert(ne.type);S.setTexture2D(ne,0),W.pixelStorei(37440,ne.flipY),W.pixelStorei(37441,ne.premultiplyAlpha),W.pixelStorei(3317,ne.unpackAlignment),q.isDataTexture?W.texSubImage2D(3553,H,E.x,E.y,re,Re,Fe,Ne,q.image.data):q.isCompressedTexture?W.compressedTexSubImage2D(3553,H,E.x,E.y,q.mipmaps[0].width,q.mipmaps[0].height,Fe,q.mipmaps[0].data):W.texSubImage2D(3553,H,E.x,E.y,Fe,Ne,q.image),H===0&&ne.generateMipmaps&&W.generateMipmap(3553),pe.unbindTexture()},this.copyTextureToTexture3D=function(E,q,ne,H,re=0){if(p.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Re=E.max.x-E.min.x+1,Fe=E.max.y-E.min.y+1,Ne=E.max.z-E.min.z+1,ke=C.convert(H.format),qe=C.convert(H.type);let Ge;if(H.isData3DTexture)S.setTexture3D(H,0),Ge=32879;else if(H.isDataArrayTexture)S.setTexture2DArray(H,0),Ge=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}W.pixelStorei(37440,H.flipY),W.pixelStorei(37441,H.premultiplyAlpha),W.pixelStorei(3317,H.unpackAlignment);const He=W.getParameter(3314),tt=W.getParameter(32878),Lt=W.getParameter(3316),hn=W.getParameter(3315),kn=W.getParameter(32877),nt=ne.isCompressedTexture?ne.mipmaps[0]:ne.image;W.pixelStorei(3314,nt.width),W.pixelStorei(32878,nt.height),W.pixelStorei(3316,E.min.x),W.pixelStorei(3315,E.min.y),W.pixelStorei(32877,E.min.z),ne.isDataTexture||ne.isData3DTexture?W.texSubImage3D(Ge,re,q.x,q.y,q.z,Re,Fe,Ne,ke,qe,nt.data):ne.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),W.compressedTexSubImage3D(Ge,re,q.x,q.y,q.z,Re,Fe,Ne,ke,nt.data)):W.texSubImage3D(Ge,re,q.x,q.y,q.z,Re,Fe,Ne,ke,qe,nt),W.pixelStorei(3314,He),W.pixelStorei(32878,tt),W.pixelStorei(3316,Lt),W.pixelStorei(3315,hn),W.pixelStorei(32877,kn),re===0&&H.generateMipmaps&&W.generateMipmap(Ge),pe.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?S.setTextureCube(E,0):E.isData3DTexture?S.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?S.setTexture2DArray(E,0):S.setTexture2D(E,0),pe.unbindTexture()},this.resetState=function(){x=0,A=0,v=null,pe.reset(),z.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class Qx extends Qu{}Qx.prototype.isWebGL1Renderer=!0;class ev extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class cn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const r=i.length;let a;t?a=t:a=e*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);const u=i[s],f=i[s+1]-u,m=(a-u)/f;return(s+m)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=t||(a.isVector2?new ge:new N);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new N,s=[],r=[],a=[],o=new N,l=new st;for(let m=0;m<=e;m++){const g=m/e;s[m]=this.getTangentAt(g,new N)}r[0]=new N,a[0]=new N;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let m=1;m<=e;m++){if(r[m]=r[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(s[m-1],s[m]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(xt(s[m-1].dot(s[m]),-1,1));r[m].applyMatrix4(l.makeRotationAxis(o,g))}a[m].crossVectors(s[m],r[m])}if(t===!0){let m=Math.acos(xt(r[0].dot(r[e]),-1,1));m/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(m=-m);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],m*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ua extends cn{constructor(e=0,t=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const i=t||new ge,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,m=c-this.aY;l=f*u-m*h+this.aX,c=f*h+m*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class tv extends Ua{constructor(e,t,i,s,r,a){super(e,t,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function za(){let n=0,e=0,t=0,i=0;function s(r,a,o,l){n=r,e=o,t=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,h){let f=(a-r)/c-(o-r)/(c+u)+(o-a)/u,m=(o-a)/u-(l-a)/(u+h)+(l-o)/h;f*=u,m*=u,s(a,o,f,m)},calc:function(r){const a=r*r,o=a*r;return n+e*r+t*a+i*o}}}const fr=new N,Oo=new za,No=new za,Uo=new za;class nv extends cn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new N){const i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(fr.subVectors(s[0],s[1]).add(s[0]),c=fr);const h=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(fr.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=fr),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),m),p=Math.pow(h.distanceToSquared(f),m),d=Math.pow(f.distanceToSquared(u),m);p<1e-4&&(p=1),g<1e-4&&(g=p),d<1e-4&&(d=p),Oo.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,p,d),No.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,p,d),Uo.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,p,d)}else this.curveType==="catmullrom"&&(Oo.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),No.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),Uo.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(Oo.calc(l),No.calc(l),Uo.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Lc(n,e,t,i,s){const r=(i-e)*.5,a=(s-t)*.5,o=n*n,l=n*o;return(2*t-2*i+r+a)*l+(-3*t+3*i-2*r-a)*o+r*n+t}function iv(n,e){const t=1-n;return t*t*e}function sv(n,e){return 2*(1-n)*n*e}function rv(n,e){return n*n*e}function Ss(n,e,t,i){return iv(n,e)+sv(n,t)+rv(n,i)}function ov(n,e){const t=1-n;return t*t*t*e}function av(n,e){const t=1-n;return 3*t*t*n*e}function lv(n,e){return 3*(1-n)*n*n*e}function cv(n,e){return n*n*n*e}function ws(n,e,t,i,s){return ov(n,e)+av(n,t)+lv(n,i)+cv(n,s)}class eh extends cn{constructor(e=new ge,t=new ge,i=new ge,s=new ge){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new ge){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ws(e,s.x,r.x,a.x,o.x),ws(e,s.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class uv extends cn{constructor(e=new N,t=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new N){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(ws(e,s.x,r.x,a.x,o.x),ws(e,s.y,r.y,a.y,o.y),ws(e,s.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ba extends cn{constructor(e=new ge,t=new ge){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ge){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t){const i=t||new ge;return i.copy(this.v2).sub(this.v1).normalize(),i}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class hv extends cn{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class th extends cn{constructor(e=new ge,t=new ge,i=new ge){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ge){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(Ss(e,s.x,r.x,a.x),Ss(e,s.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class fv extends cn{constructor(e=new N,t=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new N){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(Ss(e,s.x,r.x,a.x),Ss(e,s.y,r.y,a.y),Ss(e,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nh extends cn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ge){const i=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],h=s[a>s.length-3?s.length-1:a+2];return i.set(Lc(o,l.x,c.x,u.x,h.x),Lc(o,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new ge().fromArray(s))}return this}}var ih=Object.freeze({__proto__:null,ArcCurve:tv,CatmullRomCurve3:nv,CubicBezierCurve:eh,CubicBezierCurve3:uv,EllipseCurve:Ua,LineCurve:Ba,LineCurve3:hv,QuadraticBezierCurve:th,QuadraticBezierCurve3:fv,SplineCurve:nh});class dv extends cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new Ba(t,e))}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new ih[s.type]().fromJSON(s))}return this}}class aa extends dv{constructor(e){super(),this.type="Path",this.currentPoint=new ge,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Ba(this.currentPoint.clone(),new ge(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new th(this.currentPoint.clone(),new ge(e,t),new ge(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,a){const o=new eh(this.currentPoint.clone(),new ge(e,t),new ge(i,s),new ge(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new nh(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,s,r,a),this}absarc(e,t,i,s,r,a){return this.absellipse(e,t,i,i,s,r,a),this}ellipse(e,t,i,s,r,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,s,r,a,o,l),this}absellipse(e,t,i,s,r,a,o,l){const c=new Ua(e,t,i,s,r,a,o,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class br extends aa{constructor(e){super(e),this.uuid=ts(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new aa().fromJSON(s))}return this}}const pv={triangulate:function(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let r=sh(n,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,u,h,f,m;if(i&&(r=vv(n,e,r,t)),n.length>80*t){o=c=n[0],l=u=n[1];for(let g=t;g<s;g+=t)h=n[g],f=n[g+1],h<o&&(o=h),f<l&&(l=f),h>c&&(c=h),f>u&&(u=f);m=Math.max(c-o,u-l),m=m!==0?32767/m:0}return Os(r,a,t,o,l,m,0),a}};function sh(n,e,t,i,s){let r,a;if(s===Pv(n,e,t,i)>0)for(r=e;r<t;r+=i)a=Pc(r,n[r],n[r+1],a);else for(r=t-i;r>=e;r-=i)a=Pc(r,n[r],n[r+1],a);return a&&Hr(a,a.next)&&(Us(a),a=a.next),a}function di(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Hr(t,t.next)||et(t.prev,t,t.next)===0)){if(Us(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Os(n,e,t,i,s,r,a){if(!n)return;!a&&r&&wv(n,i,s,r);let o=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,r?gv(n,i,s,r):mv(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(c.i/t|0),Us(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=_v(di(n),e,t),Os(n,e,t,i,s,r,2)):a===2&&xv(n,e,t,i,s,r):Os(di(n),e,t,i,s,r,1);break}}}function mv(n){const e=n.prev,t=n,i=n.next;if(et(e,t,i)>=0)return!1;const s=e.x,r=t.x,a=i.x,o=e.y,l=t.y,c=i.y,u=s<r?s<a?s:a:r<a?r:a,h=o<l?o<c?o:c:l<c?l:c,f=s>r?s>a?s:a:r>a?r:a,m=o>l?o>c?o:c:l>c?l:c;let g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=m&&Ui(s,o,r,l,a,c,g.x,g.y)&&et(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function gv(n,e,t,i){const s=n.prev,r=n,a=n.next;if(et(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,u=s.y,h=r.y,f=a.y,m=o<l?o<c?o:c:l<c?l:c,g=u<h?u<f?u:f:h<f?h:f,p=o>l?o>c?o:c:l>c?l:c,d=u>h?u>f?u:f:h>f?h:f,x=la(m,g,e,t,i),A=la(p,d,e,t,i);let v=n.prevZ,T=n.nextZ;for(;v&&v.z>=x&&T&&T.z<=A;){if(v.x>=m&&v.x<=p&&v.y>=g&&v.y<=d&&v!==s&&v!==a&&Ui(o,u,l,h,c,f,v.x,v.y)&&et(v.prev,v,v.next)>=0||(v=v.prevZ,T.x>=m&&T.x<=p&&T.y>=g&&T.y<=d&&T!==s&&T!==a&&Ui(o,u,l,h,c,f,T.x,T.y)&&et(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;v&&v.z>=x;){if(v.x>=m&&v.x<=p&&v.y>=g&&v.y<=d&&v!==s&&v!==a&&Ui(o,u,l,h,c,f,v.x,v.y)&&et(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;T&&T.z<=A;){if(T.x>=m&&T.x<=p&&T.y>=g&&T.y<=d&&T!==s&&T!==a&&Ui(o,u,l,h,c,f,T.x,T.y)&&et(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function _v(n,e,t){let i=n;do{const s=i.prev,r=i.next.next;!Hr(s,r)&&rh(s,i,i.next,r)&&Ns(s,r)&&Ns(r,s)&&(e.push(s.i/t|0),e.push(i.i/t|0),e.push(r.i/t|0),Us(i),Us(i.next),i=n=r),i=i.next}while(i!==n);return di(i)}function xv(n,e,t,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Av(a,o)){let l=oh(a,o);a=di(a,a.next),l=di(l,l.next),Os(a,e,t,i,s,r,0),Os(l,e,t,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function vv(n,e,t,i){const s=[];let r,a,o,l,c;for(r=0,a=e.length;r<a;r++)o=e[r]*i,l=r<a-1?e[r+1]*i:n.length,c=sh(n,o,l,i,!1),c===c.next&&(c.steiner=!0),s.push(Ev(c));for(s.sort(yv),r=0;r<s.length;r++)t=Mv(s[r],t);return t}function yv(n,e){return n.x-e.x}function Mv(n,e){const t=bv(n,e);if(!t)return e;const i=oh(t,n);return di(i,i.next),di(t,t.next)}function bv(n,e){let t=e,i=-1/0,s;const r=n.x,a=n.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const f=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=r&&f>i&&(i=f,s=t.x<t.next.x?t:t.next,f===r))return s}t=t.next}while(t!==e);if(!s)return null;const o=s,l=s.x,c=s.y;let u=1/0,h;t=s;do r>=t.x&&t.x>=l&&r!==t.x&&Ui(a<c?r:i,a,l,c,a<c?i:r,a,t.x,t.y)&&(h=Math.abs(a-t.y)/(r-t.x),Ns(t,n)&&(h<u||h===u&&(t.x>s.x||t.x===s.x&&Sv(s,t)))&&(s=t,u=h)),t=t.next;while(t!==o);return s}function Sv(n,e){return et(n.prev,n,e.prev)<0&&et(e.next,n,n.next)<0}function wv(n,e,t,i){let s=n;do s.z===0&&(s.z=la(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Tv(s)}function Tv(n){let e,t,i,s,r,a,o,l,c=1;do{for(t=n,n=null,r=null,a=0;t;){for(a++,i=t,o=0,e=0;e<c&&(o++,i=i.nextZ,!!i);e++);for(l=c;o>0||l>0&&i;)o!==0&&(l===0||!i||t.z<=i.z)?(s=t,t=t.nextZ,o--):(s=i,i=i.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;t=i}r.nextZ=null,c*=2}while(a>1);return n}function la(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Ev(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Ui(n,e,t,i,s,r,a,o){return(s-a)*(e-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(i-o)}function Av(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Cv(n,e)&&(Ns(n,e)&&Ns(e,n)&&Lv(n,e)&&(et(n.prev,n,e.prev)||et(n,e.prev,e))||Hr(n,e)&&et(n.prev,n,n.next)>0&&et(e.prev,e,e.next)>0)}function et(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Hr(n,e){return n.x===e.x&&n.y===e.y}function rh(n,e,t,i){const s=pr(et(n,e,t)),r=pr(et(n,e,i)),a=pr(et(t,i,n)),o=pr(et(t,i,e));return!!(s!==r&&a!==o||s===0&&dr(n,t,e)||r===0&&dr(n,i,e)||a===0&&dr(t,n,i)||o===0&&dr(t,e,i))}function dr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function pr(n){return n>0?1:n<0?-1:0}function Cv(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&rh(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Ns(n,e){return et(n.prev,n,n.next)<0?et(n,e,n.next)>=0&&et(n,n.prev,e)>=0:et(n,e,n.prev)<0||et(n,n.next,e)<0}function Lv(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function oh(n,e){const t=new ca(n.i,n.x,n.y),i=new ca(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Pc(n,e,t,i){const s=new ca(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Us(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function ca(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Pv(n,e,t,i){let s=0;for(let r=e,a=t-i;r<t;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}class Vi{static area(e){const t=e.length;let i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return Vi.area(e)<0}static triangulateShape(e,t){const i=[],s=[],r=[];Rc(e),Dc(i,e);let a=e.length;t.forEach(Rc);for(let l=0;l<t.length;l++)s.push(a),a+=t[l].length,Dc(i,t[l]);const o=pv.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Rc(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Dc(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class ka extends zn{constructor(e=new br([new ge(.5,.5),new ge(-.5,.5),new ge(-.5,-.5),new ge(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,s=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new bn(s,3)),this.setAttribute("uv",new bn(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,h=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,m=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:m-.1,p=t.bevelOffset!==void 0?t.bevelOffset:0,d=t.bevelSegments!==void 0?t.bevelSegments:3;const x=t.extrudePath,A=t.UVGenerator!==void 0?t.UVGenerator:Rv;let v,T=!1,w,R,O,M;x&&(v=x.getSpacedPoints(u),T=!0,f=!1,w=x.computeFrenetFrames(u,!1),R=new N,O=new N,M=new N),f||(d=0,m=0,g=0,p=0);const L=o.extractPoints(c);let U=L.shape;const $=L.holes;if(!Vi.isClockWise(U)){U=U.reverse();for(let y=0,S=$.length;y<S;y++){const P=$[y];Vi.isClockWise(P)&&($[y]=P.reverse())}}const G=Vi.triangulateShape(U,$),B=U;for(let y=0,S=$.length;y<S;y++){const P=$[y];U=U.concat(P)}function ee(y,S,P){return S||console.error("THREE.ExtrudeGeometry: vec does not exist"),S.clone().multiplyScalar(P).add(y)}const se=U.length,ie=G.length;function X(y,S,P){let k,I,Z;const J=y.x-S.x,j=y.y-S.y,ae=P.x-y.x,K=P.y-y.y,b=J*J+j*j,_=J*K-j*ae;if(Math.abs(_)>Number.EPSILON){const D=Math.sqrt(b),Y=Math.sqrt(ae*ae+K*K),Q=S.x-j/D,le=S.y+J/D,_e=P.x-K/Y,C=P.y+ae/Y,z=((_e-Q)*K-(C-le)*ae)/(J*K-j*ae);k=Q+J*z-y.x,I=le+j*z-y.y;const xe=k*k+I*I;if(xe<=2)return new ge(k,I);Z=Math.sqrt(xe/2)}else{let D=!1;J>Number.EPSILON?ae>Number.EPSILON&&(D=!0):J<-Number.EPSILON?ae<-Number.EPSILON&&(D=!0):Math.sign(j)===Math.sign(K)&&(D=!0),D?(k=-j,I=J,Z=Math.sqrt(b)):(k=J,I=j,Z=Math.sqrt(b/2))}return new ge(k/Z,I/Z)}const ce=[];for(let y=0,S=B.length,P=S-1,k=y+1;y<S;y++,P++,k++)P===S&&(P=0),k===S&&(k=0),ce[y]=X(B[y],B[P],B[k]);const he=[];let Me,V=ce.concat();for(let y=0,S=$.length;y<S;y++){const P=$[y];Me=[];for(let k=0,I=P.length,Z=I-1,J=k+1;k<I;k++,Z++,J++)Z===I&&(Z=0),J===I&&(J=0),Me[k]=X(P[k],P[Z],P[J]);he.push(Me),V=V.concat(Me)}for(let y=0;y<d;y++){const S=y/d,P=m*Math.cos(S*Math.PI/2),k=g*Math.sin(S*Math.PI/2)+p;for(let I=0,Z=B.length;I<Z;I++){const J=ee(B[I],ce[I],k);Ce(J.x,J.y,-P)}for(let I=0,Z=$.length;I<Z;I++){const J=$[I];Me=he[I];for(let j=0,ae=J.length;j<ae;j++){const K=ee(J[j],Me[j],k);Ce(K.x,K.y,-P)}}}const oe=g+p;for(let y=0;y<se;y++){const S=f?ee(U[y],V[y],oe):U[y];T?(O.copy(w.normals[0]).multiplyScalar(S.x),R.copy(w.binormals[0]).multiplyScalar(S.y),M.copy(v[0]).add(O).add(R),Ce(M.x,M.y,M.z)):Ce(S.x,S.y,0)}for(let y=1;y<=u;y++)for(let S=0;S<se;S++){const P=f?ee(U[S],V[S],oe):U[S];T?(O.copy(w.normals[y]).multiplyScalar(P.x),R.copy(w.binormals[y]).multiplyScalar(P.y),M.copy(v[y]).add(O).add(R),Ce(M.x,M.y,M.z)):Ce(P.x,P.y,h/u*y)}for(let y=d-1;y>=0;y--){const S=y/d,P=m*Math.cos(S*Math.PI/2),k=g*Math.sin(S*Math.PI/2)+p;for(let I=0,Z=B.length;I<Z;I++){const J=ee(B[I],ce[I],k);Ce(J.x,J.y,h+P)}for(let I=0,Z=$.length;I<Z;I++){const J=$[I];Me=he[I];for(let j=0,ae=J.length;j<ae;j++){const K=ee(J[j],Me[j],k);T?Ce(K.x,K.y+v[u-1].y,v[u-1].x+P):Ce(K.x,K.y,h+P)}}}de(),me();function de(){const y=s.length/3;if(f){let S=0,P=se*S;for(let k=0;k<ie;k++){const I=G[k];Ae(I[2]+P,I[1]+P,I[0]+P)}S=u+d*2,P=se*S;for(let k=0;k<ie;k++){const I=G[k];Ae(I[0]+P,I[1]+P,I[2]+P)}}else{for(let S=0;S<ie;S++){const P=G[S];Ae(P[2],P[1],P[0])}for(let S=0;S<ie;S++){const P=G[S];Ae(P[0]+se*u,P[1]+se*u,P[2]+se*u)}}i.addGroup(y,s.length/3-y,0)}function me(){const y=s.length/3;let S=0;W(B,S),S+=B.length;for(let P=0,k=$.length;P<k;P++){const I=$[P];W(I,S),S+=I.length}i.addGroup(y,s.length/3-y,1)}function W(y,S){let P=y.length;for(;--P>=0;){const k=P;let I=P-1;I<0&&(I=y.length-1);for(let Z=0,J=u+d*2;Z<J;Z++){const j=se*Z,ae=se*(Z+1),K=S+k+j,b=S+I+j,_=S+I+ae,D=S+k+ae;Ee(K,b,_,D)}}}function Ce(y,S,P){l.push(y),l.push(S),l.push(P)}function Ae(y,S,P){pe(y),pe(S),pe(P);const k=s.length/3,I=A.generateTopUV(i,s,k-3,k-2,k-1);Ie(I[0]),Ie(I[1]),Ie(I[2])}function Ee(y,S,P,k){pe(y),pe(S),pe(k),pe(S),pe(P),pe(k);const I=s.length/3,Z=A.generateSideWallUV(i,s,I-6,I-3,I-2,I-1);Ie(Z[0]),Ie(Z[1]),Ie(Z[3]),Ie(Z[1]),Ie(Z[2]),Ie(Z[3])}function pe(y){s.push(l[y*3+0]),s.push(l[y*3+1]),s.push(l[y*3+2])}function Ie(y){r.push(y.x),r.push(y.y)}}}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Dv(t,i,e)}static fromJSON(e,t){const i=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];i.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new ih[s.type]().fromJSON(s)),new ka(i,e.options)}}const Rv={generateTopUV:function(n,e,t,i,s){const r=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[s*3],u=e[s*3+1];return[new ge(r,a),new ge(o,l),new ge(c,u)]},generateSideWallUV:function(n,e,t,i,s,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],h=e[i*3+2],f=e[s*3],m=e[s*3+1],g=e[s*3+2],p=e[r*3],d=e[r*3+1],x=e[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new ge(a,1-l),new ge(c,1-h),new ge(f,1-g),new ge(p,1-x)]:[new ge(o,1-l),new ge(u,1-h),new ge(m,1-g),new ge(d,1-x)]}};function Dv(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class ah extends Bs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fu,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Ic={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class Iv{constructor(e,t,i){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const m=c[h],g=c[h+1];if(m.global&&(m.lastIndex=0),m.test(u))return g}return null}}}const Fv=new Iv;class lh{constructor(e){this.manager=e!==void 0?e:Fv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const _n={};class Ov extends Error{constructor(e,t){super(e),this.response=t}}class Nv extends lh{constructor(e){super(e)}load(e,t,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ic.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(_n[e]!==void 0){_n[e].push({onLoad:t,onProgress:i,onError:s});return}_n[e]=[],_n[e].push({onLoad:t,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=_n[e],h=c.body.getReader(),f=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),m=f?parseInt(f):0,g=m!==0;let p=0;const d=new ReadableStream({start(x){A();function A(){h.read().then(({done:v,value:T})=>{if(v)x.close();else{p+=T.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:p,total:m});for(let R=0,O=u.length;R<O;R++){const M=u[R];M.onProgress&&M.onProgress(w)}x.enqueue(T),A()}})}}});return new Response(d)}else throw new Ov(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,m=new TextDecoder(f);return c.arrayBuffer().then(g=>m.decode(g))}}}).then(c=>{Ic.add(e,c);const u=_n[e];delete _n[e];for(let h=0,f=u.length;h<f;h++){const m=u[h];m.onLoad&&m.onLoad(c)}}).catch(c=>{const u=_n[e];if(u===void 0)throw this.manager.itemError(e),c;delete _n[e];for(let h=0,f=u.length;h<f;h++){const m=u[h];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class ch extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Uv extends ch{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const zo=new st,Fc=new N,Oc=new N;class zv{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fa,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Fc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fc),Oc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Oc),t.updateMatrixWorld(),zo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(zo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Bv extends zv{constructor(){super(new Yu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class kv extends ch{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new Bv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Gv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Nc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Nc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Nc(){return(typeof performance>"u"?Date:performance).now()}class Uc{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(xt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Hv{constructor(){this.type="ShapePath",this.color=new je,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new aa,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,i,s){return this.currentPath.quadraticCurveTo(e,t,i,s),this}bezierCurveTo(e,t,i,s,r,a){return this.currentPath.bezierCurveTo(e,t,i,s,r,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(x){const A=[];for(let v=0,T=x.length;v<T;v++){const w=x[v],R=new br;R.curves=w.curves,A.push(R)}return A}function i(x,A){const v=A.length;let T=!1;for(let w=v-1,R=0;R<v;w=R++){let O=A[w],M=A[R],L=M.x-O.x,U=M.y-O.y;if(Math.abs(U)>Number.EPSILON){if(U<0&&(O=A[R],L=-L,M=A[w],U=-U),x.y<O.y||x.y>M.y)continue;if(x.y===O.y){if(x.x===O.x)return!0}else{const $=U*(x.x-O.x)-L*(x.y-O.y);if($===0)return!0;if($<0)continue;T=!T}}else{if(x.y!==O.y)continue;if(M.x<=x.x&&x.x<=O.x||O.x<=x.x&&x.x<=M.x)return!0}}return T}const s=Vi.isClockWise,r=this.subPaths;if(r.length===0)return[];let a,o,l;const c=[];if(r.length===1)return o=r[0],l=new br,l.curves=o.curves,c.push(l),c;let u=!s(r[0].getPoints());u=e?!u:u;const h=[],f=[];let m=[],g=0,p;f[g]=void 0,m[g]=[];for(let x=0,A=r.length;x<A;x++)o=r[x],p=o.getPoints(),a=s(p),a=e?!a:a,a?(!u&&f[g]&&g++,f[g]={s:new br,p},f[g].s.curves=o.curves,u&&g++,m[g]=[]):m[g].push({h:o,p:p[0]});if(!f[0])return t(r);if(f.length>1){let x=!1,A=0;for(let v=0,T=f.length;v<T;v++)h[v]=[];for(let v=0,T=f.length;v<T;v++){const w=m[v];for(let R=0;R<w.length;R++){const O=w[R];let M=!0;for(let L=0;L<f.length;L++)i(O.p,f[L].p)&&(v!==L&&A++,M?(M=!1,h[L].push(O)):x=!0);M&&h[v].push(O)}}A>0&&x===!1&&(m=h)}let d;for(let x=0,A=f.length;x<A;x++){l=f[x].s,c.push(l),d=m[x];for(let v=0,T=d.length;v<T;v++)l.holes.push(d[v].h)}return c}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Da}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Da);var Wi={Linear:{None:function(n){return n}},Quadratic:{In:function(n){return n*n},Out:function(n){return n*(2-n)},InOut:function(n){return(n*=2)<1?.5*n*n:-.5*(--n*(n-2)-1)}},Cubic:{In:function(n){return n*n*n},Out:function(n){return--n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n:.5*((n-=2)*n*n+2)}},Quartic:{In:function(n){return n*n*n*n},Out:function(n){return 1- --n*n*n*n},InOut:function(n){return(n*=2)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2)}},Quintic:{In:function(n){return n*n*n*n*n},Out:function(n){return--n*n*n*n*n+1},InOut:function(n){return(n*=2)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2)}},Sinusoidal:{In:function(n){return 1-Math.cos(n*Math.PI/2)},Out:function(n){return Math.sin(n*Math.PI/2)},InOut:function(n){return .5*(1-Math.cos(Math.PI*n))}},Exponential:{In:function(n){return n===0?0:Math.pow(1024,n-1)},Out:function(n){return n===1?1:1-Math.pow(2,-10*n)},InOut:function(n){return n===0?0:n===1?1:(n*=2)<1?.5*Math.pow(1024,n-1):.5*(-Math.pow(2,-10*(n-1))+2)}},Circular:{In:function(n){return 1-Math.sqrt(1-n*n)},Out:function(n){return Math.sqrt(1- --n*n)},InOut:function(n){return(n*=2)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1)}},Elastic:{In:function(n){return n===0?0:n===1?1:-Math.pow(2,10*(n-1))*Math.sin((n-1.1)*5*Math.PI)},Out:function(n){return n===0?0:n===1?1:Math.pow(2,-10*n)*Math.sin((n-.1)*5*Math.PI)+1},InOut:function(n){return n===0?0:n===1?1:(n*=2,n<1?-.5*Math.pow(2,10*(n-1))*Math.sin((n-1.1)*5*Math.PI):.5*Math.pow(2,-10*(n-1))*Math.sin((n-1.1)*5*Math.PI)+1)}},Back:{In:function(n){var e=1.70158;return n*n*((e+1)*n-e)},Out:function(n){var e=1.70158;return--n*n*((e+1)*n+e)+1},InOut:function(n){var e=2.5949095;return(n*=2)<1?.5*(n*n*((e+1)*n-e)):.5*((n-=2)*n*((e+1)*n+e)+2)}},Bounce:{In:function(n){return 1-Wi.Bounce.Out(1-n)},Out:function(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},InOut:function(n){return n<.5?Wi.Bounce.In(n*2)*.5:Wi.Bounce.Out(n*2-1)*.5+.5}}},_s;typeof self>"u"&&typeof process<"u"&&process.hrtime?_s=function(){var n=process.hrtime();return n[0]*1e3+n[1]/1e6}:typeof self<"u"&&self.performance!==void 0&&self.performance.now!==void 0?_s=self.performance.now.bind(self.performance):Date.now!==void 0?_s=Date.now:_s=function(){return new Date().getTime()};var Ii=_s,Vv=function(){function n(){this._tweens={},this._tweensAddedDuringUpdate={}}return n.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(t){return e._tweens[t]})},n.prototype.removeAll=function(){this._tweens={}},n.prototype.add=function(e){this._tweens[e.getId()]=e,this._tweensAddedDuringUpdate[e.getId()]=e},n.prototype.remove=function(e){delete this._tweens[e.getId()],delete this._tweensAddedDuringUpdate[e.getId()]},n.prototype.update=function(e,t){e===void 0&&(e=Ii()),t===void 0&&(t=!1);var i=Object.keys(this._tweens);if(i.length===0)return!1;for(;i.length>0;){this._tweensAddedDuringUpdate={};for(var s=0;s<i.length;s++){var r=this._tweens[i[s]],a=!t;r&&r.update(e,a)===!1&&!t&&delete this._tweens[i[s]]}i=Object.keys(this._tweensAddedDuringUpdate)}return!0},n}(),xs={Linear:function(n,e){var t=n.length-1,i=t*e,s=Math.floor(i),r=xs.Utils.Linear;return e<0?r(n[0],n[1],i):e>1?r(n[t],n[t-1],t-i):r(n[s],n[s+1>t?t:s+1],i-s)},Bezier:function(n,e){for(var t=0,i=n.length-1,s=Math.pow,r=xs.Utils.Bernstein,a=0;a<=i;a++)t+=s(1-e,i-a)*s(e,a)*n[a]*r(i,a);return t},CatmullRom:function(n,e){var t=n.length-1,i=t*e,s=Math.floor(i),r=xs.Utils.CatmullRom;return n[0]===n[t]?(e<0&&(s=Math.floor(i=t*(1+e))),r(n[(s-1+t)%t],n[s],n[(s+1)%t],n[(s+2)%t],i-s)):e<0?n[0]-(r(n[0],n[0],n[1],n[1],-i)-n[0]):e>1?n[t]-(r(n[t],n[t],n[t-1],n[t-1],i-t)-n[t]):r(n[s?s-1:0],n[s],n[t<s+1?t:s+1],n[t<s+2?t:s+2],i-s)},Utils:{Linear:function(n,e,t){return(e-n)*t+n},Bernstein:function(n,e){var t=xs.Utils.Factorial;return t(n)/t(e)/t(n-e)},Factorial:function(){var n=[1];return function(e){var t=1;if(n[e])return n[e];for(var i=e;i>1;i--)t*=i;return n[e]=t,t}}(),CatmullRom:function(n,e,t,i,s){var r=(t-n)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*t+r+a)*l+(-3*e+3*t-2*r-a)*o+r*s+e}}},uh=function(){function n(){}return n.nextId=function(){return n._nextId++},n._nextId=0,n}(),hh=new Vv,fh=function(){function n(e,t){t===void 0&&(t=hh),this._object=e,this._group=t,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=Wi.Linear.None,this._interpolationFunction=xs.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._id=uh.nextId(),this._isChainStopped=!1,this._goToEnd=!1}return n.prototype.getId=function(){return this._id},n.prototype.isPlaying=function(){return this._isPlaying},n.prototype.isPaused=function(){return this._isPaused},n.prototype.to=function(e,t){return this._valuesEnd=Object.create(e),t!==void 0&&(this._duration=t),this},n.prototype.duration=function(e){return this._duration=e,this},n.prototype.start=function(e){if(this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var t in this._valuesStartRepeat)this._swapEndStartRepeatValues(t),this._valuesStart[t]=this._valuesStartRepeat[t]}return this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e!==void 0?typeof e=="string"?Ii()+parseFloat(e):e:Ii(),this._startTime+=this._delayTime,this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat),this},n.prototype._setupProperties=function(e,t,i,s){for(var r in i){var a=e[r],o=Array.isArray(a),l=o?"array":typeof a,c=!o&&Array.isArray(i[r]);if(!(l==="undefined"||l==="function")){if(c){var u=i[r];if(u.length===0)continue;u=u.map(this._handleRelativeValue.bind(this,a)),i[r]=[a].concat(u)}if((l==="object"||o)&&a&&!c){t[r]=o?[]:{};for(var h in a)t[r][h]=a[h];s[r]=o?[]:{},this._setupProperties(a,t[r],i[r],s[r])}else typeof t[r]>"u"&&(t[r]=a),o||(t[r]*=1),c?s[r]=i[r].slice().reverse():s[r]=t[r]||0}}},n.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},n.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},n.prototype.pause=function(e){return e===void 0&&(e=Ii()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this._group&&this._group.remove(this),this)},n.prototype.resume=function(e){return e===void 0&&(e=Ii()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},n.prototype.stopChainedTweens=function(){for(var e=0,t=this._chainedTweens.length;e<t;e++)this._chainedTweens[e].stop();return this},n.prototype.group=function(e){return this._group=e,this},n.prototype.delay=function(e){return this._delayTime=e,this},n.prototype.repeat=function(e){return this._initialRepeat=e,this._repeat=e,this},n.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},n.prototype.yoyo=function(e){return this._yoyo=e,this},n.prototype.easing=function(e){return this._easingFunction=e,this},n.prototype.interpolation=function(e){return this._interpolationFunction=e,this},n.prototype.chain=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._chainedTweens=e,this},n.prototype.onStart=function(e){return this._onStartCallback=e,this},n.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},n.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},n.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},n.prototype.onStop=function(e){return this._onStopCallback=e,this},n.prototype.update=function(e,t){if(e===void 0&&(e=Ii()),t===void 0&&(t=!0),this._isPaused)return!0;var i,s,r=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(e>r)return!1;t&&this.start(e)}if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),s=(e-this._startTime)/this._duration,s=this._duration===0||s>1?1:s;var a=this._easingFunction(s);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,a),this._onUpdateCallback&&this._onUpdateCallback(this._object,s),s===1)if(this._repeat>0){isFinite(this._repeat)&&this._repeat--;for(i in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[i]=="string"&&(this._valuesStartRepeat[i]=this._valuesStartRepeat[i]+parseFloat(this._valuesEnd[i])),this._yoyo&&this._swapEndStartRepeatValues(i),this._valuesStart[i]=this._valuesStartRepeat[i];return this._yoyo&&(this._reversed=!this._reversed),this._repeatDelayTime!==void 0?this._startTime=e+this._repeatDelayTime:this._startTime=e+this._delayTime,this._onRepeatCallback&&this._onRepeatCallback(this._object),!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var o=0,l=this._chainedTweens.length;o<l;o++)this._chainedTweens[o].start(this._startTime+this._duration);return this._isPlaying=!1,!1}return!0},n.prototype._updateProperties=function(e,t,i,s){for(var r in i)if(t[r]!==void 0){var a=t[r]||0,o=i[r],l=Array.isArray(e[r]),c=Array.isArray(o),u=!l&&c;u?e[r]=this._interpolationFunction(o,s):typeof o=="object"&&o?this._updateProperties(e[r],a,o,s):(o=this._handleRelativeValue(a,o),typeof o=="number"&&(e[r]=a+(o-a)*s))}},n.prototype._handleRelativeValue=function(e,t){return typeof t!="string"?t:t.charAt(0)==="+"||t.charAt(0)==="-"?e+parseFloat(t):parseFloat(t)},n.prototype._swapEndStartRepeatValues=function(e){var t=this._valuesStartRepeat[e],i=this._valuesEnd[e];typeof i=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(i):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=t},n}();uh.nextId;var ln=hh;ln.getAll.bind(ln);ln.removeAll.bind(ln);ln.add.bind(ln);ln.remove.bind(ln);var Wv=ln.update.bind(ln);const zc={type:"change"},Bo={type:"start"},Bc={type:"end"};class qv extends mi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:gi.ROTATE,MIDDLE:gi.DOLLY,RIGHT:gi.PAN},this.touches={ONE:_i.ROTATE,TWO:_i.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(C){C.addEventListener("keydown",K),this._domElementKeyEvents=C},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(zc),i.update(),r=s.NONE},this.update=function(){const C=new N,z=new hi().setFromUnitVectors(e.up,new N(0,1,0)),xe=z.clone().invert(),we=new N,be=new hi,Le=2*Math.PI;return function(){const De=i.object.position;C.copy(De).sub(i.target),C.applyQuaternion(z),o.setFromVector3(C),i.autoRotate&&r===s.NONE&&L(O()),i.enableDamping?(o.theta+=l.theta*i.dampingFactor,o.phi+=l.phi*i.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let Be=i.minAzimuthAngle,Ze=i.maxAzimuthAngle;return isFinite(Be)&&isFinite(Ze)&&(Be<-Math.PI?Be+=Le:Be>Math.PI&&(Be-=Le),Ze<-Math.PI?Ze+=Le:Ze>Math.PI&&(Ze-=Le),Be<=Ze?o.theta=Math.max(Be,Math.min(Ze,o.theta)):o.theta=o.theta>(Be+Ze)/2?Math.max(Be,o.theta):Math.min(Ze,o.theta)),o.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,o.phi)),o.makeSafe(),o.radius*=c,o.radius=Math.max(i.minDistance,Math.min(i.maxDistance,o.radius)),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),C.setFromSpherical(o),C.applyQuaternion(xe),De.copy(i.target).add(C),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),c=1,h||we.distanceToSquared(i.object.position)>a||8*(1-be.dot(i.object.quaternion))>a?(i.dispatchEvent(zc),we.copy(i.object.position),be.copy(i.object.quaternion),h=!1,!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",D),i.domElement.removeEventListener("pointerdown",P),i.domElement.removeEventListener("pointercancel",Z),i.domElement.removeEventListener("wheel",ae),i.domElement.removeEventListener("pointermove",k),i.domElement.removeEventListener("pointerup",I),i._domElementKeyEvents!==null&&i._domElementKeyEvents.removeEventListener("keydown",K)};const i=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new Uc,l=new Uc;let c=1;const u=new N;let h=!1;const f=new ge,m=new ge,g=new ge,p=new ge,d=new ge,x=new ge,A=new ge,v=new ge,T=new ge,w=[],R={};function O(){return 2*Math.PI/60/60*i.autoRotateSpeed}function M(){return Math.pow(.95,i.zoomSpeed)}function L(C){l.theta-=C}function U(C){l.phi-=C}const $=function(){const C=new N;return function(xe,we){C.setFromMatrixColumn(we,0),C.multiplyScalar(-xe),u.add(C)}}(),ue=function(){const C=new N;return function(xe,we){i.screenSpacePanning===!0?C.setFromMatrixColumn(we,1):(C.setFromMatrixColumn(we,0),C.crossVectors(i.object.up,C)),C.multiplyScalar(xe),u.add(C)}}(),G=function(){const C=new N;return function(xe,we){const be=i.domElement;if(i.object.isPerspectiveCamera){const Le=i.object.position;C.copy(Le).sub(i.target);let Se=C.length();Se*=Math.tan(i.object.fov/2*Math.PI/180),$(2*xe*Se/be.clientHeight,i.object.matrix),ue(2*we*Se/be.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?($(xe*(i.object.right-i.object.left)/i.object.zoom/be.clientWidth,i.object.matrix),ue(we*(i.object.top-i.object.bottom)/i.object.zoom/be.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function B(C){i.object.isPerspectiveCamera?c/=C:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom*C)),i.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ee(C){i.object.isPerspectiveCamera?c*=C:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/C)),i.object.updateProjectionMatrix(),h=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function se(C){f.set(C.clientX,C.clientY)}function ie(C){A.set(C.clientX,C.clientY)}function X(C){p.set(C.clientX,C.clientY)}function ce(C){m.set(C.clientX,C.clientY),g.subVectors(m,f).multiplyScalar(i.rotateSpeed);const z=i.domElement;L(2*Math.PI*g.x/z.clientHeight),U(2*Math.PI*g.y/z.clientHeight),f.copy(m),i.update()}function he(C){v.set(C.clientX,C.clientY),T.subVectors(v,A),T.y>0?B(M()):T.y<0&&ee(M()),A.copy(v),i.update()}function Me(C){d.set(C.clientX,C.clientY),x.subVectors(d,p).multiplyScalar(i.panSpeed),G(x.x,x.y),p.copy(d),i.update()}function V(C){C.deltaY<0?ee(M()):C.deltaY>0&&B(M()),i.update()}function oe(C){let z=!1;switch(C.code){case i.keys.UP:C.ctrlKey||C.metaKey||C.shiftKey?U(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(0,i.keyPanSpeed),z=!0;break;case i.keys.BOTTOM:C.ctrlKey||C.metaKey||C.shiftKey?U(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(0,-i.keyPanSpeed),z=!0;break;case i.keys.LEFT:C.ctrlKey||C.metaKey||C.shiftKey?L(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(i.keyPanSpeed,0),z=!0;break;case i.keys.RIGHT:C.ctrlKey||C.metaKey||C.shiftKey?L(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):G(-i.keyPanSpeed,0),z=!0;break}z&&(C.preventDefault(),i.update())}function de(){if(w.length===1)f.set(w[0].pageX,w[0].pageY);else{const C=.5*(w[0].pageX+w[1].pageX),z=.5*(w[0].pageY+w[1].pageY);f.set(C,z)}}function me(){if(w.length===1)p.set(w[0].pageX,w[0].pageY);else{const C=.5*(w[0].pageX+w[1].pageX),z=.5*(w[0].pageY+w[1].pageY);p.set(C,z)}}function W(){const C=w[0].pageX-w[1].pageX,z=w[0].pageY-w[1].pageY,xe=Math.sqrt(C*C+z*z);A.set(0,xe)}function Ce(){i.enableZoom&&W(),i.enablePan&&me()}function Ae(){i.enableZoom&&W(),i.enableRotate&&de()}function Ee(C){if(w.length==1)m.set(C.pageX,C.pageY);else{const xe=_e(C),we=.5*(C.pageX+xe.x),be=.5*(C.pageY+xe.y);m.set(we,be)}g.subVectors(m,f).multiplyScalar(i.rotateSpeed);const z=i.domElement;L(2*Math.PI*g.x/z.clientHeight),U(2*Math.PI*g.y/z.clientHeight),f.copy(m)}function pe(C){if(w.length===1)d.set(C.pageX,C.pageY);else{const z=_e(C),xe=.5*(C.pageX+z.x),we=.5*(C.pageY+z.y);d.set(xe,we)}x.subVectors(d,p).multiplyScalar(i.panSpeed),G(x.x,x.y),p.copy(d)}function Ie(C){const z=_e(C),xe=C.pageX-z.x,we=C.pageY-z.y,be=Math.sqrt(xe*xe+we*we);v.set(0,be),T.set(0,Math.pow(v.y/A.y,i.zoomSpeed)),B(T.y),A.copy(v)}function y(C){i.enableZoom&&Ie(C),i.enablePan&&pe(C)}function S(C){i.enableZoom&&Ie(C),i.enableRotate&&Ee(C)}function P(C){i.enabled!==!1&&(w.length===0&&(i.domElement.setPointerCapture(C.pointerId),i.domElement.addEventListener("pointermove",k),i.domElement.addEventListener("pointerup",I)),Y(C),C.pointerType==="touch"?b(C):J(C))}function k(C){i.enabled!==!1&&(C.pointerType==="touch"?_(C):j(C))}function I(C){Q(C),w.length===0&&(i.domElement.releasePointerCapture(C.pointerId),i.domElement.removeEventListener("pointermove",k),i.domElement.removeEventListener("pointerup",I)),i.dispatchEvent(Bc),r=s.NONE}function Z(C){Q(C)}function J(C){let z;switch(C.button){case 0:z=i.mouseButtons.LEFT;break;case 1:z=i.mouseButtons.MIDDLE;break;case 2:z=i.mouseButtons.RIGHT;break;default:z=-1}switch(z){case gi.DOLLY:if(i.enableZoom===!1)return;ie(C),r=s.DOLLY;break;case gi.ROTATE:if(C.ctrlKey||C.metaKey||C.shiftKey){if(i.enablePan===!1)return;X(C),r=s.PAN}else{if(i.enableRotate===!1)return;se(C),r=s.ROTATE}break;case gi.PAN:if(C.ctrlKey||C.metaKey||C.shiftKey){if(i.enableRotate===!1)return;se(C),r=s.ROTATE}else{if(i.enablePan===!1)return;X(C),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(Bo)}function j(C){switch(r){case s.ROTATE:if(i.enableRotate===!1)return;ce(C);break;case s.DOLLY:if(i.enableZoom===!1)return;he(C);break;case s.PAN:if(i.enablePan===!1)return;Me(C);break}}function ae(C){i.enabled===!1||i.enableZoom===!1||r!==s.NONE||(C.preventDefault(),i.dispatchEvent(Bo),V(C),i.dispatchEvent(Bc))}function K(C){i.enabled===!1||i.enablePan===!1||oe(C)}function b(C){switch(le(C),w.length){case 1:switch(i.touches.ONE){case _i.ROTATE:if(i.enableRotate===!1)return;de(),r=s.TOUCH_ROTATE;break;case _i.PAN:if(i.enablePan===!1)return;me(),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(i.touches.TWO){case _i.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ce(),r=s.TOUCH_DOLLY_PAN;break;case _i.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Ae(),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&i.dispatchEvent(Bo)}function _(C){switch(le(C),r){case s.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ee(C),i.update();break;case s.TOUCH_PAN:if(i.enablePan===!1)return;pe(C),i.update();break;case s.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;y(C),i.update();break;case s.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;S(C),i.update();break;default:r=s.NONE}}function D(C){i.enabled!==!1&&C.preventDefault()}function Y(C){w.push(C)}function Q(C){delete R[C.pointerId];for(let z=0;z<w.length;z++)if(w[z].pointerId==C.pointerId){w.splice(z,1);return}}function le(C){let z=R[C.pointerId];z===void 0&&(z=new ge,R[C.pointerId]=z),z.set(C.pageX,C.pageY)}function _e(C){const z=C.pointerId===w[0].pointerId?w[1]:w[0];return R[z.pointerId]}i.domElement.addEventListener("contextmenu",D),i.domElement.addEventListener("pointerdown",P),i.domElement.addEventListener("pointercancel",Z),i.domElement.addEventListener("wheel",ae,{passive:!1}),this.update()}}class Xv{constructor(e){Ke(this,"scene");Ke(this,"camera");Ke(this,"renderer");Ke(this,"animations");Ke(this,"clock");Ke(this,"controls");this.clock=new Gv,this.animations=[],this.scene=new ev,this.scene.background=new je(1118481);const t=new kv(11184810,2);t.position.set(10,10,10),t.castShadow=!0,this.scene.add(t),this.scene.add(new Uv(11184810,3100495,3.5)),this.camera=this.createCamera(e),this.renderer=new Qu({antialias:!0}),this.controls=new qv(this.camera,this.renderer.domElement),this.controls.target.set(0,0,0),this.controls.enableDamping=!0,this.controls.minDistance=30,this.controls.maxDistance=100,this.controls.minAzimuthAngle=-Math.PI/2,this.controls.maxAzimuthAngle=Math.PI/2,this.controls.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.renderer.physicallyCorrectLights=!0,this.adjustSize(e),e.append(this.renderer.domElement),window.addEventListener("resize",()=>this.adjustSize(e))}adjustSize(e){this.camera.aspect=e.clientWidth/e.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio)}createCamera(e){const i=e.clientWidth/e.clientHeight,s=.1,r=100,a=new Gt(35,i,s,r);return a.position.set(15,10,30),a.lookAt(new N(0,0,0)),a}start(){this.renderer.setAnimationLoop(()=>{Wv(),this.controls.update();const e=this.clock.getDelta();this.animations.forEach(t=>t(e)),this.render()})}stop(){this.renderer.setAnimationLoop(null)}getScene(){return this.scene}addAnimationLoop(e){this.animations.push(e)}render(){this.renderer.render(this.scene,this.camera)}}class ni{translateSide(e,t){const i=t.getAllCubelets(),s=t.getDimension(),r=10,a=(l,c,u)=>{for(const h of i){const f=h.stickers.find(m=>m.side===l&&m.x===c&&m.y===u);if(f)return f}},o=[];o.push(`${(ye[e]+Array.from(new Array(r)).fill(" ").join("")).substring(0,r)}`);for(let l=0;l<s;++l){let c="";for(let u=0;u<s;++u){const h=a(e,u,l);c+=wn[h.color].substring(0,1)+ni.mapToSmallBottomLetters(`${("  "+h.id).slice(-2)}  `)}o.push(c)}return o}translateCube(e){const t=e.getDimension(),i=this.translateSide(ye.UP,e),s=this.translateSide(ye.LEFT,e),r=this.translateSide(ye.FRONT,e),a=this.translateSide(ye.RIGHT,e),o=this.translateSide(ye.BACK,e),l=this.translateSide(ye.DOWN,e);let c="";i.forEach(u=>{c+=Array.from(new Array(i[0].length)).fill(" ").join("")+u+`
`});for(let u=0;u<t+1;++u)c+=s[u],c+=r[u],c+=a[u],c+=o[u]+`
`;return l.forEach(u=>{c+=Array.from(new Array(l[0].length)).fill(" ").join("")+u+`
`}),c}translateRotations(e,t){const i=[...e];let s="",r=0,a=i.shift();for(;a;){const o=i[0];let l=" ";o&&o.layer===a.layer&&o.side===a.side&&o.counterClockwiseDirection===a.counterClockwiseDirection&&(i.shift(),l="2"),s+=`${l}${ye[a.side].substring(0,1)}${a.counterClockwiseDirection?"'":" "}${this.getLayer(a.layer)}  `,t!==void 0&&r%t===t-1&&(s+=`
`),++r,a=i.shift()}return s}translateCubelets(e){let t="";return e.map(i=>{i.stickers.map(s=>{wn[s.color],ye[s.side].substring(0,1),ni.mapToSmallTopLetters(s.id.toString()),`${ni.mapToSmallBottomLetters("("+s.x+","+s.y+")")}`})}),t}getLayer(e){let t=1;return e!==void 0&&(t=e+1),ni.mapToSmallBottomLetters(t.toString())}static mapToSmallTopLetters(e){const t=new Map;return t.set("0","⁰"),t.set("1","¹"),t.set("2","²"),t.set("3","³"),t.set("4","⁴"),t.set("5","⁵"),t.set("6","⁶"),t.set("7","⁷"),t.set("8","⁸"),t.set("9","⁹"),t.set(",","﹐"),e.split("").map(i=>t.has(i)?t.get(i):i).join("")}static mapToSmallBottomLetters(e){const t=new Map;return t.set("0","₀"),t.set("1","₁"),t.set("2","₂"),t.set("3","₃"),t.set("4","₄"),t.set("5","₅"),t.set("6","₆"),t.set("7","₇"),t.set("8","₈"),t.set("9","₉"),t.set("0","₀"),t.set("(","₍"),t.set(")","₎"),e.split("").map(i=>t.has(i)?t.get(i):i).join("")}}const ds=new N;function Bt(n,e,t,i,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;ds.copy(e),ds[i]=0,ds.normalize();const c=.5*a/(a+o),u=1-ds.angleTo(n)/l;return Math.sign(ds[t])===1?u*c:o/(a+o)+c+c*(1-u)}class jv extends ns{constructor(e=1,t=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(e/2,t/2,i/2,r),super(1,1,1,s,s,s),s===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const o=new N,l=new N,c=new N(e,t,i).divideScalar(2).subScalar(r),u=this.attributes.position.array,h=this.attributes.normal.array,f=this.attributes.uv.array,m=u.length/6,g=new N,p=.5/s;for(let d=0,x=0;d<u.length;d+=3,x+=2)switch(o.fromArray(u,d),l.copy(o),l.x-=Math.sign(l.x)*p,l.y-=Math.sign(l.y)*p,l.z-=Math.sign(l.z)*p,l.normalize(),u[d+0]=c.x*Math.sign(o.x)+l.x*r,u[d+1]=c.y*Math.sign(o.y)+l.y*r,u[d+2]=c.z*Math.sign(o.z)+l.z*r,h[d+0]=l.x,h[d+1]=l.y,h[d+2]=l.z,Math.floor(d/m)){case 0:g.set(1,0,0),f[x+0]=Bt(g,l,"z","y",r,i),f[x+1]=1-Bt(g,l,"y","z",r,t);break;case 1:g.set(-1,0,0),f[x+0]=1-Bt(g,l,"z","y",r,i),f[x+1]=1-Bt(g,l,"y","z",r,t);break;case 2:g.set(0,1,0),f[x+0]=1-Bt(g,l,"x","z",r,e),f[x+1]=Bt(g,l,"z","x",r,i);break;case 3:g.set(0,-1,0),f[x+0]=1-Bt(g,l,"x","z",r,e),f[x+1]=1-Bt(g,l,"z","x",r,i);break;case 4:g.set(0,0,1),f[x+0]=1-Bt(g,l,"x","y",r,e),f[x+1]=1-Bt(g,l,"y","x",r,t);break;case 5:g.set(0,0,-1),f[x+0]=Bt(g,l,"x","y",r,e),f[x+1]=1-Bt(g,l,"y","x",r,t);break}}}const Lr=class{constructor(e){Ke(this,"cubeletMesh");const t=e.sideSize-Lr.gap,i=new jv(t,t,t,3,.1);let s=this.getPositionFromCubelet(e);s.subScalar((e.cubeDimension-1)*.5),s.multiplyScalar(e.sideSize),this.cubeletMesh=new on(i,this.createMaterial(e.cubelet)),this.cubeletMesh.position.set(s.x,s.y,s.z)}getMesh(){return this.cubeletMesh}createMaterial(e){return Array.from(new Array(6)).map((t,i)=>{const s=this.mapCubeFaceToSide(i),r=e.stickers.find(o=>o.side===s);return new ah({color:r?tp(r.color):Lr.stickerlessColor})})}mapCubeFaceToSide(e){switch(e){case 0:return ye.RIGHT;case 1:return ye.LEFT;case 2:return ye.UP;case 3:return ye.DOWN;case 4:return ye.FRONT;case 5:return ye.BACK}}getPositionFromCubelet(e){let t=0,i=0,s=0;const r=e.cubelet.stickers[2];switch(r.side){case ye.UP:i=e.cubeDimension-1,t=r.x,s=r.y;break;case ye.DOWN:i=0,t=r.x,s=e.cubeDimension-1-r.y;break;case ye.RIGHT:t=e.cubeDimension-1,i=e.cubeDimension-1-r.y,s=e.cubeDimension-1-r.x;break;case ye.LEFT:t=0,i=e.cubeDimension-1-r.y,s=r.x;break;case ye.FRONT:s=e.cubeDimension-1,t=r.x,i=e.cubeDimension-1-r.y;break;case ye.BACK:s=0,t=e.cubeDimension-1-r.x,i=e.cubeDimension-1-r.y;break}return new N(t,i,s)}};let vs=Lr;Ke(vs,"stickerlessColor",662316),Ke(vs,"gap",.05);var dh=(n=>(n.x="x",n.y="y",n.z="z",n))(dh||{});const Yv=n=>{switch(n){case ye.BACK:case ye.FRONT:return"z";case ye.UP:case ye.DOWN:return"y";case ye.LEFT:case ye.RIGHT:return"x"}},Ga=class{constructor(e){Ke(this,"parent");Ke(this,"dimension");Ke(this,"rubiksCubeGroup");this.rubiksCubeGroup=new Ni,this.parent=e.parent,this.dimension=e.cube.getDimension(),e.cube.getAllCubelets().forEach(t=>{const i=e.size/this.dimension,s=new vs({sideSize:i,cubelet:t,cubeDimension:this.dimension});s.getMesh().parent=this.rubiksCubeGroup,this.rubiksCubeGroup.add(s.getMesh())}),this.rubiksCubeGroup.position.set(e.position.x,e.position.y,e.position.z),this.parent.add(this.rubiksCubeGroup)}getMesh(){return this.rubiksCubeGroup}async rotateFace(e){const t=Yv(e.side),i=dh[t];let s=Math.PI/2*(e.counterClockwiseDirection?1:-1);(e.side===ye.BACK||e.side===ye.DOWN||e.side===ye.LEFT)&&(s*=-1);const r=this.createRotationGroup(i,e);this.parent.add(r);const a={rotation:0},o={rotation:s};return new Promise(l=>{new fh(a).to(o,e.duration!==void 0?e.duration:Ga.animatioDuration).easing(Wi.Quadratic.InOut).onUpdate(c=>{r.rotation[i]=c.rotation}).onComplete(()=>{r.rotation[i]=s,r.updateMatrixWorld(!0),r.children.forEach(c=>{const u=c.matrixWorld.clone(),h=new N;h.setFromMatrixPosition(u),c.parent=this.rubiksCubeGroup,c.position.copy(h.clone().sub(this.rubiksCubeGroup.position.clone())),c.rotation.setFromRotationMatrix(u)}),this.parent.remove(r),l()}).start()})}createRotationGroup(e,t){let i=(o,l)=>l-o;(t.side===ye.BACK||t.side===ye.DOWN||t.side===ye.LEFT)&&(i=(o,l)=>o-l);let s=0,r=this.dimension*this.dimension;t.layer!==void 0&&t.layer>0&&(r=4*(this.dimension-1),s+=(t.layer-1)*r+this.dimension*this.dimension);const a=new Ni;return this.rubiksCubeGroup.children.sort((o,l)=>i(o.position[e],l.position[e])).filter((o,l)=>l>=s&&l<s+r).forEach(o=>{o.parent=a,a.add(o)}),this.rubiksCubeGroup.getWorldPosition(a.position),a}};let Ts=Ga;Ke(Ts,"animatioDuration",250);function kc(){return new Worker("/assets/pocket-cube-solvers-map-worker-05dc178d.js")}class Zv extends ka{constructor(e,t={}){const i=t.font;if(i===void 0)super();else{const s=i.generateShapes(e,t.size);t.depth=t.height!==void 0?t.height:50,t.bevelThickness===void 0&&(t.bevelThickness=10),t.bevelSize===void 0&&(t.bevelSize=8),t.bevelEnabled===void 0&&(t.bevelEnabled=!1),super(s,t)}this.type="TextGeometry"}}class Kv{constructor(e){Ke(this,"cubeRenderer");Ke(this,"moves");Ke(this,"title");Ke(this,"cube");Ke(this,"moving",!1);Ke(this,"parent");window.addEventListener("keypress",t=>this.doCommand(t)),this.moves=[],this.moving=!1,this.cube=e.cube,this.cubeRenderer=new Ts({parent:e.scene,cube:this.cube,position:e.position.from,size:3}),e.scene.add(this.cubeRenderer.getMesh()),this.createTitle(e)}createTitle(e){const t=new Zv(e.title,{font:e.font,size:.8,height:.1}),i=new ah({color:12431535});this.title=new on(t,i),new fh(e.position.from).to(e.position.to,1500).easing(Wi.Quadratic.InOut).onUpdate(s=>{this.cubeRenderer.getMesh().position.set(s.x,s.y,s.z),this.title.position.set(s.x-this.title.scale.x*2,s.y+5,s.z)}).onComplete(s=>{this.cubeRenderer.getMesh().position.set(s.x,s.y,s.z),this.title.position.set(s.x-this.title.scale.x*2,s.y+5,s.z)}).start(),e.scene.add(this.title)}async doCommand(e){if(this.cube.isSolved())return;let t;switch(e.key.toLowerCase()){case"w":t=ye.UP;break;case"a":t=ye.LEFT;break;case"s":t=ye.FRONT;break;case"d":t=ye.RIGHT;break;case"f":t=ye.BACK;break;case"x":t=ye.DOWN;break}if(t!==void 0&&!this.moving){this.moving=!0;const i={side:t,counterClockwiseDirection:e.shiftKey};this.moves.push(i),await this.cubeRenderer.rotateFace({...i,duration:500}),this.cube=this.cube.rotateFace(i),this.moving=!1}}}class $v extends lh{constructor(e){super(e)}load(e,t,i,s){const r=this,a=new Nv(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){const l=r.parse(JSON.parse(o));t&&t(l)},i,s)}parse(e){return new Jv(e)}}class Jv{constructor(e){this.isFont=!0,this.type="Font",this.data=e}generateShapes(e,t=100){const i=[],s=Qv(e,t,this.data);for(let r=0,a=s.length;r<a;r++)i.push(...s[r].toShapes());return i}}function Qv(n,e,t){const i=Array.from(n),s=e/t.resolution,r=(t.boundingBox.yMax-t.boundingBox.yMin+t.underlineThickness)*s,a=[];let o=0,l=0;for(let c=0;c<i.length;c++){const u=i[c];if(u===`
`)o=0,l-=r;else{const h=ey(u,s,o,l,t);o+=h.offsetX,a.push(h.path)}}return a}function ey(n,e,t,i,s){const r=s.glyphs[n]||s.glyphs["?"];if(!r){console.error('THREE.Font: character "'+n+'" does not exists in font family '+s.familyName+".");return}const a=new Hv;let o,l,c,u,h,f,m,g;if(r.o){const p=r._cachedOutline||(r._cachedOutline=r.o.split(" "));for(let d=0,x=p.length;d<x;)switch(p[d++]){case"m":o=p[d++]*e+t,l=p[d++]*e+i,a.moveTo(o,l);break;case"l":o=p[d++]*e+t,l=p[d++]*e+i,a.lineTo(o,l);break;case"q":c=p[d++]*e+t,u=p[d++]*e+i,h=p[d++]*e+t,f=p[d++]*e+i,a.quadraticCurveTo(h,f,c,u);break;case"b":c=p[d++]*e+t,u=p[d++]*e+i,h=p[d++]*e+t,f=p[d++]*e+i,m=p[d++]*e+t,g=p[d++]*e+i,a.bezierCurveTo(h,f,m,g,c,u);break}}return{offsetX:r.ha*e,path:a}}const ty=Nf({name:"App",async mounted(){const n=document.getElementById("scene-container"),e=new Xv(n);e.start();const t=await this.loadFont();let i=new Ar;const s=new Ts({parent:e.getScene(),cube:i,position:new N(0,0,0),size:3});console.log("Scrambling...");const r=new ip(30).scramble(i);console.log(new ni().translateRotations(r,5));for(let a of r)await s.rotateFace({...a,duration:150}),i=i.rotateFace(a);new Kv({font:t,scene:e.getScene(),rendererSize:3,cube:i,position:{from:s.getMesh().position,to:new N(3,0,0)},title:"Human"}),e.getScene().remove(s.getMesh())},methods:{async solve(n,e){const t=async s=>{const r=JSON.parse(s.data.solution);console.log(r),console.log(new ni().translateRotations(r.rotations));for(let a of r.rotations)await e[s.data.id].rotateFace({...a,duration:150}),n=n.rotateFace(a)},i=[new kc,new kc];i[0].postMessage({cube:n.getConfiguration(),solverKey:"a*",id:0}),i[1].postMessage({cube:n.getConfiguration(),solverKey:"bfs",id:1}),i[0].onmessage=t,i[1].onmessage=t},async loadFont(){return new Promise(n=>{new $v().load("/helvetiker_regular.typeface.json",e=>n(e))})}}});const ny=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},iy={id:"scene-container"};function sy(n,e,t,i,s,r){return dd(),gd("div",iy)}const ry=ny(ty,[["render",sy],["__scopeId","data-v-3a141b5e"]]);Qd(ry).mount("#app");
