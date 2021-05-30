<template>
  <div>
    <!-- 地圖&表單 -->
    <section class="container-fluid p-5">
      <h2 class="text-center mb-3">想了解更多?</h2>
      <div class="container text-center">
        <p>若有任何問題，歡迎利用以下管道聯絡我們，我們將會盡快回復您!</p>
        <ul class="list-style-none">
          <li>實體店地址: 台中市大肚區文昌二街140巷5號</li>
          <li>電話：04-2699-8985/0983-931-197</li>
        </ul>
        <ul class="d-flex list-style-none mt-2 justify-content-center p-0">
          <li class="mr-1">
            <a href="#" class="text-primary"
              ><i class="fab fa-facebook-square fa-2x"></i
            ></a>
          </li>
          <li class="mr-1">
            <a
              href="https://www.instagram.com/countryside8985/"
              class="text-primary"
              ><i class="fab fa-instagram fa-2x"></i
            ></a>
          </li>
          <li class="mr-1">
            <a href="#" class="text-primary"
              ><i class="fab fa-line fa-2x"></i
            ></a>
          </li>
        </ul>
      </div>

      <div class="row">
        <div class="col-md-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.513231676078!2d120.53495981412213!3d24.15372708439204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693f38d434b697%3A0x51dfe8c55f8b94e9!2z5LiK55Sw5ZyS6L6y55Si6KGM!5e0!3m2!1szh-TW!2stw!4v1619179582117!5m2!1szh-TW!2stw"
            width="100%"
            height="460px"
            style="border: 0"
            loading="lazy"
          ></iframe>
        </div>
        <div class="col-md-6">
          <validation-observer v-slot="{ invalid }">
            <form>
              <div class="form-group">
                <validation-provider
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <label for="name"
                    >姓名 <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :class="classes"
                    id="name"
                    name="姓名"
                    v-model="form.name"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <label for="tel"
                    >電話 <span class="text-danger">*</span></label
                  >
                  <input
                    type="tel"
                    class="form-control"
                    :class="classes"
                    id="tel"
                    name="電話"
                    v-model="form.tel"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="email" v-slot="{ errors, classes }">
                  <label for="email">Email </label>
                  <input
                    type="email"
                    class="form-control"
                    :class="classes"
                    id="email"
                    v-model="form.email"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <label
                >哪種聯絡方式較方便? <span class="text-danger">*</span></label
              >
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  id="contactTel"
                  name="contactTel"
                  value="tel"
                  class="custom-control-input"
                  checked
                  v-model="form.contact"
                />
                <label class="custom-control-label" for="contactTel"
                  >電話</label
                >
              </div>
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  id="contactEmail"
                  name="contactEmail"
                  class="custom-control-input"
                  value="Email"
                  v-model="form.contact"
                />
                <label class="custom-control-label" for="contactEmail"
                  >Email</label
                >
              </div>

              <div class="text-right">
                <button type="button" class="btn btn-secondary mr-2">
                  取消
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="invalid"
                  :class="{ 'not-allow': invalid }"
                  @click="sendInfo"
                >
                  送出
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Contact',
  data () {
    return {
      form: {
        name: '',
        tel: '',
        email: '',
        contact: ''
      }
    }
  },
  methods: {
    sendInfo () {
      this.$swal('成功送出')
    }
  }
}
</script>
<style scoped>
.not-allow {
  cursor: not-allowed;
}
</style>
