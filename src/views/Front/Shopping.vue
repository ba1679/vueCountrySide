<template>
  <div>
    <div class="message-alert">
      <div class="alert alert-primary alert-dismissible fade" role="alert">
        <strong>加入購物車成功</strong>
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="jumbotron jumbotron-fluid jumbotron-bg bg-cover pt-3">
      <div class="text-center">
        <div class="h3 mb-4 text-primary">上田園農產 - 線上商城</div>
        <div class="mt-3 d-flex justify-content-center">
          <div class="coupon">
            <p class="h4 p-2 text-white">
              歡慶青年返鄉週年 <br />即日起輸入
              <strong class="text-warning">countryside888 </strong>
              即可享8折優惠!!
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
      <div>
        <ul class="nav nav-tabs mb-3">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: category === '全部商品' }"
              href="#"
              @click.prevent="category = '全部商品'"
              >全部商品</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: category === '台灣好米' }"
              href="#"
              @click.prevent="category = '台灣好米'"
              >台灣好米</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: category === '台灣好茶' }"
              href="#"
              @click.prevent="category = '台灣好茶'"
              >台灣好茶</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: category === '國產蜂蜜' }"
              href="#"
              @click.prevent="category = '國產蜂蜜'"
              >國產蜂蜜</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: category === '黃金畜牧' }"
              href="#"
              @click.prevent="category = '黃金畜牧'"
              >黃金畜牧</a
            >
          </li>
        </ul>
        <div class="row mb-3" :id="category">
          <div
            class="col-lg-3 col-md-6 mb-3"
            v-for="item in productFilter[currentPage]"
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
                  <a href="#" class="h5" @click.prevent="moreDetail(item.id)">
                    {{ item.title }}
                  </a>
                  <div class="d-flex justify-content-end mt-3">
                    <del class="mr-auto">
                      {{ item.origin_price | currency }}
                    </del>
                    <span class="text-warning">
                      特價
                      <strong class="h6">
                        {{ item.price | currency }}
                      </strong>
                    </span>
                  </div>
                </div>
                <a
                  href="#"
                  class="bg-primary btn cart-btn w-100"
                  :class="{ disabled: !item.is_enabled }"
                  @click.prevent="addToCart(item)"
                  >{{ item.is_enabled === 1 ? '加入購物車' : '缺貨中' }}</a
                >
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- pagination -->
    <div class="d-flex justify-content-center">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: !currentPage }">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click.prevent="prev"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li
            class="page-item"
            :class="{ active: currentPage === page - 1 }"
            v-for="page in productFilter.length"
            :key="page"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="currentPage = page - 1"
              >{{ page }}</a
            >
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === filtedProducts.length - 1 }"
          >
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click.prevent="next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <a href="#" class="cart-icon d-lg-none">
      <Cart />
    </a>
    <a
      href="#"
      class="text-warning back-to-top d-none"
      @click.prevent="backToTop"
      ><i class="fas fa-arrow-circle-up fa-3x"></i
    ></a>
    <!-- 手機版購物車Modal -->
    <div
      class="modal fade"
      id="cartModal"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="cartLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cartLabel" v-if="cartData.length !== 0">
              已加入購物車清單
            </h5>
            <h6 v-else>購物車沒有東西喔</h6>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="cartData.length !== 0">
            <div class="table-responsive">
              <table class="table">
                <tr v-for="item in cartData" :key="item.product_id">
                  <td>
                    <a
                      href="#"
                      class="far fa-trash-alt text-danger"
                      @click.prevent="removeCart(item)"
                    ></a>
                  </td>
                  <td class="title-width">{{ item.title }}</td>
                  <td>
                    <img :src="item.imageUrl" alt="商品圖" class="cart-img" />
                  </td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.unit }}</td>
                  <td>NT${{ item.total }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              v-if="cartData.length !== 0"
            >
              繼續購物
            </button>
            <router-link
              :to="{ name: 'CheckOut' }"
              class="btn btn-primary"
              v-if="cartData.length !== 0"
              >結帳去</router-link
            >
            <router-link
              :to="{ name: 'Shopping' }"
              class="btn btn-primary btn-block"
              v-else
              >趕緊購物去</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import Cart from '@/components/front/Cart.vue';
export default {
  name: 'Shopping',
  data: function () {
    return {
      products: [],
      category: '全部商品',
      cartData: JSON.parse(localStorage.getItem('cart')) || [],
      currentPage: 0,
      filtedProducts: [],
    };
  },
  components: {
    Cart,
  },
  watch: {
    currentPage() {
      $('html,body').scrollTop(0);
    },
  },
  computed: {
    productFilter() {
      const vm = this;
      let tempData = [];
      // 確保每次都回歸初始值
      vm.currentPage = 0;
      vm.filtedProducts = [];
      tempData = vm.products.filter((item) => {
        if (vm.category === '全部商品') {
          return vm.products;
        } else {
          return item.category === vm.category;
        }
      });
      tempData.forEach((item, index) => {
        if (index % 8 === 0) {
          vm.filtedProducts.push([]);
        }
        const pagenum = parseInt(index / 8);
        vm.filtedProducts[pagenum].push(item);
      });
      return vm.filtedProducts;
    },
  },
  methods: {
    getAllProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(api).then((res) => {
        vm.products = res.data.products;
        vm.$store.dispatch('updateLoading', false);
      });
    },
    moreDetail(id) {
      this.$router.push(`/productInfo/${id}`);
    },
    addToCart(item) {
      const cacheCartID = [];
      this.cartData.forEach((item) => {
        cacheCartID.push(item.product_id);
      });
      if (cacheCartID.indexOf(item.id) === -1) {
        const cartContent = {
          product_id: item.id,
          qty: 1,
          title: item.title,
          origin_price: item.origin_price,
          price: item.price,
          unit: item.unit,
          imageUrl: item.imageUrl,
        };
        cartContent.total = item.price * cartContent.qty;
        this.cartData.push(cartContent);
        localStorage.setItem('cart', JSON.stringify(this.cartData));
      } else {
        let cache = {};
        this.cartData.forEach((cartItem, keys) => {
          if (cartItem.product_id === item.id) {
            let { qty } = cartItem;
            cache = {
              product_id: item.id,
              qty: (qty += 1),
              title: item.title,
              origin_price: item.origin_price,
              price: item.price,
              unit: item.unit,
              imageUrl: item.imageUrl,
            };
            cache.total = item.price * cache.qty;
            // 移除現有 localStorage 購物車的資料，否則 localStorage 會重複加入
            this.cartData.splice(keys, 1);
          }
        });
        // 將數量已經增加的資料推回陣列中
        this.cartData.push(cache);
        // 重新寫入 localStorage
        localStorage.setItem('cart', JSON.stringify(this.cartData));
      }
      this.$bus.$emit('cartPush', this.cartData);
      $('.alert').addClass('show');
      setTimeout(() => {
        $('.alert').removeClass('show');
      }, 3000);
    },
    removeCart(item) {
      this.$swal({
        title: '確定要從購物車移除此商品?',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal('刪除成功', '', 'success');
          this.cartData.forEach((cartItem, index) => {
            if (item.product_id === cartItem.product_id) {
              this.cartData.splice(index, 1);
            }
          });
          localStorage.setItem('cart', JSON.stringify(this.cartData));
        }
      });
    },
    // 回到最上方
    backToTop() {
      $('html,body').animate(
        {
          scrollTop: 0,
        },
        1000
      );
    },
    // 換頁行為
    prev() {
      const vm = this;
      if (vm.currentPage === 0) {
        vm.currentPage = 0;
      } else {
        vm.currentPage--;
      }
    },
    next() {
      const vm = this;
      if (vm.currentPage === vm.filtedProducts.length - 1) {
        vm.currentPage = vm.filtedProducts.length - 1;
      } else {
        vm.currentPage++;
      }
    },
  },
  mounted() {
    this.getAllProduct();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $('.back-to-top').addClass('d-block');
      } else {
        $('.back-to-top').removeClass('d-block');
      }
    });
  },
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
  right: 12px;
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
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 135px;
  right: 20px;
  z-index: 1100;
}
.page-item:first-child .page-link {
  border-top-left-radius: 1.25rem;
  border-bottom-left-radius: 1.25rem;
}
.page-item:last-child .page-link {
  border-top-right-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
}
.page-link {
  border-radius: 1.25rem;
  margin: 0 5px;
  transition: all 0.3s;
}
</style>
