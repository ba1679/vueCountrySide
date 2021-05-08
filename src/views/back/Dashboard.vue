<template>
  <div>
    <!-- 固定顯示的部分使用元件&標籤載入 -->
    <Navbar />
    <Alert />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../components/back/Sidebar.vue';
import Navbar from '../../components/back/Navbar.vue';
import Alert from '../../components/AlertMessage.vue';

export default {
  components: {
    Sidebar,
    Navbar,
    Alert
  },
  created() {
    // 讀取cookie語法
    const tokenCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hsinToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    //axios語法，將cookie往後端發送
    this.$http.defaults.headers.common.Authorization = tokenCookie;
  }
};
</script>
