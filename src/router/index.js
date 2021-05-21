import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
//解決程式設計式路由往同一地址跳轉時會報錯的情況
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        name: 'Index',
        path: '',
        component: () => import('../views/Front/Index.vue')
      },
      {
        name: 'Contact',
        path: 'contact',
        component: () => import('../views/Front/Contact.vue')
      },
      {
        name: 'Shopping',
        path: 'shopping',
        component: () => import('../views/Front/Shopping.vue')
      },
      {
        name: 'ProductInfo',
        path: 'productInfo/:productId',
        component: () => import('../views/Front/ProductInfo.vue')
      },
      {
        name: 'CheckOut',
        path: 'checkout',
        component: () => import('../views/Front/CheckOut.vue')
      },
      {
        name: 'OrderForm',
        path: 'orderForm',
        component: () => import('../views/Front/OrderForm.vue')
      },
      {
        name: 'ConfirmOrder',
        path: 'confirmOrder/:orderId',
        component: () => import('../views/Front/ConfirmOrder.vue')
      }
    ]
  },
  // 後台router
  {
    name: 'Login',
    path: '/login', //路徑使用小寫
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/back/Dashboard.vue'), //vue cli 3 新寫法
    // 巢狀router
    children: [
      {
        name: 'Products',
        path: 'products',
        component: () => import('../views/back/Products.vue'),
        //路由訊息，代表需驗證
        meta: { requiresAuth: true }
      },
      {
        name: 'Coupons',
        path: 'coupons',
        component: () => import('../views/back/Coupons.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'OrderList',
        path: 'order_list',
        component: () => import('../views/back/OrderList.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'Chart',
        path: 'chart',
        component: () => import('../views/back/Chart.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    // 避免用戶在網址換輸入，若用戶不是輸入我們定義的path則導向首頁
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  routes
});

export default router;
