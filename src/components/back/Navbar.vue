<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
      <a href="#" class="d-block logo"></a>
      <div class="h5 text-countryLight ml-lg-2 ml-sm-1">商業後台管理</div>
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0 ">
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logOut">登出</a>
        </li>
      </ul>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler">
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse sidebar-collapse" id="navbarToggler"></div>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {};
  },
  methods: {
    logOut() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.logo {
  width: 70px;
  height: 70px;
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
</style>
