<template>
  <div>
    <section class="container  my-5">
      <div class="h2 text-secondary text-center">上田園農產 結帳流程</div>
      <div class="row mt-3">
        <div class="col-lg-4">
          <div class="alert alert-primary d-flex flex-column align-items-center alert-rounded">
            <small>STEP 1.</small>
            <i class="fas fa-info mb-1"></i>
            <p class="h5">輸入訂購人資料</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="alert alert-light d-flex flex-column align-items-center alert-rounded">
            <small>STEP 2.</small>
            <i class="fas fa-clipboard-list  mb-1"></i>
            <p class="h5">確認訂單&選擇付款方式</p>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="alert alert-light d-flex flex-column align-items-center alert-rounded">
            <small>STEP 3.</small>
            <i class="fas fa-check-circle mb-1"></i>
            <p class="h5">完成購買</p>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-8 ">
          <div class="card mb-3">
            <div class="card-header" id="cartDetail">
              <div class="d-flex justify-content-around align-items-center">
                <a
                  class="btn btn-link btn-block text-left"
                  href="#"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseCart"
                >
                  購物車明細
                </a>
                <!-- <strong>{{ (carts.total + 80) | currency }}</strong> -->
              </div>
            </div>
          </div>
          <div id="collapseCart" class="collapse show" data-parent="#cartDetail">
            <div class="table-responsive my-3">
              <table class="table">
                <tr v-for="item in cartData" :key="item.id">
                  <td>
                    <a href="#" class="far fa-trash-alt text-danger" @click.prevent="removeCart(item)"></a>
                  </td>
                  <td>{{ item.title }}</td>
                  <td>
                    <img :src="item.imageUrl" alt="商品圖" class="cart-img" />
                  </td>
                  <td>
                    <button type="button" class="btn">
                      <i class="fas fa-minus text-primary" @click="minusItem(item)"></i>
                    </button>
                    {{ item.qty }}
                    <button type="button" class="btn">
                      <i class="fas fa-plus text-primary" @click="plusItem(item)"></i>
                    </button>
                  </td>
                  <td>{{ item.unit }}</td>
                  <td class="text-right">NT${{ item.total }}</td>
                </tr>
                <tr>
                  <td class="text-right" colspan="5">處理費</td>
                  <td class="text-right">{{ handleFee | currency }}</td>
                </tr>

                <tr>
                  <td class="text-right" colspan="5">總計</td>
                  <td class="text-right">{{ (cartTotalPrice + handleFee) | currency }}</td>
                </tr>
                <tr>
                  <!-- <td class="text-right text-success" colspan="5" v-if="carts.total !== carts.final_total">折扣價</td>
                  <td class="text-right text-success" v-if="carts.total !== carts.final_total">
                    {{ (carts.final_total + 80) | currency }}
                  </td> -->
                </tr>
              </table>

              <div class="text-right text-success mb-2 ">{{ couponMsg }} 如有折扣碼可於下一步輸入</div>
              <div class="input-group">
                <input type="text" class="form-control" v-model="couponCode" />
                <div class="input-group-append">
                  <a href="#" class="btn btn-outline-success" @click.prevent="useCoupon"
                    >套用優惠券 <i class="fas fa-circle-notch fa-spin" v-if="status.loading"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
          <div class="h3 bg-light text-center text-secondary py-3">訂購人資訊</div>
          <!-- validation-observer(針對整個表單驗證)、validation-provider(針對單一input) -->
          <validation-observer v-slot="{ invalid }">
            <form @submit.prevent="createOrder">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <validation-provider rules="required" v-slot="{ errors, classes }">
                    <label for="name">訂購人姓名 <span class="text-danger">*</span></label>
                    <input
                      type="text"
                      class="form-control"
                      :class="classes"
                      name="姓名"
                      id="name"
                      placeholder="請輸入姓名"
                      v-model="form.user.name"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group col-md-6">
                  <validation-provider rules="required|email" v-slot="{ errors, classes }">
                    <label for="email">訂購人Email <span class="text-danger">*</span></label>
                    <input
                      type="text"
                      class="form-control"
                      :class="classes"
                      name="email"
                      id="email"
                      placeholder="請輸入email"
                      v-model="form.user.email"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
              <div class="form-row">
                <validation-provider class="form-group col-md-6" rules="required" v-slot="{ errors, classes }">
                  <div>
                    <label for="tel">連絡電話 <span class="text-danger">*</span></label>
                    <input
                      class="form-control"
                      :class="classes"
                      type="tel"
                      name="電話"
                      id="tel"
                      v-model="form.user.tel"
                    />
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>

                <div class="form-group col-md-6">
                  <label for="shipping" class="mr-3">
                    取貨方式 :
                  </label>

                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="selfTake" name="shippingOption" checked />
                    <label class="form-check-label" for="selfTake">到店自取</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" id="shipping" name="shippingOption" />
                    <label class="form-check-label" for="shipping">宅配寄送</label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="address">寄送地址 <small class="ml-2">若自取可跳過此欄位</small></label>
                <input
                  type="text"
                  class="form-control"
                  name="address"
                  id="address"
                  placeholder="路名、樓層等等"
                  v-model="form.user.address"
                />
              </div>
              <div class="form-group">
                <label for="message">留言</label>
                <textarea
                  name="留言區"
                  id="message"
                  class="form-control"
                  cols="20"
                  rows="5"
                  placeholder="有什麼特殊需求嗎?"
                  v-model="form.message"
                ></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <router-link :to="{ name: 'Shopping' }" class="btn btn-secondary mr-1">繼續逛逛</router-link>
                <button type="submit" class="btn btn-primary" :disabled="invalid">下一步</button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'CheckOut',
  data() {
    return {
      isLoading: false,
      couponCode: '',
      couponMsg: '',
      handleFee: 80,
      cartData: JSON.parse(localStorage.getItem('cart')) || [],
      form: {
        //送出訂單的參數
        user: {
          address: ''
        },
        message: ''
      },
      status: {
        loading: false
      }
    };
  },
  computed: {
    cartTotalPrice() {
      let total = 0;
      this.cartData.forEach((item) => {
        total += item.total;
      });
      return total;
    }
  },
  methods: {
    plusItem(item) {
      this.cartData.forEach((cartItem) => {
        if (item.product_id === cartItem.product_id) {
          cartItem.qty += 1;
          cartItem.total = cartItem.price * cartItem.qty;
        }
      });
      localStorage.setItem('cart', JSON.stringify(this.cartData));
    },
    minusItem(item) {
      this.cartData.forEach((cartItem) => {
        if (item.product_id === cartItem.product_id) {
          if (cartItem.qty > 1) {
            cartItem.qty -= 1;
            cartItem.total = cartItem.price * cartItem.qty;
          }
        }
      });
      localStorage.setItem('cart', JSON.stringify(this.cartData));
    },
    removeCart(item) {
      this.$swal({
        title: '確定要從購物車移除此商品?',
        showCancelButton: true,
        cancelButtonText: `取消`,
        confirmButtonText: `確定`
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
    useCoupon() {
      const vm = this;
      vm.status.loading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      let couponCode = {
        code: vm.couponCode
      };
      vm.$http
        .post(api, { data: couponCode })
        .then((res) => {
          vm.couponCode = '';
          if (res.data.success) {
            vm.couponMsg = res.data.message;
            vm.status.loading = false;
          } else {
            vm.$swal('找不到此優惠券');
            vm.status.loading = false;
          }
        })
        .catch((err) => {
          vm.$swal('找不到此優惠券');
        });
    },
    createOrder() {
      const vm = this;
      // console.log(this.cartData);
      vm.cartData.forEach((cartItem) => {
        let cache = {
          product_id: cartItem.product_id,
          qty: cartItem.qty
        };
        console.log(cache);
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        vm.$http.post(api, { data: cache }).then(function(res) {
          console.log(res);
        });
      });
    },
    sendOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.$http
        .post(api, { data: vm.form })
        .then((res) => {
          if (res.data.success) {
            let orderId = res.data.orderId;
            vm.$router.push(`/confirmOrder/${orderId}`);
          } else {
            vm.$swal('購物車沒有東西');
          }
        })
        .catch((err) => {
          vm.$swal('送出失敗');
        });
    }
  }
};
</script>
<style scoped>
.alert-rounded {
  border-radius: 50px;
}
</style>
