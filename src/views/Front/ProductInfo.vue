<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mb-5">
      <ol class="breadcrumb bg-transparent pl-0">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item"><router-link to="/shopping">線上商城</router-link></li>
        <li class="breadcrumb-item active">{{ productDetail.title }}</li>
      </ol>
      <div class="row">
        <div class="col-lg-7">
          <div class="d-flex flex-column w-100 align-items-center">
            <img :src="productDetail.imageUrl" class="img-fluid" alt="商品圖" />
            <i class="fas fa-medal text-danger mt-4" v-if="productDetail.category === '國產蜂蜜'"
              >具有國產蜂蜜認證標章</i
            >
            <img
              src="../../assets/images/蜂蜜認證.png"
              alt="國產蜂蜜認證標章"
              v-if="productDetail.category === '國產蜂蜜'"
            />
          </div>
        </div>
        <div class="col-lg-5 ">
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
          <div class="form-inline justify-content-end">
            <select class="form-control mr-1" name="num" v-model="cartSelect">
              <option v-for="(num, index) in 10" :value="num" :key="index">{{ num }}</option>
            </select>
            <a href="#" class="btn btn-primary" @click.prevent="addCart(productDetail.id, cartSelect)">加入購物車</a>
          </div>
        </div>
      </div>

      <div class="h4 mt-5">你可能也喜歡...</div>
      <hr />
      <div class="row same-category">
        <div class="col-md-4" v-for="item in categoryFilter" :key="item.id">
          <div class="card h-100 ">
            <a class="detail-href">
              <div class="detail-bg">
                <a
                  href="#"
                  class="btn btn-primary"
                  :class="{ disabled: !item.is_enabled }"
                  @click.prevent="moreDetail(item.id)"
                  >{{ item.is_enabled ? '查看更多' : '缺貨中' }}</a
                >
              </div>
              <img :src="item.imageUrl" alt="" class="card-img-top" />
            </a>
            <div class="card-body ">
              <a href="#" class="h5" @click.prevent="moreDetail(item.id)">{{ item.title }}</a>
              <div class="d-flex justify-content-end mt-3">
                <del class="mr-auto">{{ item.origin_price | currency }}</del>
                <span class="text-warning"
                  >特價<strong class="h6">{{ item.price | currency }}</strong></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cartHandler from '../../mixins/getCart.js';
export default {
  name: 'ProductInfo',
  data() {
    return {
      isLoading: false,
      productDetail: {},
      products: []
    };
  },
  mixins: [cartHandler], //get cart & add cart
  computed: {
    categoryFilter() {
      return this.products.filter((item) => {
        if (item.title !== this.productDetail.title) {
          return item.category === this.productDetail.category;
        }
      });
    }
  },
  methods: {
    getProductDetail(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        // console.log(res.data.product);
        vm.productDetail = res.data.product;
        vm.isLoading = false;
      });
    },
    addCart(id, num) {
      this.addToCart(id, num);
    },
    getAllProduct() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((res) => {
        vm.products = res.data.products;
        vm.isLoading = false;
      });
    },
    moreDetail(id) {
      this.$router.push(`/productInfo/${id}`);
      this.getProductDetail(id); //點擊同類型產品能馬上切換頁面
    }
  },
  mounted() {
    let productId = this.$route.params.productId;
    this.getProductDetail(productId);
    this.getCartList();
    this.getAllProduct();
  }
};
</script>
<style lang="scss" scoped>
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
</style>
