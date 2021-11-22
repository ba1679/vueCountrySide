(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74394b4d"],{1799:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex justify-content-center"},[a("nav",[a("ul",{staticClass:"pagination"},[a("li",{staticClass:"page-item",class:{disabled:!t.pages.has_pre}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){return e.preventDefault(),t.getProductPages(t.pages.current_page-1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pages.total_pages,(function(e){return a("li",{key:e,staticClass:"page-item",class:{active:t.pages.current_page===e}},[a("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.getProductPages(e)}}},[t._v(t._s(e))])])})),a("li",{staticClass:"page-item",class:{disabled:!t.pages.has_next}},[a("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(e){return e.preventDefault(),t.getProductPages(t.pages.current_page+1)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])])},o=[],n={name:"Pagination",props:["pages"],methods:{getProductPages:function(t){this.$emit("emitProductPage",t)}}},i=n,c=a("2877"),r=Object(c["a"])(i,s,o,!1,null,null,null);e["a"]=r.exports},5225:function(t,e,a){},e532:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"message-alert"},[a("div",{staticClass:"alert alert-success alert-dismissible fade",class:{"alert-danger":!t.success},attrs:{role:"alert"}},[t.success?a("strong",[t._v("更新優惠券成功")]):a("strong",[t._v("操作失敗，請再試一次")]),t._m(0)])]),a("div",{staticClass:"h4 text-danger text-center mt-2"},[t.expired.status?a("strong",[t._v(t._s(t.expired.title)+"的優惠日期已到，請取消啟用!")]):t._e()]),a("div",{staticClass:"text-right mt-4"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.openModal(!0)}}},[t._v(" 新增優惠券 ")])]),a("table",{staticClass:"table mt-4"},[t._m(1),a("tbody",t._l(t.couponList,(function(e){return a("tr",{key:e.code},[a("td",[t._v(t._s(e.title))]),a("td",[t._v(t._s(e.percent))]),a("td",[t._v(t._s(e.due_date))]),a("td",[t._v(t._s(e.code))]),a("td",[e.is_enabled?a("span",{staticClass:"text-success"},[t._v("啟用")]):a("span",[t._v("未啟用")])]),a("td",{staticClass:"d-flex"},[a("button",{staticClass:"btn btn-outline-primary btn-sm mr-1",attrs:{type:"button"},on:{click:function(a){return t.openModal(!1,e)}}},[t._v(" 編輯 ")]),a("button",{staticClass:"btn btn-outline-danger btn-sm",attrs:{type:"button"},on:{click:function(a){return t.deleteModal(e.id)}}},[t._v(" 刪除 ")])])])})),0)]),a("Pagination",{attrs:{pages:t.pagination},on:{emitProductPage:t.getCouponList}}),a("div",{staticClass:"modal fade",attrs:{id:"couponModal",role:"dialog"}},[a("div",{staticClass:"modal-dialog modal-lg",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[t._m(2),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-8"},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"title"}},[t._v("優惠券標題")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newCoupon.title,expression:"newCoupon.title"}],staticClass:"form-control",attrs:{type:"text",id:"title",placeholder:"請輸入標題"},domProps:{value:t.newCoupon.title},on:{input:function(e){e.target.composing||t.$set(t.newCoupon,"title",e.target.value)}}})]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"percent"}},[t._v("折扣百分比")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newCoupon.percent,expression:"newCoupon.percent"}],staticClass:"form-control",attrs:{type:"text",id:"percent",placeholder:"請輸入折扣百分比"},domProps:{value:t.newCoupon.percent},on:{input:function(e){e.target.composing||t.$set(t.newCoupon,"percent",e.target.value)}}})]),a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"date"}},[t._v("到期日")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newCoupon.due_date,expression:"newCoupon.due_date"}],staticClass:"form-control",attrs:{type:"date",id:"date",placeholder:"請輸入到期日"},domProps:{value:t.newCoupon.due_date},on:{input:function(e){e.target.composing||t.$set(t.newCoupon,"due_date",e.target.value)}}})])]),a("div",{staticClass:"form-row"},[a("div",{staticClass:"form-group col-md-6"},[a("label",{attrs:{for:"coupon-code"}},[t._v("折扣碼")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newCoupon.code,expression:"newCoupon.code"}],staticClass:"form-control",attrs:{type:"text",id:"coupon-code",placeholder:"請輸入折扣碼"},domProps:{value:t.newCoupon.code},on:{input:function(e){e.target.composing||t.$set(t.newCoupon,"code",e.target.value)}}})])]),a("hr"),a("div",{staticClass:"form-group"},[a("div",{staticClass:"form-check"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newCoupon.is_enabled,expression:"newCoupon.is_enabled"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"is_enabled","true-value":1,"false-value":0},domProps:{checked:Array.isArray(t.newCoupon.is_enabled)?t._i(t.newCoupon.is_enabled,null)>-1:t._q(t.newCoupon.is_enabled,1)},on:{change:function(e){var a=t.newCoupon.is_enabled,s=e.target,o=s.checked?1:0;if(Array.isArray(a)){var n=null,i=t._i(a,n);s.checked?i<0&&t.$set(t.newCoupon,"is_enabled",a.concat([n])):i>-1&&t.$set(t.newCoupon,"is_enabled",a.slice(0,i).concat(a.slice(i+1)))}else t.$set(t.newCoupon,"is_enabled",o)}}}),a("label",{staticClass:"form-check-label",attrs:{for:"is_enabled"}},[t._v(" 是否啟用 ")])])])])])]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v(" 取消 ")]),a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.checkCoupon(t.newCoupon.code)}}},[t._v(" 確認 ")])])])])]),a("div",{staticClass:"modal fade",attrs:{id:"deleteModal",role:"dialog"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content border-0"},[t._m(3),t._m(4),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v(" 取消 ")]),a("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:t.deleteCoupon}},[t._v(" 確認刪除 ")])])])])])],1)},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{width:"150"}},[t._v("優惠券名稱")]),a("th",{attrs:{width:"120"}},[t._v("折扣百分比")]),a("th",{attrs:{width:"120"}},[t._v("到期日")]),a("th",{attrs:{width:"120"}},[t._v("折扣碼")]),a("th",{attrs:{width:"100"}},[t._v("啟用狀態")]),a("th",{attrs:{width:"100"}},[t._v("編輯")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header bg-primary text-white"},[a("h5",{staticClass:"modal-title",attrs:{id:"couponModal"}},[a("span",[t._v("新增優惠券")])]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header bg-danger text-white"},[a("h5",{staticClass:"modal-title",attrs:{id:"deleteModal"}},[a("span",[t._v("刪除優惠券")])]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-body"},[t._v(" 是否刪除 "),a("strong",{staticClass:"text-danger"}),t._v(" 優惠券? (刪除後將無法恢復)。 ")])}],n=a("5530"),i=(a("99af"),a("4de4"),a("159b"),a("ac1f"),a("5319"),a("1157")),c=a.n(i),r=a("1799"),l={name:"Coupons",data:function(){return{couponList:[],pagination:{},newCoupon:{},isNew:!1,couponId:"",todayDate:"",expired:{status:!1,title:""},success:!0}},components:{Pagination:r["a"]},methods:{getCouponList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("hsinhui","/admin/coupons?page=").concat(t);e.$store.dispatch("updateLoading",!0),e.$http.get(a).then((function(t){e.couponList=t.data.coupons,e.pagination=t.data.pagination,e.$store.dispatch("updateLoading",!1),e.checkDate()})).catch((function(){e.$store.dispatch("catchErr",!0)}))},openModal:function(t,e){t?(this.newCoupon={},this.isNew=!0):(this.newCoupon=Object(n["a"])({},e),this.isNew=!1),c()("#couponModal").modal("show")},checkCoupon:function(t){var e=this.couponList.filter((function(e){return e.code===t}));0!==e.length&&this.isNew?this.$swal("此優惠碼已存在，請更換"):this.updateCoupon()},updateCoupon:function(){var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("hsinhui","/admin/coupon"),a="post";t.isNew||(e="".concat("https://vue-course-api.hexschool.io","/api/").concat("hsinhui","/admin/coupon/").concat(t.newCoupon.id),a="put"),t.$http[a](e,{data:t.newCoupon}).then((function(e){e.data.success&&(t.success=!0,t.expired.status=!1,c()("#couponModal").modal("hide"),c()(".alert-success").addClass("show"),setTimeout((function(){c()(".alert-success").removeClass("show")}),3e3),t.getCouponList())})).catch((function(){t.success=!1,c()(".alert-danger").addClass("show")}))},checkDate:function(){var t=this;t.couponList.forEach((function(e){var a=Date.parse(e.due_date.replace(/-/g,"/")),s=e.title;t.todayDate>a&&1===e.is_enabled&&(t.expired.status=!0,t.expired.title=s)}))},deleteModal:function(t){this.couponId=t,c()("#deleteModal").modal("show")},deleteCoupon:function(){var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("hsinhui","/admin/coupon/").concat(t.couponId);t.$store.dispatch("updateLoading",!0),t.$http.delete(e).then((function(e){e.data.success?(t.$store.dispatch("updateLoading",!1),c()("#deleteModal").modal("hide"),c()(".alert").addClass("show"),setTimeout((function(){c()(".alert").removeClass("show")}),3e3)):t.$store.dispatch("catchErr",!0),t.getCouponList(t.pagination.current_page)}))}},mounted:function(){this.getCouponList(),this.todayDate=Date.parse((new Date).toDateString())}},d=l,u=(a("fe56"),a("2877")),p=Object(u["a"])(d,s,o,!1,null,"5d6a8a50",null);e["default"]=p.exports},fe56:function(t,e,a){"use strict";a("5225")}}]);
//# sourceMappingURL=chunk-74394b4d.b6f81a95.js.map