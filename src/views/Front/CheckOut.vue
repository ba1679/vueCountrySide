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
        <div class="col-8">
          <div class="card">
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
                <strong>{{ (carts.total + 80) | currency }}</strong>
              </div>
            </div>
          </div>
          <div id="collapseCart" class="collapse show" data-parent="#cartDetail">
            <div class="table-responsive my-3">
              <table class="table">
                <tr v-for="item in carts.carts" :key="item.id">
                  <td>
                    <a href="#" class="far fa-trash-alt text-danger" @click.prevent="showAlert(item.id)"></a>
                  </td>
                  <td>{{ item.product.title }}</td>
                  <td>
                    <img :src="item.product.imageUrl" alt="商品圖" class="cart-img" />
                  </td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.product.unit }}</td>
                  <td class="text-right">NT${{ item.total }}</td>
                </tr>
                <tr>
                  <td class="text-right" colspan="5">運費</td>
                  <td class="text-right">80</td>
                </tr>

                <tr>
                  <td class="text-right" colspan="5">總計</td>
                  <td class="text-right">{{ carts.total + 80 }}</td>
                </tr>
                <tr>
                  <td class="text-right text-success" colspan="5" v-if="carts.total !== carts.final_total">折扣價</td>
                  <td class="text-right text-success" v-if="carts.total !== carts.final_total">
                    {{ carts.final_total + 80 }}
                  </td>
                </tr>
              </table>

              <div class="text-right text-success mb-2 ">
                {{ couponMsg }}
              </div>
              <div class="input-group">
                <input type="text" class="form-control" v-model="couponCode" />
                <div class="input-group-append">
                  <a href="#" class="btn btn-outline-success" @click.prevent="useCoupon">套用優惠券</a>
                </div>
              </div>
            </div>
          </div>
          <div class="h3 bg-light text-center text-secondary py-3">訂購人資訊</div>
          <!-- validation-observer(針對整個表單驗證)、validation-provider(針對單一input) -->
          <validation-observer v-slot="{ invalid }">
            <form @submit.prevent="sendOrder">
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
                    寄送方式 :
                  </label>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="shipping" name="shippingOption" />
                    <label class="form-check-label" for="shipping">宅配寄送</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="selfTake" name="shippingOption" />
                    <label class="form-check-label" for="selfTake">到店自取</label>
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
import cartHandler from '../../mixins/getCart.js';
export default {
  name: 'CheckOut',
  data() {
    return {
      couponCode: '',
      couponMsg: '',
      form: {
        //送出訂單的參數
        user: {
          address: ''
        },
        message: ''
      }
    };
  },
  mixins: [cartHandler],
  methods: {
    useCoupon() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      let couponCode = {
        code: vm.couponCode
      };
      this.$http
        .post(api, { data: couponCode })
        .then((res) => {
          vm.couponCode = '';
          if (res.data.success) {
            vm.couponMsg = res.data.message;
            vm.getCartList();
          } else {
            vm.$swal('找不到此優惠券');
          }
        })
        .catch((err) => {
          vm.$swal('找不到此優惠券');
        });
    },
    sendOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      this.$http
        .post(api, { data: vm.form })
        .then((res) => {
          if (res.data.success) {
            console.log(res);
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
  },
  mounted() {
    this.getCartList();
  }
};
</script>
<style scoped>
.alert-rounded {
  border-radius: 50px;
}
</style>
