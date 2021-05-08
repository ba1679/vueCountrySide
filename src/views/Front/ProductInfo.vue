<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mb-5">
      <ol class="breadcrumb bg-transparent pl-0">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item"><router-link to="/shopping">線上商城</router-link></li>
        <li class="breadcrumb-item active">商品名稱</li>
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
      productDetail: {}
    };
  },
  mixins: [cartHandler], //get cart & add cart
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
    }
  },
  mounted() {
    let productId = this.$route.params.productId;
    this.getProductDetail(productId);
    this.getCartList();
  }
};
</script>
