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
    <div class="container mb-5">
      <ol class="breadcrumb bg-transparent pl-0">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item">
          <router-link to="/shopping">線上商城</router-link>
        </li>
        <li class="breadcrumb-item active">{{ productDetail.title }}</li>
      </ol>
      <div class="row">
        <div class="col-lg-7">
          <div class="d-flex flex-column w-100 align-items-center">
            <img :src="productDetail.imageUrl" class="img-fluid" alt="商品圖" />
            <i
              class="fas fa-medal text-danger mt-4"
              v-if="productDetail.category === '國產蜂蜜'"
              >具有國產蜂蜜認證標章</i
            >
            <img
              src="@/assets/images/蜂蜜認證.png"
              alt="國產蜂蜜認證標章"
              v-if="productDetail.category === '國產蜂蜜'"
            />
          </div>
        </div>
        <div class="col-lg-5">
          <div class="h2">{{ productDetail.title }}</div>
          <div class="d-flex justify-content-end align-items-center">
            <del class="mr-auto">售價 NT${{ productDetail.origin_price }}</del>
            <div class="h3 text-danger">
              網路價 NT$ <strong>{{ productDetail.price }}</strong>
            </div>
          </div>
          <hr />
          <p>商品描述 : <br />{{ productDetail.content }}</p>
          <p>{{ productDetail.description }}</p>
          <div class="form-inline num-select">
            <select class="form-control mr-1" name="num" v-model="cartSelect">
              <option v-for="(num, index) in 10" :value="num" :key="index">
                {{ num }}
              </option>
            </select>
            <a
              href="#"
              class="btn btn-primary"
              @click.prevent="addToCart(productDetail, cartSelect)"
              >加入購物車</a
            >
          </div>
        </div>
      </div>

      <div class="h4 mt-5">你可能也喜歡...</div>
      <hr />
      <div class="row same-category pb-5">
        <div class="col-md-3" v-for="item in categoryFilter" :key="item.id">
            <div class="card detail-href h-100" @click="moreDetail(item)">
              <div class="detail-bg">
                <a
                  href="#"
                  class="btn btn-primary"
                  :class="{ disabled: !item.is_enabled }"
                  @click.prevent="moreDetail(item)"
                  >{{ item.is_enabled ? '查看更多' : '缺貨中' }}</a
                >
              </div>
              <img :src="item.imageUrl" alt="產品圖片" class="card-img-top" />
              <div class="card-body h-100">
                <a href="#" class="h5" @click.prevent="moreDetail(item.id)">{{
                  item.title
                }}</a>
                <div class="d-flex justify-content-end mt-3">
                  <del class="mr-auto">{{ item.origin_price | currency }}</del>
                  <span class="text-warning"
                    >特價<strong class="h6">{{
                      item.price | currency
                    }}</strong></span
                  >
                </div>
              </div>
            </div>
             <a
                href="#"
                class="btn btn-primary cart-btn w-100"
                :class="{ disabled: !item.is_enabled}"
                @click.prevent="addToCart(item, cartSelect)"
                >{{ item.is_enabled === 1 ? '加入購物車' : '缺貨中' }}</a
              >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductInfo',
  data () {
    return {
      productDetail: {},
      cartSelect: 1
    }
  },
  computed: {
    categoryFilter () {
      return this.products.filter((item) => {
        if (item.title !== this.productDetail.title) {
          return item.category === this.productDetail.category
        }
      })
    },
    ...mapGetters(['products', 'carts'])
  },
  methods: {
    getProductDetail (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((res) => {
        vm.productDetail = res.data.product
        vm.$store.dispatch('updateLoading', false)
      }).catch(() => {
        this.$store.dispatch('catchErr', true)
      })
    },
    addToCart (item, num) {
      this.$store.dispatch('addToCart', { item, num })
      $('.alert-primary').addClass('show')
      setTimeout(() => {
        $('.alert-primary').removeClass('show')
      }, 3000)
    },
    getAllProduct () {
      this.$store.dispatch('getAllProduct')
    },
    moreDetail (item) {
      if (item.is_enabled) {
        this.$router.push(`/productInfo/${item.id}`)
        this.getProductDetail(item.id) // 點擊同類型產品能馬上切換頁面
      }
    }
  },
  mounted () {
    const productId = this.$route.params.productId
    this.getProductDetail(productId)
    this.getAllProduct()
  }
}
</script>
<style lang="scss" scoped>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 135px;
  right: 20px;
  z-index: 1100;
}
.same-category {
  width: 100%;
  overflow-x: scroll;
  flex-wrap: nowrap;
}
.detail-href {
  position: relative;
  transition: all 0.3s;
  .detail-bg {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.35);
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s;
    cursor: pointer;
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
}
.cart-btn {
  color: white;
  padding: 5px;
  transition: background-color 0.3s;
  border-radius: 0 0 0.25rem 0.25rem;
  &:hover {
    text-decoration: none;
    background-color: #ffc107;
    color: #0077b6;
    border-color: transparent;
  }
}
.num-select {
  justify-content: flex-end;
}
@media (max-width: 576px) {
  .num-select {
    justify-content: center;
    .btn {
      margin-top: 1rem;
    }
  }
} ;
</style>
