<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <div class="container">
        <h1 class="mb-0"><router-link to="/" class="d-block logo">上田園農產</router-link></h1>
        <div class="h3 text-countryLight ml-lg-2 ml-sm-1 eg-logo">CountrySide</div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          @click="changeToggle"
        >
          <i class="fas fa-bars icon-transition" :class="{ rotate: isToggled }"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0 ">
            <li class="nav-item">
              <router-link class="nav-link" href="#" to="/shopping">
                線上商城
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">聯絡我們</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">後台登入</router-link>
            </li>
            <li class="nav-item">
              <Cart class="d-lg-block d-none" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import Cart from '../../components/front/Cart';
import cartHandler from '../../mixins/getCart.js';
export default {
  name: 'Navbar',
  data() {
    return {
      isToggled: false
    };
  },
  components: {
    Cart
  },
  mixins: [cartHandler], //get cart & add cart,
  methods: {
    changeToggle() {
      this.isToggled = !this.isToggled;
    }
  },
  mounted() {
    this.getCartList();
  }
};
</script>
<style lang="scss" scoped>
.logo {
  width: 85px;
  height: 85px;
  overflow: hidden;
  white-space: nowrap;
  color: transparent;
  border-radius: 50%;
  background-image: url(../../assets/images/logo.jpg);
  background-size: cover;
}
.icon-transition {
  transition: all 0.3s;
}
.rotate {
  transform: rotate(90deg);
}
.eg-logo {
  font-family: 'Pacifico', cursive;
}
.nav-link {
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
  &:hover {
    border-color: #e3f2fd;
  }
}

// ruoter-link被點擊後，會自動產生此class name，可使用此class 設定 active後的顏色
.nav-item > .router-link-exact-active {
  color: rgba(0, 0, 0, 0.9) !important;
}
</style>
