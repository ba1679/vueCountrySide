<template>
  <div class="sticky-footer">
    <Navbar class="sticky-top"></Navbar>
    <router-view> </router-view>
    <Footer class="sticky-bottom"></Footer>
  </div>
</template>
<script>
import $ from 'jquery';
import Navbar from '@/components/front/Navbar.vue';
import Footer from '@/components/front/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  },
  watch: {
    $route() {
      $('html,body').scrollTop(0);
      $('.navbar-collapse').removeClass('show');
    }
  }
};
</script>
<style>
.sticky-footer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.sticky-bottom {
  margin-top: auto;
}
</style>
