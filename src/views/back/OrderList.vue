<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 渲染訂單列表 -->
    <h2 class="text-center mt-3">訂單列表</h2>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#placeOrderModal">
        <i class="fas fa-shopping-cart mr-2"></i>快速下單
      </button>
    </div>

    <div class="table-responsive mt-4">
      <table class="table table-hover">
        <thead>
          <tr>
            <th width="80">姓名</th>
            <th width="80">Email</th>
            <th width="80">電話</th>
            <th width="130">訂單資料</th>
            <th width="115">狀態</th>
            <th width="100">總金額</th>
            <th width="100">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderList" :key="item.id">
            <td>{{ item.user.name }}</td>
            <td>{{ item.user.email }}</td>
            <td>{{ item.user.tel }}</td>
            <td>
              <button class="btn btn-outline-primary btn-sm mr-1" @click="openProductModal(item)">
                訂單內容
              </button>
            </td>
            <td>
              <span v-if="item.is_paid" class="text-success">已付款</span>
              <span v-else>未付款</span>
            </td>
            <td>{{ item.total | currency }}</td>
            <td>
              <div class="btn-group btn-group-sm" role="group">
                <button type="button" class="btn btn-outline-secondary" @click="openModal(item)">編輯</button>
                <button
                  type="button"
                  class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                ></button>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#">匯出訂單</a>
                  <a class="dropdown-item" href="#">付款資訊</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item text-danger" href="#">刪除訂單</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :pages="pagination" @emitProductPage="getOrderList"></Pagination>
    <!-- Modal -->
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">
              <span>修改訂單</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="name">訂購姓名</label>
                  <input type="text" class="form-control" id="name" v-model="cacheOrder.user.name" />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="address">寄送地址</label>
                    <input type="text" class="form-control" id="address" v-model="cacheOrder.user.address" />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="tel">電話</label>
                    <input type="tel" class="form-control" id="tel" v-model="cacheOrder.user.tel" />
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateOrder(cacheOrder.id)">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="orderProductsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">
              <span>訂單內容</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>訂單編號: {{ cacheOrder.id }}</h5>
            <table class="table table-striped table-responsive-lg">
              <thead>
                <tr>
                  <th scope="col">品名</th>
                  <th scope="col">數量</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">優惠碼</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cacheOrder.products" :key="item.id">
                  <th scope="row">{{ item.product.title }}</th>
                  <td>{{ item.qty }} / {{ item.product.unit }}</td>
                  <td>{{ item.product.price | currency }}</td>
                  <td v-if="item.final_total">
                    {{ parseInt(item.final_total) | currency }}
                  </td>
                  <td v-if="item.coupon" class="text-success">
                    {{ item.coupon.code }}
                  </td>
                  <td v-else>無使用</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="text-right">總價</td>
                  <td class="text-right">{{ parseInt(cacheOrder.total) | currency }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 下單Modal -->
    <div class="modal fade" id="placeOrderModal" tabindex="-1" data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="editModalLabel">快速下單</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="name">姓名</label>
                  <input type="text" class="form-control" id="name" />
                </div>
                <div class="form-group col-md-6">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" />
                </div>
              </div>
              <div class="form-group">
                <label for="address">寄送地址</label>
                <input type="text" class="form-control" id="address" placeholder="請輸入路名、街道、樓層" />
              </div>
              <div class="form-row">
                <div class="form-group col-md-5">
                  <label for="city">城市</label>
                  <input type="text" class="form-control" id="city" />
                </div>
                <div class="form-group col-md-4">
                  <label for="zone">區域</label>
                  <select id="zone" class="form-control">
                    <option selected>請選擇...</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="zip">郵遞區號</label>
                  <input type="text" class="form-control" id="zip" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-8">
                  <label for="product">購買品項</label>
                  <select class="form-control" name="product" id="product">
                    <option v-for="item in products" :value="item.title" :key="item.id">{{ item.title }}</option>
                  </select>
                </div>
                <div class="form-group col-md-4">
                  <label for="num">數量</label>
                  <select id="num" class="form-control">
                    <option selected>請選擇...</option>
                    <option v-for="(num, index) in 10" :value="num" :key="index">{{ num }}</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">確認下單</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import Pagination from '../../components/Pagination';

export default {
  name: 'OrderList',
  data() {
    return {
      orderList: [
        {
          create_at: '',
          id: '',
          is_paid: false,
          num: 1,
          products: {
            product: []
          },
          total: 0,
          user: {}
        }
      ],
      products: [],
      cacheOrder: {
        final_total: '',
        coupon: {
          code: ''
        },
        products: [],
        user: {}
      },
      pagination: {},
      isLoading: false
    };
  },
  components: {
    Pagination
  },
  methods: {
    getOrderList(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      let vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.orderList = response.data.orders;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    getAllProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/all`;
      const vm = this;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        vm.products = res.data.products;
      });
    },
    openModal(item) {
      this.cacheOrder = { ...item }; //使用此方法避開物件傳參考
      // 透過click觸發modal開啟
      $('#orderModal').modal('show');
    },
    openProductModal(item) {
      this.cacheOrder = { ...item };
      console.log(this.cacheOrder.coupon);
      $('#orderProductsModal').modal('show');
    },
    // 新增&編輯優惠券
    updateOrder(id) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${id}`;
      let vm = this;
      this.$http
        .put(api, { data: vm.cacheOrder })
        .then((response) => {
          if (response.data.success) {
            $('#orderModal').modal('hide');
            alert('成功修改');
            vm.getOrderList();
          }
        })
        .catch((err) => {
          alert('修改失敗');
          console.log(err);
        });
    }
  },
  mounted() {
    this.getOrderList();
    this.getAllProducts();
  }
};
</script>
