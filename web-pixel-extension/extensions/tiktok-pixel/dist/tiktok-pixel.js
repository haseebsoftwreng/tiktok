(()=>{var I=Object.create;var f=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,x=Object.prototype.hasOwnProperty;var d=(t,o)=>()=>(t&&(o=t(t=0)),o);var T=(t,o)=>()=>(o||t((o={exports:{}}).exports,o),o.exports);var E=(t,o,c,l)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of k(o))!x.call(t,s)&&s!==c&&f(t,s,{get:()=>o[s],enumerable:!(l=P(o,s))||l.enumerable});return t};var O=(t,o,c)=>(c=t!=null?I(S(t)):{},E(o||!t||!t.__esModule?f(c,"default",{value:t,enumerable:!0}):c,t));var u=(t,o,c)=>new Promise((l,s)=>{var r=n=>{try{a(c.next(n))}catch(i){s(i)}},e=n=>{try{a(c.throw(n))}catch(i){s(i)}},a=n=>n.done?l(n.value):Promise.resolve(n.value).then(r,e);a((c=c.apply(t,o)).next())});var w,_=d(()=>{w="WebPixel::Render"});var m,b=d(()=>{_();m=t=>shopify.extend(w,t)});var h=d(()=>{b()});var p=d(()=>{h()});var y=T(g=>{p();m(t=>u(g,null,function*(){var o=`https://pixel.aipixels.app/api/titok/events?account_id=${t.settings.accountID}`;yield s(t);var c="";t.analytics.subscribe("all_events",r=>u(g,null,function*(){console.log("testPixel",r);let e=r.context.window.location.href;e.indexOf("ttclid")>-1&&(c=new URL(e).searchParams.get("ttclid"),t.browser.sessionStorage.setItem("ttclid",c)),l(t,r)})),t.analytics.subscribe("cart_view",r=>u(g,null,function*(){r.context.document.location.pathname=="/cart"&&(console.log("This is custom",r),fetch(FB_APP_URL,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:r,source_url:t.init.context.document.location.href,user_agent:t.init.context.navigator.userAgent,user_ip:yield t.browser.localStorage.getItem("fbPixeluserIp"),fbp:yield t.browser.cookie.get("_fbp"),fbc:yield t.browser.cookie.get("_fbc"),c_user:yield t.browser.cookie.get("c_user"),cartToken:yield t.browser.cookie.get("cart"),cartCurrency:yield t.browser.cookie.get("cart_currency")})}).then(e=>{console.log("Success:",e)}).catch(e=>{console.log("Error:",e)}))}));function l(r,e){return u(this,null,function*(){(e.name=="checkout_completed"||e.name=="product_added_to_cart"||e.name=="checkout_started"||e.name=="payment_info_submitted"||e.name=="collection_viewed"||e.name=="product_viewed"||e.name=="search_submitted"||e.name=="page_viewed")&&fetch(o,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:e,source_url:r.init.context.document.location.href,user_agent:r.init.context.navigator.userAgent,user_ip:yield r.browser.localStorage.getItem("fbPixeluserIp"),ttclid:c!=""?c:yield r.browser.sessionStorage.getItem("ttclid"),ttp:yield r.browser.cookie.get("_ttp")})}).then(a=>{console.log("Success:",a)}).catch(a=>{console.log("Error:",a)})})}function s(r){return u(this,null,function*(){if(!(yield r.browser.localStorage.getItem("fbPixeluserIp"))){var e=new XMLHttpRequest,a="https://www.cloudflare.com/cdn-cgi/trace";e.open("GET",a,!0),e.onreadystatechange=function(){e.readyState===4&&e.status===200&&(console.log("in get Ip function status 200"),data=this.responseText.trim().split(`
`).reduce(function(n,i){return i=i.split("="),n[i[0]]=i[1],n},{}),r.browser.localStorage.setItem("fbPixeluserIp",data.ip))},e.send()}})}}))});var B=O(y());})();
