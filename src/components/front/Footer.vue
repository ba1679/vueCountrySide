<template>
  <div>
    <footer class="bg-primary py-3">
      <router-link :to="{ name: 'Index' }" class="text-decoration-none"
        ><h2 class="text-center text-countryLight">上田園農產</h2></router-link
      >
      <ul class="footer-nav d-flex justify-content-center list-style-none">
        <li class="mr-3">
          <router-link
            :to="{ name: 'Index' }"
            class="text-countryLight a-hover-none"
            >關於我們</router-link
          >
        </li>
        <li class="mr-3">
          <router-link
            :to="{ name: 'Contact' }"
            class="text-countryLight a-hover-none"
            >聯絡我們</router-link
          >
        </li>
        <li class="mr-3">
          <router-link
            :to="{ name: 'Shopping' }"
            class="text-countryLight a-hover-none"
            >線上商城</router-link
          >
        </li>
      </ul>
      <ul class="social d-flex justify-content-center list-style-none p-0">
        <li class="mr-2">
          <a href="#" class="text-countryLight"
            ><i class="fab fa-facebook-square fa-2x"></i
          ></a>
        </li>

        <li class="mr-2">
          <a
            href="https://www.instagram.com/countryside8985/" class="text-countryLight"
            target="_blank"
            >
            <i class="fab fa-instagram fa-2x"></i>
          </a>
        </li>
        <li>
          <a href="#" class="text-countryLight"
            ><i class="fab fa-line fa-2x"></i
          ></a>
        </li>
      </ul>
      <p class="text-center text-gray">
        &copy; copyright 2021 HSINHUI practice 非商業用途
      </p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.footer-nav li {
  border-bottom: 2px solid #e3f2fd;
}
.a-hover-none:hover {
  text-decoration: none;
}
</style>
