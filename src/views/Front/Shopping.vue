<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="jumbotron jumbotron-fluid jumbotron-bg bg-cover pt-3">
      <div class="text-center">
        <div class="h3 mb-4 text-primary">上田園農產 - 線上商城</div>
        <div class="mt-3 d-flex justify-content-center">
          <div class="coupon">
            <p class="h4 p-2 text-white">
              歡慶青年返鄉週年 <br />即日起輸入 <strong class="text-warning">countryside888 </strong> 即可享8折優惠!!
            </p>
          </div>
        </div>
      </div>
    </div>

    <section class="container mt-3">
      <ol class="breadcrumb bg-transparent">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item active">線上商城</li>
      </ol>
      <div role="tabpanel">
        <ul class="nav nav-tabs mb-3">
          <li class="nav-item ">
            <a
              class="nav-link"
              :class="{ active: category == '全部商品' }"
              href="#全部商品"
              data-category="全部商品"
              @click.prevent="categoryFilter"
              >全部商品</a
            >
          </li>
          <li class="nav-item ">
            <a
              class="nav-link"
              :class="{ active: category == '台灣好米' }"
              href="#台灣好米"
              data-category="台灣好米"
              @click.prevent="categoryFilter"
              >台灣好米</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: category == '台灣好茶' }"
              href="#"
              data-category="台灣好茶"
              @click.prevent="categoryFilter"
              >台灣好茶</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: category == '國產蜂蜜' }"
              href="#"
              data-category="國產蜂蜜"
              @click.prevent="categoryFilter"
              >國產蜂蜜</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: category == '黃金畜牧' }"
              href="#"
              data-category="黃金畜牧"
              @click.prevent="categoryFilter"
              >黃金畜牧</a
            >
          </li>
        </ul>
        <div class="tab-pane row mb-3" role="tabpanel" :id="category">
          <div
            class="col-lg-3 col-md-6 mb-3"
            v-for="item in productFilter"
            :key="item.id"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <a href="#" class="d-block detail-href h-100">
              <div class="card h-100">
                <div class="category-tag">
                  {{ item.category }}
                </div>
                <div class="detail-bg">
                  <a
                    href="#"
                    class="btn btn-primary"
                    :class="{ disabled: !item.is_enabled }"
                    @click.prevent="moreDetail(item.id)"
                    >{{ item.is_enabled ? '查看更多' : '缺貨中' }}</a
                  >
                </div>
                <img :src="item.imageUrl" alt="產品圖片" class="card-img-top" />
                <div class="card-body">
                  <a href="#" class="h5" @click.prevent="moreDetail(item.id)">{{ item.title }}</a>
                  <div class="d-flex justify-content-end mt-3">
                    <del class="mr-auto">{{ item.origin_price | currency }}</del>
                    <span class="text-warning"
                      >特價<strong class="h6">{{ item.price | currency }}</strong></span
                    >
                  </div>
                </div>
                <a
                  href="#"
                  class="bg-primary btn cart-btn w-100"
                  :class="{ disabled: !item.is_enabled }"
                  @click.prevent="addToCart(item.id, cartSelect)"
                  >{{ item.is_enabled == 1 ? '加入購物車' : '缺貨中' }}</a
                >
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <Pagination :pages="pagination" @emitProductPage="getProductList" v-if="category === '全部商品'"></Pagination>
    <Cart class="cart-icon" />
    <a href="#" class="text-primary back-to-top d-none" @click.prevent="backToTop"
      ><i class="fas fa-arrow-circle-up fa-3x"></i
    ></a>
  </div>
</template>
<script>
import $ from 'jquery';
import cartHandler from '@/mixins/getCart.js';
import Pagination from '@/components/Pagination.vue';
import Cart from '@/components/front/Cart.vue';
export default {
  name: 'Shopping',
  data: function() {
    return {
      isLoading: false,
      products: [],
      pagination: {},
      category: '全部商品'
    };
  },
  mixins: [cartHandler],
  components: {
    Pagination,
    Cart
  },
  computed: {
    productFilter() {
      const vm = this;
      if (vm.category === '全部商品') {
        return vm.products;
      } else {
        vm.getAllProduct();
        return vm.products.filter((item) => {
          return item.category === vm.category;
        });
      }
    }
  },
  methods: {
    getAllProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$http.get(api).then((res) => {
        vm.products = res.data.products;
      });
    },
    getProductList(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        vm.products = res.data.products;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    moreDetail(id) {
      this.$router.push(`/productInfo/${id}`);
    },
    categoryFilter(e) {
      let categoryData = e.currentTarget.getAttribute('data-category');
      this.category = categoryData;
    },
    backToTop() {
      $('html,body').animate(
        {
          scrollTop: 0
        },
        1000
      );
    }
  },
  mounted() {
    this.carts.carts = JSON.parse(localStorage.getItem('cartList')) || [];
    this.getProductList();
    this.getCartList();
    $(window).scroll(function() {
      if ($(this).scrollTop() > 300) {
        $('.back-to-top').addClass('d-block');
      } else {
        $('.back-to-top').removeClass('d-block');
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.jumbotron-bg {
  background-image: url(https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
  min-height: 300px;
}

.cart-icon {
  position: fixed;
  right: 25px;
  bottom: 25px;
}
.cart-icon::after {
  content: '';
  display: block;
  width: 70px;
  height: 70px;
  background-color: #0077b6;
  position: relative;
  top: -55px;
  right: 9px;
  z-index: -100;
  border-radius: 50%;
}
.coupon {
  background-color: rgba(0, 0, 0, 0.33);
  width: 450px;
}
.detail-href {
  position: relative;
  transition: all 0.3s;
  .detail-bg {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.35);
    position: absolute;
    width: 100%;
    height: calc(100% - 42px);
    transition: opacity 0.3s;
    .btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &:hover .detail-bg {
    opacity: 1;
  }
  .category-tag {
    background-color: #ffc107;
    width: 90px;
    height: 40px;
    position: absolute;
    right: -18px;
    top: 10px;
    text-align: center;
    line-height: 40px;
    border-radius: 8px;
  }
}
.cart-btn {
  color: white;
  padding: 5px;
  transition: background-color 0.3s;
  border-radius: 0 0 0.25rem 0.25rem;
  &:hover {
    text-decoration: none;
    background-color: #ffc107 !important;
    color: #0077b6;
  }
}
.form-sm {
  width: 80%;
  margin-bottom: 0.5rem;
}
.back-to-top {
  position: fixed;
  bottom: 170px;
  right: 15px;
}
@media (min-width: 992px) {
  .cart-icon {
    display: none;
  }
}
</style>
