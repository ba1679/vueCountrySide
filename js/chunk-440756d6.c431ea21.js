(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-440756d6"],{"0af7":function(t,a,s){"use strict";var n=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"dropdown"},[s("a",{staticClass:"position-relative dropdown-btn",attrs:{href:"#","data-toggle":"dropdown"},on:{click:function(a){return a.preventDefault(),t.cartDetailOpen(a)}}},[s("i",{staticClass:"fas fa-shopping-cart fa-2x text-countryLight"}),0!==t.carts.length?s("span",{staticClass:"badge badge-pill badge-danger position-absolute badge-position"},[t._v(t._s(t.carts.length))]):t._e()]),s("div",{staticClass:"dropdown-menu dropdown-menu-right"},[s("div",{staticClass:"px-4 py-3"},[0!==t.carts.length?s("h6",[t._v("已加入購物車商品")]):s("h6",[t._v("購物車沒有東西喔")]),s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table"},t._l(t.carts,(function(a){return s("tr",{key:a.id},[s("td",[s("a",{staticClass:"far fa-trash-alt text-danger",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.removeCart(a)}}})]),s("td",{staticClass:"title-width"},[t._v(t._s(a.title))]),s("td",[s("img",{staticClass:"cart-img",attrs:{src:a.imageUrl,alt:"商品圖"}})]),s("td",[t._v(t._s(a.qty))]),s("td",[t._v(t._s(a.unit))]),s("td",[t._v("NT$"+t._s(a.total))])])})),0),0!==t.carts.length?s("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"CheckOut"}}},[t._v(" 結帳去")]):s("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"Shopping"}}},[t._v("趕緊購物去")])],1)])])])])},e=[],i=s("5530"),r=s("1157"),o=s.n(r),l=s("2f62"),c={name:"CartInfo",data:function(){return{}},computed:Object(i["a"])({},Object(l["c"])(["carts"])),methods:{cartDetailOpen:function(){o()(window).outerWidth()>768?o()(".dropdown-menu").dropdown():o()("#cartModal").modal("show")},removeCart:function(t){this.$store.dispatch("removeCart",t)},mobileHandler:function(){o()(window).outerWidth()<768&&o()(".dropdown-btn").removeAttr("data-toggle")}},mounted:function(){this.mobileHandler()}},u=c,d=(s("589e"),s("2877")),g=Object(d["a"])(u,n,e,!1,null,null,null);a["a"]=g.exports},"12a3":function(t,a,s){"use strict";s("b1e5")},"27b5":function(t,a,s){},"589e":function(t,a,s){"use strict";s("27b5")},"5ced":function(t,a,s){},"931a":function(t,a,s){},b1e5:function(t,a,s){},bb51:function(t,a,s){"use strict";s.r(a);var n=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"sticky-footer"},[s("Navbar",{staticClass:"sticky-top"}),s("router-view"),s("Footer",{staticClass:"sticky-bottom"})],1)},e=[],i=s("1157"),r=s.n(i),o=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-primary"},[s("div",{staticClass:"container"},[s("h1",{staticClass:"mb-0"},[s("router-link",{staticClass:"d-block logo",attrs:{to:"/"}},[t._v("上田園農產")])],1),s("router-link",{staticClass:"h3 text-countryLight ml-lg-2 ml-sm-1 eg-logo",attrs:{to:"/"}},[t._v("CountrySide")]),s("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarToggler"},on:{click:t.changeToggle}},[s("i",{staticClass:"fas fa-bars icon-transition",class:{rotate:t.isToggled}})]),s("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarToggler"}},[s("ul",{staticClass:"navbar-nav ml-auto mt-2 mt-lg-0"},[s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{href:"#",to:"/shopping"}},[t._v(" 線上商城 ")])],1),s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{to:"/contact"}},[t._v("聯絡我們")])],1),s("li",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{to:"/login"}},[t._v("後台登入")])],1),s("li",{staticClass:"nav-itemr"},[s("Cart",{staticClass:"d-lg-block d-none"})],1)])])],1)])])},l=[],c=s("0af7"),u={name:"Navbar",data:function(){return{isToggled:!1}},components:{Cart:c["a"]},methods:{changeToggle:function(){this.isToggled=!this.isToggled}},watch:{$route:function(){this.isToggled=!1}}},d=u,g=(s("12a3"),s("2877")),f=Object(g["a"])(d,o,l,!1,null,"5561d180",null),v=f.exports,b=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("footer",{staticClass:"bg-primary py-3"},[s("router-link",{staticClass:"text-decoration-none",attrs:{to:{name:"Index"}}},[s("h2",{staticClass:"text-center text-countryLight"},[t._v("上田園農產")])]),s("ul",{staticClass:"footer-nav d-flex justify-content-center list-style-none"},[s("li",{staticClass:"mr-3"},[s("router-link",{staticClass:"text-countryLight a-hover-none",attrs:{to:{name:"Index"}}},[t._v("關於我們")])],1),s("li",{staticClass:"mr-3"},[s("router-link",{staticClass:"text-countryLight a-hover-none",attrs:{to:{name:"Contact"}}},[t._v("聯絡我們")])],1),s("li",{staticClass:"mr-3"},[s("router-link",{staticClass:"text-countryLight a-hover-none",attrs:{to:{name:"Shopping"}}},[t._v("線上商城")])],1)]),t._m(0),s("p",{staticClass:"text-center text-gray"},[t._v(" © copyright 2021 HSINHUI practice 非商業用途 ")])],1)])},C=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ul",{staticClass:"social d-flex justify-content-center list-style-none p-0"},[s("li",{staticClass:"mr-2"},[s("a",{staticClass:"text-countryLight",attrs:{href:"#"}},[s("i",{staticClass:"fab fa-facebook-square fa-2x"})])]),s("li",{staticClass:"mr-2"},[s("a",{staticClass:"text-countryLight",attrs:{href:"https://www.instagram.com/countryside8985/",target:"_blank"}},[s("i",{staticClass:"fab fa-instagram fa-2x"})])]),s("li",[s("a",{staticClass:"text-countryLight",attrs:{href:"#"}},[s("i",{staticClass:"fab fa-line fa-2x"})])])])}],h=(s("f0dd"),{}),m=Object(g["a"])(h,b,C,!1,null,"1997bc77",null),p=m.exports,_={components:{Navbar:v,Footer:p},watch:{$route:function(){r()(".navbar-collapse").removeClass("show")}}},k=_,y=(s("cccb"),Object(g["a"])(k,n,e,!1,null,null,null));a["default"]=y.exports},cccb:function(t,a,s){"use strict";s("5ced")},f0dd:function(t,a,s){"use strict";s("931a")}}]);
//# sourceMappingURL=chunk-440756d6.c431ea21.js.map