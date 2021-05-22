<template>
  <div>
    <section class="container my-5">
      <div
        class="row mt-3 justify-content-center text-center"
        v-if="order.is_paid"
      >
        <div class="col-8">
          <div class="alert alert-success alert-rounded">
            <div class="h5">結帳完成，感謝購買</div>
          </div>
          <router-link
            :to="{ name: 'Home' }"
            class="btn btn-outline-primary mr-1"
            >回首頁</router-link
          >
          <router-link :to="{ name: 'Shopping' }" class="btn btn-primary mr-1"
            >繼續逛逛</router-link
          >
        </div>
      </div>
      <div class="row mt-3" v-if="!order.is_paid">
        <div class="col-lg-3">
          <div
            class="
              alert alert-secondary
              d-flex
              flex-column
              align-items-center
              alert-rounded
            "
          >
            <small>STEP 1.</small>
            <i class="fas fa-shopping-cart mb-1"></i>
            <p class="h5">確認購物清單</p>
          </div>
        </div>
        <div class="col-lg-3">
          <div
            class="
              alert alert-secondary
              d-flex
              flex-column
              align-items-center
              alert-rounded
            "
          >
            <small>STEP 2.</small>
            <i class="fas fa-info mb-1"></i>
            <p class="h5">輸入訂購人資料</p>
          </div>
        </div>
        <div class="col-lg-3">
          <div
            class="
              alert alert-primary
              d-flex
              flex-column
              align-items-center
              alert-rounded
            "
          >
            <small>STEP 3.</small>
            <i class="fas fa-clipboard-list mb-1"></i>
            <p class="h5">選擇付款方式</p>
          </div>
        </div>
        <div class="col-lg-3">
          <div
            class="
              alert alert-light
              d-flex
              flex-column
              align-items-center
              alert-rounded
            "
          >
            <small>STEP 3.</small>
            <i class="fas fa-check-circle mb-1"></i>
            <p class="h5">完成購買</p>
          </div>
        </div>
      </div>
      <p class="text-center my-4">
        親愛的顧客您好，<br />感謝您訂購我們的優質農產，以下是您的訂購資訊
      </p>
      <div class="row justify-content-center my-3">
        <div class="col-lg-6">
          <div class="table-responsive">
            <table class="table mb-3 text-center">
              <thead>
                <th colspan="2">收件人資料</th>
              </thead>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>連絡電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>寄送地址</th>
                <td>
                  {{ order.user.address ? order.user.address : '到店自取' }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="table-responsive">
            <table class="table mb-3 text-center">
              <thead>
                <th colspan="2">訂單資訊</th>
              </thead>
              <tr>
                <th>訂單編號</th>
                <td>{{ orderId }}</td>
              </tr>
              <tr>
                <th>訂單日期</th>
                <td>{{ timeTransform }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td :class="{ 'text-success': order.is_paid }">
                  {{ order.is_paid ? '已付款' : '未付款' }}
                </td>
              </tr>
              <tr>
                <th>訂單金額</th>
                <td>{{ order.total | currency }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <div class="card">
          <div class="card-header" id="cartDetail">
            <div class="d-flex justify-content-around align-items-center">
              <a
                class="btn btn-link btn-block text-left"
                href="#"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
              >
                購物車明細
              </a>
              <strong>{{ order.total | currency }}</strong>
            </div>
          </div>
        </div>
        <div id="collapseOne" class="collapse show" data-parent="#cartDetail">
          <div class="table-responsive">
            <table class="table">
              <tr v-for="item in order.products" :key="item.id">
                <td class="cart-item">{{ item.product.title }}</td>
                <td>
                  <img
                    :src="item.product.imageUrl"
                    alt="商品圖"
                    class="cart-img"
                  />
                </td>
                <td>{{ item.qty }}</td>
                <td>{{ item.product.unit }}</td>
                <td>{{ item.product.origin_price | currency }}</td>
                <td class="text-right">{{ item.final_total | currency }}</td>
                <td class="text-right text-success" v-if="item.coupon">
                  已套用優惠券
                </td>
              </tr>
              <tr>
                <td colspan="6" class="text-right">處理費</td>
                <td class="text-right">{{ handleFee | currency }}</td>
              </tr>

              <tr>
                <td colspan="6" class="text-right">合計</td>
                <td class="text-right">
                  <strong class="h4">{{
                    (order.total + handleFee) | currency
                  }}</strong>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div class="text-center mt-3" v-if="!order.is_paid">
          <div class="h5 pb-2">選擇付款方式</div>
          <form @submit.prevent="payOrder">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="payment"
                id="creditCard"
                value="信用卡"
                v-model="payMethod"
              />
              <label class="form-check-label" for="creditCard"> 信用卡 </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="payment"
                id="webATM"
                value="網路ATM"
                v-model="payMethod"
              />
              <label class="form-check-label" for="webATM"> 網路ATM </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="payment"
                id="cash"
                value="到店付現"
                v-model="payMethod"
              />
              <label class="form-check-label" for="cash"> 到店付現 </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="payment"
                id="linePay"
                value="LinePay"
                v-model="payMethod"
              />
              <label class="form-check-label" for="linePay"> LinePay </label>
            </div>
            <div class="d-flex justify-content-end mt-3">
              <div :class="{ 'd-none': order.is_paid }">
                <button
                  type="button"
                  class="btn btn-secondary mr-1"
                  @click="confirmAlert"
                >
                  取消
                </button>
                <button type="button" class="btn btn-primary">確認付款</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  name: 'ConfirmOrder',
  data() {
    return {
      orderId: '',
      order: {
        coupon: '',
        products: [],
        user: {},
      },
      payMethod: '信用卡',
      handleFee: 80,
    };
  },
  computed: {
    timeTransform() {
      const date = new Date(this.order.create_at * 1000).toLocaleDateString();
      return date;
    },
  },
  methods: {
    getOrderList(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      vm.$http
        .get(api)
        .then((res) => {
          vm.order = res.data.order;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirmAlert() {
      const vm = this;
      vm.$swal({
        title: '取消後需重新選購商品',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定',
      }).then((result) => {
        if (result.isConfirmed) {
          vm.cleanCart();
          this.$router.push('/shopping');
        }
      });
    },
    cleanCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      const cacheID = [];
      vm.$http
        .get(api)
        .then((res) => {
          const cacheData = res.data.data.carts;
          cacheData.forEach((item) => {
            cacheID.push(item.id);
          });
        })
        .then(() => {
          cacheID.forEach((item) => {
            vm.$http
              .delete(
                `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item}`
              )
              .then(() => {
                vm.$router.push('/shopping');
              });
          });
        });
    },
    payOrder() {
      const vm = this;
      const id = vm.orderId;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`;
      vm.$http
        .post(api)
        .then((res) => {
          vm.getOrderList(id);
          vm.$swal('付款成功，感謝購買!', '', 'success');
          $('html,body').scrollTop(0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.orderId = this.$route.params.orderId;
    this.getOrderList(this.orderId);
  },
};
</script>
<style scoped>
.alert-rounded {
  border-radius: 50px;
}
.cart-item {
  min-width: 100px;
}
</style>
