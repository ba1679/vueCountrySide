<template>
  <div>
    <section class="container my-5">
      <div class="h2 text-secondary text-center">上田園農產 結帳流程</div>
      <div class="row mt-3">
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
            <small>STEP 1.</small>
            <i class="fas fa-shopping-cart mb-1"></i>
            <p class="h5">確認購物清單</p>
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
        <div class="card mb-2">
          <div class="card-header">
            <div class="h4 text-primary text-center">請確認購物清單</div>
          </div>
          <div class="card-body">
            <div class="table-responsive my-3">
              <table class="table">
                <tr v-for="item in carts" :key="item.id">
                  <td>
                    <a
                      href="#"
                      class="far fa-trash-alt text-danger"
                      @click.prevent="removeCart(item)"
                    ></a>
                  </td>
                  <td class="cart-title">{{ item.title }}</td>
                  <td>
                    <img :src="item.imageUrl" alt="商品圖" class="cart-img" />
                  </td>
                  <td class="d-flex align-items-center">
                    <button type="button" class="btn">
                      <i
                        class="fas fa-minus text-primary"
                        @click="minusItem(item)"
                      ></i>
                    </button>
                    {{ item.qty }}
                    <button type="button" class="btn">
                      <i
                        class="fas fa-plus text-primary"
                        @click="plusItem(item)"
                      ></i>
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
                  <td class="text-right">
                    {{ (cartTotalPrice + handleFee) | currency }}
                  </td>
                </tr>
              </table>

              <div class="text-right text-success mb-2">
                如有折扣碼可於確認購買後輸入
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <div class="h4 text-center">訂購須知</div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="card-body">
                <ul class="container list-style-none">
                  <li>
                    ※ 請確認所填寫的資料是否正確，下單後未提供修改付款方式服務。
                  </li>
                  <li>
                    ※
                    因家禽每隻肉質、大小不同，圖片僅供參考，實際請以收到商品為準。
                  </li>
                  <li>
                    ※ 本店商品目前只供應台灣地區，只提供店內自取及宅配到府
                  </li>
                  <li>※ 若購買黃金畜牧產品，皆以低溫冷藏配送。</li>
                  <li>※ 本店商品為統一會於付款後7個工作日內出貨(不含假日)。</li>
                </ul>
                <div class="d-flex justify-content-end">
                  <router-link
                    :to="{ name: 'Shopping' }"
                    class="btn btn-secondary mr-1"
                    >繼續逛逛</router-link
                  >
                  <button
                    type="submit"
                    class="btn btn-primary"
                    @click="confirmCart"
                  >
                    確認購買
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CheckOut',
  data () {
    return {
      handleFee: 80
    }
  },
  computed: {
    cartTotalPrice () {
      let total = 0
      this.carts.forEach((item) => {
        total += item.total
      })
      return total
    },
    ...mapGetters(['carts'])
  },
  methods: {
    plusItem (item) {
      this.$store.dispatch('plusItem', item)
    },
    minusItem (item) {
      this.$store.dispatch('minusItem', item)
    },
    removeCart (item) {
      this.$store.dispatch('removeCart', item)
    },
    confirmCart () {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      vm.carts.forEach((cartItem) => {
        const cache = {
          product_id: cartItem.product_id,
          qty: cartItem.qty
        }
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        vm.$http.post(api, { data: cache }).then(() => {
          vm.$store.dispatch('updateLoading', false)
          vm.$router.push('/orderForm')
        }).catch(() => {
          this.$store.dispatch('catchErr', true)
        })
      })
    },
    ...mapActions(['cleanCart'])
  },
  mounted () {
    $('.modal-backdrop').remove()
    $('body').removeClass('modal-open')
    this.cleanCart()
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
