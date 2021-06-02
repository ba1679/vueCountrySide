<template>
  <div>
    <section class="container my-5">
      <div class="h2 text-secondary text-center">上田園農產 結帳流程</div>
      <div class="row mt-3">
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
              alert alert-primary
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
              alert alert-light
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
      <div class="mt-3">
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
              <strong>{{ (cartApi.total + handleFee) | currency }}</strong>
            </div>
          </div>
        </div>
        <div id="collapseCart" class="collapse show" data-parent="#cartDetail">
          <div class="table-responsive my-3">
            <table class="table">
              <thead>
                <th>刪除</th>
                <th colspan="2">品名</th>
                <th>數量</th>
                <th>單位</th>
                <th class="text-right">單價</th>
                <th class="text-right">小計</th>
              </thead>
              <tr v-for="item in cartApi.carts" :key="item.id">
                <td>
                  <a
                    href="#"
                    class="far fa-trash-alt text-danger"
                    @click.prevent="removeAlert(item.id)"
                  ></a>
                </td>
                <td class="cart-title">{{ item.product.title }}</td>
                <td>
                  <img
                    :src="item.product.imageUrl"
                    alt="商品圖"
                    class="cart-img"
                  />
                </td>
                <td>
                  {{ item.qty }}
                </td>
                <td>{{ item.product.unit }}</td>
                <td class="text-right">{{ item.product.price | currency }}</td>
                <td class="text-right">NT${{ item.total }}</td>
              </tr>
              <tr>
                <td class="text-right" colspan="6">處理費</td>
                <td class="text-right">{{ handleFee | currency }}</td>
              </tr>

              <tr>
                <td class="text-right" colspan="6">總計</td>
                <td class="text-right">
                  {{ (cartApi.total + handleFee) | currency }}
                </td>
              </tr>
              <tr>
                <td
                  class="text-right text-success"
                  colspan="6"
                  v-if="cartApi.total !== cartApi.final_total"
                >
                  折扣價
                </td>
                <td
                  class="text-right text-success"
                  v-if="cartApi.total !== cartApi.final_total"
                >
                  {{ (cartApi.final_total + handleFee) | currency }}
                </td>
                <td
                  colspan="7"
                  class="text-right text-danger"
                  v-if="status.err"
                >
                  無此折價券
                </td>
              </tr>
            </table>

            <div class="input-group">
              <input type="text" class="form-control" v-model="couponCode" />
              <div class="input-group-append">
                <a
                  href="#"
                  class="btn btn-outline-success"
                  @click.prevent="useCoupon"
                  >套用優惠券
                  <i
                    class="fas fa-circle-notch fa-spin"
                    v-if="status.loading"
                  ></i
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="h3 bg-light text-center text-secondary py-3">
          訂購人資訊
        </div>
        <!-- validation-observer(針對整個表單驗證)、validation-provider(針對單一input) -->
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="sendOrder">
            <div class="form-row">
              <div class="form-group col-md-6">
                <validation-provider
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <label for="name"
                    >訂購人姓名 <span class="text-danger">*</span></label
                  >
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
                <validation-provider
                  rules="required|email"
                  v-slot="{ errors, classes }"
                >
                  <label for="email"
                    >訂購人Email <span class="text-danger">*</span></label
                  >
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
              <validation-provider
                class="form-group col-md-6"
                rules="required"
                v-slot="{ errors, classes }"
              >
                <div>
                  <label for="tel"
                    >連絡電話 <span class="text-danger">*</span></label
                  >
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
                <label for="shipping" class="mr-3"> 取貨方式 : </label>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="selfTake"
                    name="shippingOption"
                    checked
                  />
                  <label class="form-check-label" for="selfTake"
                    >到店自取</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="shipping"
                    name="shippingOption"
                  />
                  <label class="form-check-label" for="shipping"
                    >宅配寄送</label
                  >
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="address"
                >寄送地址 <small class="ml-2">若自取可跳過此欄位</small></label
              >
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
              <button
                type="button"
                class="btn btn-secondary mr-1"
                @click="showAlert"
              >
                取消
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="invalid"
                :class="{ 'not-allow': invalid }"
              >
                下一步
              </button>
            </div>
          </form>
        </validation-observer>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CheckOut',
  data () {
    return {
      couponCode: '',
      couponMsg: '',
      handleFee: 80,
      form: {
        user: {
          address: ''
        },
        message: ''
      },
      status: {
        loading: false,
        err: false
      }
    }
  },
  watch: {
    cartApi () {
      if (!this.cartApi.carts.length) {
        this.$router.push('/shopping')
      }
    }
  },
  computed: {
    ...mapGetters(['cartApi'])
  },
  methods: {
    removeAlert (id) {
      this.$store.dispatch('openModal', true)
      this.$store.dispatch('saveCacheId', id)
    },
    showAlert () {
      this.$store.dispatch('openCancelModal', true)
    },
    useCoupon () {
      const vm = this
      vm.status.loading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const couponCode = {
        code: vm.couponCode
      }
      vm.$http
        .post(api, { data: couponCode })
        .then((res) => {
          vm.couponCode = ''
          if (res.data.success) {
            vm.couponMsg = res.data.message
            vm.getCartList()
            vm.status.loading = false
            vm.status.err = false
          } else {
            vm.status.err = true
            vm.status.loading = false
          }
        })
        .catch(() => {
          vm.$store.dispatch('catchErr', true)
        })
    },
    sendOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.$http
        .post(api, { data: vm.form })
        .then((res) => {
          if (res.data.success) {
            const orderId = res.data.orderId
            vm.$router.push(`/confirmOrder/${orderId}`)
          } else {
            this.$store.dispatch('catchErr', true)
          }
        })
        .catch(() => {
          vm.$store.dispatch('catchErr', true)
        })
    },
    ...mapActions(['getCartList'])
  },
  mounted () {
    this.getCartList()
  }
}
</script>
<style scoped>
.alert-rounded {
  border-radius: 50px;
}
.cart-title {
  min-width: 100px;
}

</style>
