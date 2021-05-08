<template>
  <div>
    <nav id="navbarToggler" class="col-md-3 col-lg-2 d-md-block bg-primary sidebar collapse">
      <div class="position-sticky pt-3">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-countryLight">
          <span>管理員</span>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link text-countryLight" :to="{ name: 'Products' }">
              <i class="fas fa-boxes"></i>
              產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-countryLight" :to="{ name: 'OrderList' }">
              <i class="fas fa-clipboard-list"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-countryLight" :to="{ name: 'Chart' }">
              <i class="fas fa-chart-line"></i>
              銷售圖表分析
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-countryLight" :to="{ name: 'Coupons' }">
              <i class="fas fa-tags"></i>
              優惠券
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<style scoped>
/* @media (max-width: 768px) {
  .sidebar {
    top: 0;
  }
} */
</style>
