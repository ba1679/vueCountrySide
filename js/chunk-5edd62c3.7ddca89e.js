(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5edd62c3"],{"0af7":function(t,a,s){"use strict";var n=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"dropdown"},[s("a",{staticClass:"position-relative",attrs:{href:"#","data-toggle":"dropdown"}},[s("i",{staticClass:"fas fa-shopping-cart fa-2x text-countryLight"}),s("span",{staticClass:"badge badge-pill badge-danger position-absolute badge-position"},[t._v(t._s(t.cartLength))])]),s("div",{staticClass:"dropdown-menu dropdown-menu-right"},[s("div",{staticClass:"px-4 py-3"},[0!==t.cartLength?s("h6",[t._v("已加入購物車商品")]):s("h6",[t._v("購物車沒有東西喔")]),s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table"},t._l(t.cartList,(function(a){return s("tr",{key:a.id},[s("td",[s("a",{staticClass:"far fa-trash-alt text-danger",attrs:{href:"#","data-title":"100%台灣好米"},on:{click:function(s){return s.preventDefault(),t.showAlert(a.id)}}})]),s("td",{staticClass:"title-width"},[t._v(t._s(a.product.title))]),s("td",[s("img",{staticClass:"cart-img",attrs:{src:a.product.imageUrl,alt:"商品圖"}})]),s("td",[t._v(t._s(a.qty))]),s("td",[t._v(t._s(a.product.unit))]),s("td",[t._v("NT$"+t._s(a.total))])])})),0),0!==t.cartLength?s("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"CheckOut"}}},[t._v("結帳去")]):s("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"Shopping"}}},[t._v("趕緊購物去")])],1)])])])])},i=[],e=s("e68f"),c={name:"CartInfo",data:function(){return{cartList:[],cartLength:0}},mixins:[e["a"]],methods:{updateCart:function(t){this.cartList=t,this.cartLength=this.cartList.length},busEvent:function(){var t=this;t.$bus.$on("cartPush",(function(a){t.updateCart(a)}))}},mounted:function(){this.busEvent()}},r=c,o=(s("95ca"),s("2877")),l=Object(o["a"])(r,n,i,!1,null,null,null);a["a"]=l.exports},"0f38":function(t,a,s){},"266a":function(t,a,s){"use strict";s("6e45")},"5ced":function(t,a,s){},"6e45":function(t,a,s){},8418:function(t,a,s){"use strict";var n=s("c04e"),i=s("9bf2"),e=s("5c6c");t.exports=function(t,a,s){var c=n(a);c in t?i.f(t,c,e(0,s)):t[c]=s}},"8ad1":function(t,a,s){"use strict";s("0f38")},"95ca":function(t,a,s){"use strict";s("9a53")},"99af":function(t,a,s){"use strict";var n=s("23e7"),i=s("d039"),e=s("e8b5"),c=s("861d"),r=s("7b0b"),o=s("50c4"),l=s("8418"),u=s("65f0"),h=s("1dde"),f=s("b622"),d=s("2d00"),v=f("isConcatSpreadable"),g=9007199254740991,p="Maximum allowed index exceeded",C=d>=51||!i((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),b=h("concat"),m=function(t){if(!c(t))return!1;var a=t[v];return void 0!==a?!!a:e(t)},x=!C||!b;n({target:"Array",proto:!0,forced:x},{concat:function(t){var a,s,n,i,e,c=r(this),h=u(c,0),f=0;for(a=-1,n=arguments.length;a<n;a++)if(e=-1===a?c:arguments[a],m(e)){if(i=o(e.length),f+i>g)throw TypeError(p);for(s=0;s<i;s++,f++)s in e&&l(h,f,e[s])}else{if(f>=g)throw TypeError(p);l(h,f++,e)}return h.length=f,h}})},"9a53":function(t,a,s){},bb51:function(t,a,s){"use strict";s.r(a);var n=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"sticky-footer"},[s("Navbar",{staticClass:"sticky-top"}),s("router-view"),s("Footer",{staticClass:"sticky-bottom"})],1)},i=[],e=s("1157"),c=s.n(e),r=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-primary"},[s("div",{staticClass:"container"},[s("h1",{staticClass:"mb-0"},[s("router-link",{staticClass:"d-block logo",attrs:{to:"/"}},[t._v("上田園農產")])],1),s("div",{staticClass:"h3 text-countryLight ml-lg-2 ml-sm-1 eg-logo"},[t._v("CountrySide")]),s("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarToggler"},on:{click:t.changeToggle}},[s("i",{staticClass:"fas fa-bars icon-transition",class:{rotate:t.isToggled}})]),s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarToggler"}},[s("ul",{staticClass:"navbar-nav ml-auto mt-2 mt-lg-0 "},[s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{href:"#",to:"/shopping"}},[t._v(" 線上商城 ")])],1),s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{to:"/contact"}},[t._v("聯絡我們")])],1),s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{to:"/login"}},[t._v("後台登入")])],1),s("li",{staticClass:"nav-itemr"},[s("Cart",{staticClass:"d-lg-block d-none"})],1)])])])])])},o=[],l=s("0af7"),u=s("e68f"),h={name:"Navbar",data:function(){return{isToggled:!1}},components:{Cart:l["a"]},mixins:[u["a"]],methods:{changeToggle:function(){this.isToggled=!this.isToggled}},mounted:function(){this.getCartList()}},f=h,d=(s("8ad1"),s("2877")),v=Object(d["a"])(f,r,o,!1,null,"6b26ac5b",null),g=v.exports,p=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("footer",{staticClass:"bg-primary py-3"},[s("router-link",{staticClass:"text-decoration-none",attrs:{to:{name:"Index"}}},[s("h2",{staticClass:"text-center text-countryLight"},[t._v("上田園農產")])]),s("ul",{staticClass:"footer-nav d-flex justify-content-center list-style-none "},[s("li",{staticClass:"mr-3"},[s("router-link",{staticClass:"text-countryLight a-hover-none",attrs:{to:{name:"About"}}},[t._v("關於我們")])],1),s("li",{staticClass:"mr-3"},[s("router-link",{staticClass:"text-countryLight a-hover-none",attrs:{to:{name:"Contact"}}},[t._v("聯絡我們")])],1),s("li",{staticClass:"mr-3"},[s("router-link",{staticClass:"text-countryLight a-hover-none",attrs:{to:{name:"Shopping"}}},[t._v("線上商城")])],1)]),t._m(0),s("p",{staticClass:"text-center text-gray"},[t._v("© copyright 2021 HSINHUI practice 非商業用途")])],1)])},C=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ul",{staticClass:"social d-flex justify-content-center list-style-none p-0"},[s("li",{staticClass:"mr-2"},[s("a",{staticClass:"text-countryLight",attrs:{href:"#"}},[s("i",{staticClass:"fab fa-facebook-square fa-2x"})])]),s("li",{staticClass:"mr-2"},[s("a",{staticClass:"text-countryLight",attrs:{href:"#"}},[s("i",{staticClass:"fab fa-instagram fa-2x"})])]),s("li",[s("a",{staticClass:"text-countryLight",attrs:{href:"#"}},[s("i",{staticClass:"fab fa-line fa-2x"})])])])}],b=(s("266a"),{}),m=Object(d["a"])(b,p,C,!1,null,"3c40f924",null),x=m.exports,_={components:{Navbar:g,Footer:x},watch:{$route:function(){c()("html,body").scrollTop(0)}}},y=_,k=(s("cccb"),Object(d["a"])(y,n,i,!1,null,null,null));a["default"]=k.exports},cccb:function(t,a,s){"use strict";s("5ced")},e68f:function(t,a,s){"use strict";s("99af"),s("159b");a["a"]={data:function(){return{carts:{},cartSelect:1}},methods:{getCartList:function(){var t="".concat("https://vue-course-api.hexschool.io","/api/").concat("hsinhui","/cart"),a=this;this.$http.get(t).then((function(t){a.carts=t.data.data,localStorage.setItem("cartList",JSON.stringify(a.carts.carts)),a.$bus.$emit("cartPush",a.carts.carts)}))},addToCart:function(t,a){var s="".concat("https://vue-course-api.hexschool.io","/api/").concat("hsinhui","/cart"),n=this,i=n.carts.carts,e=1;i.forEach((function(s){if(t==s.product_id){e=s.qty+a;var i=s.id,c="".concat("https://vue-course-api.hexschool.io","/api/").concat("hsinhui","/cart/").concat(i);n.$http.delete(c).then((function(t){}))}})),n.isLoading=!0;var c={product_id:t,qty:e};this.$http.post(s,{data:c}).then((function(t){n.$swal("加入購物車成功!"),n.$bus.$emit("cartPush",n.carts.carts),n.getCartList(),n.isLoading=!1}))},showAlert:function(t){var a=this;a.$swal({title:"確定要從購物車移除此商品?",showCancelButton:!0,cancelButtonText:"取消",confirmButtonText:"確定"}).then((function(s){s.isConfirmed&&(a.$swal("刪除成功","","success"),a.deleteCart(t))}))},deleteCart:function(t){var a=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("hsinhui","/cart/").concat(t);this.$http.delete(s).then((function(t){console.log(t),a.getCartList()})).catch((function(t){console.log(t)}))}}}}}]);
//# sourceMappingURL=chunk-5edd62c3.7ddca89e.js.map