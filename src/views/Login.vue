<template>
  <div>
    <loading :active.sync="isLoading" loader="dots"></loading>
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">請輸入帳號及密碼登入</h1>
      <label for="inputEmail" class="sr-only">帳號</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="帳號"
        v-model="user.username"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">密碼</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="密碼"
        v-model="user.password"
        required
      />
      <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> 記住我 </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        登入
      </button>
      <router-link :to="{ name: 'Index' }">返回首頁</router-link>
      <p class="mt-5 mb-3 text-muted">&copy; 2021 上田園農產後台管理系統</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.isLoading = true;
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          // 先把cookie存起來，才能正確傳到後端
          const token = response.data.token;
          const expired = response.data.expired;
          // 寫入cookie語法，必須寫在轉址之前
          document.cookie = `hsinToken=${token};expires=${new Date(expired)};`;
          vm.$router.push('/admin/products');
        } else {
          vm.isLoading = false;
          vm.$swal('帳號或密碼錯誤');
        }
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 390px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
