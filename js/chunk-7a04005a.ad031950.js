(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a04005a"],{"0af7":function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("div",{staticClass:"dropdown"},[s("a",{staticClass:"position-relative dropdown-btn",attrs:{href:"#","data-toggle":"dropdown"},on:{click:function(a){return a.preventDefault(),t.cartDetailOpen(a)}}},[s("i",{staticClass:"fas fa-shopping-cart fa-2x text-countryLight"}),0!==t.carts.length?s("span",{staticClass:"badge badge-pill badge-danger position-absolute badge-position"},[t._v(t._s(t.carts.length))]):t._e()]),s("div",{staticClass:"dropdown-menu dropdown-menu-right"},[s("div",{staticClass:"px-4 py-3"},[0!==t.carts.length?s("h6",[t._v("已加入購物車商品")]):s("h6",[t._v("購物車沒有東西喔")]),s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table"},t._l(t.carts,(function(a){return s("tr",{key:a.id},[s("td",[s("a",{staticClass:"far fa-trash-alt text-danger",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.removeCart(a)}}})]),s("td",{staticClass:"title-width"},[t._v(t._s(a.title))]),s("td",[s("img",{staticClass:"cart-img",attrs:{src:a.imageUrl,alt:"商品圖"}})]),s("td",[t._v(t._s(a.qty))]),s("td",[t._v(t._s(a.unit))]),s("td",[t._v("NT$"+t._s(a.total))])])})),0),0!==t.carts.length?s("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"CheckOut"}}},[t._v(" 結帳去")]):s("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"Shopping"}}},[t._v("趕緊購物去")])],1)])])])])},r=[],i=s("5530"),n=s("1157"),c=s.n(n),l=s("2f62"),o={name:"CartInfo",data:function(){return{}},computed:Object(i["a"])({},Object(l["c"])(["carts"])),methods:{cartDetailOpen:function(){c()(window).outerWidth()>768?c()(".dropdown-menu").dropdown():c()("#cartModal").modal("show")},removeCart:function(t){this.$store.dispatch("removeCart",t)},mobileHandler:function(){c()(window).outerWidth()<768&&c()(".dropdown-btn").removeAttr("data-toggle")}},mounted:function(){this.mobileHandler()}},d=o,u=(s("589e"),s("2877")),v=Object(u["a"])(d,e,r,!1,null,null,null);a["a"]=v.exports},"27b5":function(t,a,s){},"589e":function(t,a,s){"use strict";s("27b5")},d171:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[t._m(0),t._m(1),s("section",{staticClass:"container mt-3"},[s("ol",{staticClass:"breadcrumb bg-transparent"},[s("li",{staticClass:"breadcrumb-item"},[s("router-link",{attrs:{to:"/"}},[t._v("首頁")])],1),s("li",{staticClass:"breadcrumb-item active"},[t._v("線上商城")])]),s("div",[s("ul",{staticClass:"nav nav-tabs mb-3"},[s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",class:{active:"全部商品"===t.category},attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.category="全部商品"}}},[t._v("全部商品")])]),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",class:{active:"台灣好米"===t.category},attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.category="台灣好米"}}},[t._v("台灣好米")])]),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",class:{active:"台灣好茶"===t.category},attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.category="台灣好茶"}}},[t._v("台灣好茶")])]),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",class:{active:"國產蜂蜜"===t.category},attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.category="國產蜂蜜"}}},[t._v("國產蜂蜜")])]),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",class:{active:"黃金畜牧"===t.category},attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.category="黃金畜牧"}}},[t._v("黃金畜牧")])])]),s("div",{staticClass:"row mb-3",attrs:{id:t.category}},t._l(t.productFilter[t.currentPage],(function(a){return s("div",{key:a.id,staticClass:"col-lg-3 col-md-6 mb-5",attrs:{"data-aos":"fade-up","data-aos-duration":"1000","data-aos-once":"true"}},[s("div",{staticClass:"card detail-href h-100",on:{click:function(s){return t.moreDetail(a)}}},[s("div",{staticClass:"category-tag"},[t._v(" "+t._s(a.category)+" ")]),s("div",{staticClass:"detail-bg"},[s("a",{staticClass:"btn btn-primary",class:{disabled:!a.is_enabled},attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.moreDetail(a)}}},[t._v(t._s(a.is_enabled?"查看更多":"缺貨中"))])]),s("div",{staticClass:"item-card-img"},[s("img",{staticClass:"card-img-top",attrs:{src:a.imageUrl,alt:"產品圖片"}})]),s("div",{staticClass:"card-body"},[s("p",{staticClass:"h5"},[t._v(" "+t._s(a.title)+" ")]),s("div",{staticClass:"d-flex justify-content-end mt-3"},[s("del",{staticClass:"mr-auto"},[t._v(" "+t._s(t._f("currency")(a.origin_price))+" ")]),s("span",{staticClass:"text-warning"},[t._v(" 特價 "),s("strong",{staticClass:"h6"},[t._v(" "+t._s(t._f("currency")(a.price))+" ")])])])])]),s("a",{staticClass:"btn btn-primary cart-btn w-100",class:{disabled:!a.is_enabled},attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.addToCart(a)}}},[t._v(t._s(1===a.is_enabled?"加入購物車":"缺貨中"))])])})),0)])]),s("div",{staticClass:"d-flex justify-content-center"},[s("nav",[s("ul",{staticClass:"pagination"},[s("li",{staticClass:"page-item",class:{disabled:!t.currentPage}},[s("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(a){return a.preventDefault(),t.prev(a)}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.productFilter.length,(function(a){return s("li",{key:a,staticClass:"page-item",class:{active:t.currentPage===a-1}},[s("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(s){s.preventDefault(),t.currentPage=a-1}}},[t._v(t._s(a))])])})),s("li",{staticClass:"page-item",class:{disabled:t.currentPage===t.filtedProducts.length-1}},[s("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(a){return a.preventDefault(),t.next(a)}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])]),s("div",{staticClass:"cart-icon d-lg-none"},[s("Cart")],1),s("a",{staticClass:"text-warning back-to-top d-none",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.backToTop(a)}}},[s("i",{staticClass:"fas fa-arrow-circle-up fa-3x"})]),s("div",{staticClass:"modal fade",attrs:{id:"cartModal","data-keyboard":"false",tabindex:"-1","aria-labelledby":"cartLabel","aria-hidden":"true"}},[s("div",{staticClass:"modal-dialog modal-dialog-scrollable"},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[0!==t.carts.length?s("h5",{staticClass:"modal-title",attrs:{id:"cartLabel"}},[t._v(" 已加入購物車清單 ")]):s("h6",[t._v("購物車沒有東西喔")]),t._m(2)]),0!==t.carts.length?s("div",{staticClass:"modal-body"},[s("div",{staticClass:"table-responsive"},[s("table",{staticClass:"table"},t._l(t.carts,(function(a){return s("tr",{key:a.product_id},[s("td",[s("a",{staticClass:"far fa-trash-alt text-danger",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.removeCart(a)}}})]),s("td",{staticClass:"title-width"},[t._v(t._s(a.title))]),s("td",[s("img",{staticClass:"cart-img",attrs:{src:a.imageUrl,alt:"商品圖"}})]),s("td",[t._v(t._s(a.qty))]),s("td",[t._v(t._s(a.unit))]),s("td",[t._v("NT$"+t._s(a.total))])])})),0)])]):t._e(),s("div",{staticClass:"modal-footer"},[0!==t.carts.length?s("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v(" 繼續購物 ")]):t._e(),0!==t.carts.length?s("router-link",{staticClass:"btn btn-primary",attrs:{to:{name:"CheckOut"}}},[t._v("結帳去")]):s("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:{name:"Shopping"}}},[t._v("趕緊購物去")])],1)])])])])},r=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"message-alert"},[s("div",{staticClass:"alert alert-primary alert-dismissible fade",attrs:{role:"alert"}},[s("strong",[t._v("加入購物車成功")]),s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"jumbotron jumbotron-fluid jumbotron-bg bg-cover pt-3"},[s("div",{staticClass:"text-center"},[s("div",{staticClass:"h3 mb-4 text-primary"},[t._v("上田園農產 - 線上商城")]),s("div",{staticClass:"mt-3 d-flex justify-content-center"},[s("div",{staticClass:"coupon"},[s("p",{staticClass:"h4 p-2 text-white"},[t._v(" 歡慶青年返鄉週年 "),s("br"),t._v("即日起輸入 "),s("strong",{staticClass:"text-warning"},[t._v("countryside888 ")]),t._v(" 即可享8折優惠!! ")])])])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])}],i=s("5530"),n=(s("4de4"),s("159b"),s("1157")),c=s.n(n),l=s("0af7"),o=s("2f62"),d={name:"Shopping",data:function(){return{category:"全部商品",currentPage:0,filtedProducts:[]}},components:{Cart:l["a"]},watch:{currentPage:function(){c()("html,body").scrollTop(0)}},computed:Object(i["a"])({productFilter:function(){var t=this,a=[];return t.currentPage=0,t.filtedProducts=[],a=t.products.filter((function(a){return"全部商品"===t.category?t.products:a.category===t.category})),a.forEach((function(a,s){s%8===0&&t.filtedProducts.push([]);var e=parseInt(s/8);t.filtedProducts[e].push(a)})),t.filtedProducts}},Object(o["c"])(["products","carts"])),methods:Object(i["a"])({moreDetail:function(t){t.is_enabled&&this.$router.push("/productInfo/".concat(t.id))},addToCart:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.$store.dispatch("addToCart",{item:t,num:a}),c()(".alert-primary").addClass("show"),setTimeout((function(){c()(".alert-primary").removeClass("show")}),3e3)},removeCart:function(t){this.$store.dispatch("removeCart",t)},backToTop:function(){c()("html,body").animate({scrollTop:0},1e3)},prev:function(){var t=this;0===t.currentPage?t.currentPage=0:t.currentPage--},next:function(){var t=this;t.currentPage===t.filtedProducts.length-1?t.currentPage=t.filtedProducts.length-1:t.currentPage++}},Object(o["b"])(["getAllProduct"])),mounted:function(){this.getAllProduct(),c()(window).scroll((function(){c()(this).scrollTop()>300?c()(".back-to-top").addClass("d-block"):c()(".back-to-top").removeClass("d-block")}))}},u=d,v=(s("eec4"),s("2877")),f=Object(v["a"])(u,e,r,!1,null,"494798fd",null);a["default"]=f.exports},eec4:function(t,a,s){"use strict";s("f685")},f685:function(t,a,s){}}]);
//# sourceMappingURL=chunk-7a04005a.ad031950.js.map