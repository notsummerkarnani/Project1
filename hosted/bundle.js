(()=>{var t={399:()=>{const t=document.createElement("template");t.innerHTML='\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">\n<div id="banner-container" class="container notification title">\n    <p id="end-button" class="button is-pulled-right">X</p>\n    <p class="content" id="banner-output">\n        Placeholder content\n    </p>\n</div>\n';class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.endButton=this.shadowRoot.querySelector("#end-button"),this.colourList=this.shadowRoot.querySelector("#banner-container"),this.myOutput=this.shadowRoot.querySelector("#banner-output")}connectedCallback(){this.endButton.onclick=()=>{this.remove()},this.render()}disconnectedCallback(){this.endButton.onclick=null}attributeChangedCallback(t,e,a){console.log(t,e,a);const n=this.getAttribute("data-text")?this.getAttribute("data-text"):"Placeholder Text",r=this.getAttribute("data-colour")?this.getAttribute("data-colour"):" is-warning";this.colourList.classList+=" "+r,this.myOutput.innerHTML=n,this.render()}render(){const t=this.getAttribute("data-text")?this.getAttribute("data-text"):"Placeholder Text";this.getAttribute("data-colour")&&this.getAttribute("data-colour"),this.shadowRoot.querySelector("#banner-output").innerText=t}static get observedAttributes(){return["data-text","data-colour"]}}customElements.define("my-banner",e)},228:()=>{const t=document.createElement("template");t.innerHTML='\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">\n<div class="section has-text-centered subtitle py-0">\n    <div class="has-background-grey-dark has-text-white-ter py-6" id="footer-output">\n        &copy; 2021 PlaceholderTitle || PlaceholderName || @PlaceholderEmail\n    </div>\n</div>\n';class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(t.content.cloneNode(!0))}connectedCallback(){this.render()}disconnectedCalbback(){}attributeChangedCallback(t,e,a){console.log(t,e,a),this.render()}static get observedAttributes(){return["data-title","data-name","data-email"]}render(){const t=this.getAttribute("data-title")?this.getAttribute("data-title"):"IGME 430 Project 1",e=this.getAttribute("data-name")?this.getAttribute("data-name"):"Samar Karnani",a=this.getAttribute("data-email")?this.getAttribute("data-email"):"srk7473@rit.edu";this.shadowRoot.querySelector("#footer-output").innerHTML=`&copy; 2022 ${t} || ${e} || ${a}`}}customElements.define("my-footer",e)},575:()=>{const t=document.createElement("template");t.innerHTML='\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer"\n/>\n<nav class="navbar is-dark has-shadow">\n    \x3c!-- logo / brand --\x3e\n    <div class="navbar-brand">\n        <a class="navbar-item fa-2x" href="/">\n            <i class="fas fa-gamepad"></i>\n        </a>\n        <a class="navbar-burger" id="burger">\n                <span></span>\n                <span></span>\n                <span></span>\n        </a>\n    </div>\n\n    <div class="navbar-menu" id="nav-links">\n        <div class="navbar-start">\n            <a class="navbar-item is hoverable" href="/">Home</a>\n        </div>\n    </div>\n</nav>\n';class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.burgerIcon=this.shadowRoot.querySelector("#burger"),this.navbarMenu=this.shadowRoot.querySelector("#nav-links"),this.burgerIcon&&(this.burgerIcon.onclick=()=>this.navbarMenu.classList.toggle("is-active"));const e=this.navbarMenu.children[0].children;this.getAttribute("data-page")&&this.getAttribute("data-page");for(let t of Object.keys(e))""==e[t].href.split("/").slice(-1)&&(e[t].classList.add("has-background-warning"),e[t].classList.add("has-text-black"))}}customElements.define("my-nav",e)}},e={};function a(n){var r=e[n];if(void 0!==r)return r.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,a),o.exports}a.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return a.d(e,{a:e}),e},a.d=(t,e)=>{for(var n in e)a.o(e,n)&&!a.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";a(228),a(575),a(399);const t=async t=>{const a=document.querySelector("#content");a.innerHTML="";let n=document.querySelector("#content").appendChild(document.createElement("my-banner"));switch(t.status){case 200:n.setAttribute("data-text","Success"),n.setAttribute("data-colour","is-primary");break;case 201:n.setAttribute("data-text","Created"),n.setAttribute("data-colour","is-primary");break;case 204:return n.setAttribute("data-text","Updated (No Content)"),void n.setAttribute("data-colour","is-primary");case 400:n.setAttribute("data-text","Bad Request"),n.setAttribute("data-colour","is-warning");break;case 404:n.setAttribute("data-text","Not Found"),n.setAttribute("data-colour","is-warning");break;default:n.setAttribute("data-text","Error code not implemented by client."),n.setAttribute("data-colour","is-warning")}a.innerHTML+="<hr>";let r=await t.text();if(!r)return 0;r=JSON.parse(r),console.log(r),r.message?document.querySelector("#content").appendChild(document.createElement("my-banner")).setAttribute("data-text",r.message):null!=r&&await e(r,a)},e=(t,e)=>{document.querySelector("#getCategoryField").value;let a="";a+='<div class="tile is-ancestor notification is-info">',console.log(t);let n=0;if(t.pantry)for(let e of Object.keys(t.pantry)){n++,a+=`<div class="tile is-parent"><div class="tile is-child box notification is-primary"><b>${e}</b><ul>`;for(let n of Object.keys(t.pantry[e]))a+=`<li> ${t.pantry[e][n].quantity} ${t.pantry[e][n].units} of ${t.pantry[e][n].food}</li>`;a+="</ul></div></div>",n%3==0&&(a+='</div><div class="tile is-ancestor notification is-info">')}else for(let e of Object.keys(t)){a+=`<div class="tile is-parent"><div class="tile is-child box notification is-primary"><b>${e}</b><ul>`;for(let n of Object.keys(t[e]))a+=`<li> ${t[e][n].quantity} ${t[e][n].units} of ${t[e][n].food}</li>`;a+="</ul></div></div>"}a+="</div></div>",e.innerHTML+=a};window.onload=()=>{const e=document.querySelector("#foodForm"),a=document.querySelector("#pantryForm");e.addEventListener("submit",(a=>(a.preventDefault(),(async e=>{const a=e.getAttribute("action"),n=e.getAttribute("method"),r=e.querySelector("#foodField"),o=document.querySelector("#categoryField"),s=e.querySelector("#quantityField"),i=document.querySelector("#measurementField"),c=`food=${r.value}&category=${o.value}&quantity=${s.value}&units=${i.value}`;let l=await fetch(a,{method:n,headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"},body:c});t(l)})(e),!1))),a.addEventListener("submit",(e=>(e.preventDefault(),(async e=>{const a=document.querySelector("#getCategoryField"),n=document.querySelector("#methodSelect");let r=await fetch(`/getPantry?category=${a.value}`,{method:n.value,headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json"}});t(r)})(),!1)))}})()})();