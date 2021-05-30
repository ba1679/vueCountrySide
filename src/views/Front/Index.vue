<template>
  <div>
    <swiper
      class="swiper"
      :options="swiperOptions"
      :not-next-tick="notNextTick"
      ref="mySwiper"
    >
      <swiper-slide class="slide bg-cover carousel-honey">
        <div class="carousel-caption bg-transparent">
          <router-link :to="{ name: 'Shopping' }" class="btn btn-primary"
            >馬上購買</router-link
          >
        </div>
      </swiper-slide>
      <swiper-slide class="slide bg-cover carousel-tea">
        <div class="carousel-caption d-none d-md-block">
          <h5>台灣高山茶葉</h5>
          <p>絕無參雜劣質不明來源茶葉</p>
          <router-link :to="{ name: 'Shopping' }" class="btn btn-primary"
            >馬上購買</router-link
          >
        </div>
      </swiper-slide>
      <swiper-slide class="slide bg-cover carousel-hen">
        <div class="carousel-caption d-none d-md-block">
          <h5>小農親自餵養</h5>
          <p>堅持給你最好的雞</p>
          <router-link :to="{ name: 'Shopping' }" class="btn btn-primary"
            >馬上購買</router-link
          >
        </div>
      </swiper-slide>
      <swiper-slide class="slide bg-cover carousel-rice">
        <div class="carousel-caption d-none d-md-block">
          <h5>台灣農民用心耕種</h5>
          <p>100%台灣好米，值得您支持</p>
          <router-link :to="{ name: 'Shopping' }" class="btn btn-primary"
            >馬上購買</router-link
          >
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
    </swiper>
    <section class="py-6" data-aos="fade-up" data-aos-duration="2000">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2>青年返鄉</h2>
            <p class="my-3 text-indent">
              就讀商業學系的年輕人，為了將台灣優良的農產宣傳出去，放棄了原本高薪的工作，返鄉務農，並集結其他青年小農一起合作，將自己家的畜牧業、稻米、結合台灣好茶、國家認證蜂蜜，結合起來，努力讓更多人認同!
            </p>
          </div>
          <div class="col-md-6 position-relative">
            <div class="product-md-center">
              <div class="product-circle">
                <img
                  class="icon tea-icon"
                  src="@/assets/images/green-tea.svg"
                  alt="茶icon"
                />
                <img
                  class="icon hen-icon"
                  src="@/assets/images/hen.svg"
                  alt="雞icon"
                />
                <img
                  class="icon honey-icon"
                  src="@/assets/images/honey.svg"
                  alt="蜂蜜icon"
                />
                <img
                  class="icon rice-icon"
                  src="@/assets/images/rice-bowl.svg"
                  alt="米icon"
                />
                <div class="sr-only">
                  Icons made by
                  <a href="https://www.freepik.com" title="Freepik">Freepik</a>
                  from
                  <a href="https://www.flaticon.com/" title="Flaticon"
                    >www.flaticon.com</a
                  >
                </div>
                <div class="taiwan">
                  <img
                    class="img-fluid"
                    src="@/assets/images/taiwan.png"
                    alt="台灣圖"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container py-6" data-aos="fade-up" data-aos-duration="2000">
      <div class="row">
        <div class="col-md-6 order-md-2">
          <h3>為什麼想返鄉務農?</h3>
          <p class="text-indent">
            在經過了時代的變遷，當初在農村土地上長大的孩子，離開了故鄉，在城市讀書、工作、生活，帶著有別於傳統社會的知識、方法以及觀念重新投入農業後，農業已開始發生了非常有趣的質變，不論是產業、技術、行銷通路，以及世代的價值觀，都不再是傳統農業中只能被市場剝削、勞力工作以及無法溫飽的弱勢職業。
          </p>
        </div>
        <div class="col-md-6 order-md-1">
          <div class="d-flex justify-content-center align-items-center">
            <img
              src="@/assets/images/countrySide.png"
              class="countrySide-img"
              alt="countrySide"
            />
          </div>
          <div class="h3 text-center pt-3 font-weight-bold">COUNTRYSIDE</div>
        </div>
      </div>
    </section>
    <!-- 小農的堅持 -->
    <section class="container-fluid py-6 promise-bg bg-cover">
      <div class="row text-center justify-content-center">
        <div class="col-md-5">
          <div class="display-4 farm-promise text-center">小農的堅持</div>
        </div>
        <div class="col-md-5">
          <div class="row mt-4">
            <div class="col-6 mb-3">
              <i class="fas fa-recycle fa-3x mb-3 text-primary"></i>
              <h3>環保意識</h3>
            </div>
            <div class="col-6 mb-3">
              <i class="fas fa-leaf fa-3x mb-3 text-success"></i>
              <h3>純淨天然</h3>
            </div>
            <div class="col-6">
              <i class="fas fa-award fa-3x mb-3 text-warning"></i>
              <h3>國家認證</h3>
            </div>
            <div class="col-6">
              <i class="fas fa-times fa-3x mb-3 text-danger"></i>
              <h3>拒用生長激素</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 在地優良農產 -->
    <section class="py-6" data-aos="flip-left" data-aos-duration="2000">
      <h2 class="text-center">在地優良農產</h2>
      <div class="container mt-4">
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="product-intro d-flex flex-column align-items-center">
              <h5 class="product-title">黃金畜牧產品</h5>
              <div class="product-img bg-cover hen-product"></div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="product-intro d-flex flex-column align-items-center">
              <h5 class="product-title">優質台灣茶葉</h5>
              <div class="product-img bg-cover tea-product"></div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="product-intro d-flex flex-column align-items-center">
              <h5 class="product-title">國家認證蜂蜜</h5>
              <div class="product-img bg-cover honey-product"></div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="product-intro d-flex flex-column align-items-center">
              <h5 class="product-title">100%台灣好米</h5>
              <div class="product-img bg-cover rice-product"></div>
            </div>
          </div>
        </div>

        <div class="mt-3 text-center">
          <router-link
            class="btn btn-primary shopping-btn"
            :to="{ name: 'Shopping' }"
            >趕緊去逛逛<i class="fas fa-arrow-right"></i
          ></router-link>
        </div>
      </div>
    </section>

    <section
      class="container-fluid text-white bg-cover"
      style="
        background-image: url(https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
      "
    >
      <div class="py-6 px-4">
        <div class="bg-filter p-3">
          <small>加入我們</small>
          <h3>集合青年力量，讓更多人知道台灣農產</h3>
          <p class="text-indent">
            近幾年，有許多新聞及報章雜誌在談有關「青壯年返鄉」、「嶄新的農業行業」、「新富農」的相關報導，已有許多年輕人返鄉務農的成功案例，及選擇務農為自己的生活方式。
            返鄉青年回鄉務農，殺出另一條嶄新的農業道路，使得在臺灣各行各行業的人重新回到土地上，投入務農的行列。
          </p>
          <button type="button" class="btn btn-outline-warning">
            加入我們
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
      notNextTick: true,
      swiperOptions: {
        spaceBetween: 30,
        effect: 'fade',
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.slide {
  height: 450px;
}
.carousel-caption {
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.carousel-honey {
  background-image: url(~@/assets/images/banner1.jpg);
}
.carousel-rice {
  background-image: url('https://p6-tt.byteimg.com/origin/pgc-image/4f4f8dab782f4e03b42738c87d6c1ee6?from=pc');
}
.carousel-hen {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/0/07/%E9%9B%B2%E6%9E%97%E7%AB%8B%E7%91%9E%E7%95%9C%E7%94%A2%E5%85%AC%E5%8F%B8%E7%9A%84%E9%A4%8A%E9%9B%9E%E5%A0%B4.jpg');
}
.carousel-tea {
  background-image: url('https://p6-tt.byteimg.com/origin/pgc-image/SRnKTpxHjwQp5d?from=pc');
}
.icon {
  width: 75px;
  height: 75px;
  position: absolute;
}
.tea-icon {
  right: -10px;
}
.hen-icon {
  left: -10px;
}
.rice-icon {
  right: 0px;
  bottom: 15px;
}
.honey-icon {
  left: 0px;
  bottom: 15px;
}
.taiwan {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.product-circle {
  width: 250px;
  height: 250px;
  border: 2px dashed #4a9797;
  border-radius: 50%;
  position: relative;
}
.product-img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
.product-title {
  text-align: center;
}
.hen-product {
  background-image: url(~@/assets/images/S__24330252.jpg);
}
.tea-product {
  background-image: url(~@/assets/images/tea.jpg);
}
.rice-product {
  background-image: url(~@/assets/images/S__24330255.jpg);
}
.honey-product {
  background-image: url(~@/assets/images/intro.jpg);
}
.countrySide-img {
  width: 200px;
  height: 200px;
}

.product-md-center {
  display: flex;
  justify-content: center;
}
.promise-bg {
  background-image: url(~@/assets/images/小農堅持.jpg);
  color: #e3f2fd;
}
.bg-filter {
  backdrop-filter: blur(3px);
  border-radius: 20px;
}
@media (min-width: 768px) {
  .register-content {
    width: 680px;
  }
  .promise-bg {
    color: rgba(0, 0, 0, 0.6);
  }
}
.farm-promise {
  writing-mode: vertical-lr;
  position: relative;
  right: 0;
  left: 0;
  margin: auto;
}
.fa-arrow-right {
  margin-left: 5px;
  transition: all 0.3s;
}
.shopping-btn:hover {
  .fa-arrow-right {
    transform: translateX(5px);
  }
}
</style>
