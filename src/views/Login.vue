<template>
  <div>
    <!-- bootstrap的範例登入html -->
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="user.username"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      />
      <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> Remember me </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    signin() {
      const vm = this; //post為箭頭函式，因此需先將this存起來
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          // 先把cookie存起來，才能正確傳到後端
          const token = response.data.token;
          const expired = response.data.expired;
          // MDN 寫入cookie語法，必須寫在轉址之前
          document.cookie = `hsinToken=${token};expires=${new Date(expired)};`;
          // 使用this.$router.push 可切換頁面的path
          vm.$router.push('/admin/products');
        }
      });
    }
  }
};
</script>

<style scoped>
/* bootstrap 的範例登入css */

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
  max-width: 330px;
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
