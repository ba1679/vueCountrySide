<template>
  <div>
    <loading :active.sync="isLoading" loader="dots"></loading>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
      <div class="d-flex justify-content-between back-logo">
        <div class="d-flex align-items-center">
          <router-link
            class="d-block logo"
            :to="{ name: 'Index' }"
          ></router-link>
          <div class="h5 text-countryLight ml-lg-2 ml-sm-1 ml-3">
            商業後台管理
          </div>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0 log-out">
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logOut">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {}
  },
  methods: {
    logOut () {
      const vm = this
      vm.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login')
          vm.$store.dispatch('updateLoading', false)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-image: url(~@/assets/images/country_logo.png);
  background-size: cover;
  &::after{
    content:'上田園農產';
    display: block;
    position: absolute;
    bottom: 10px;
    right: 5px;
    z-index: 100;
    color: #081B53;
    background-color: #FAE6AB;
    border-radius: 10px;
    padding: 1px;
    font-size: 12px;
    transform: rotate(-15deg);
  }
}
.icon-transition {
  transition: all 0.3s;
}
.rotate {
  transform: rotate(90deg);
}
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }
  .back-logo {
    width: 100%;
  }
  .log-out {
    text-align: left;
  }
}
</style>
