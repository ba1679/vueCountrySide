<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 渲染優惠券列表 -->
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">
        新增優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="150">優惠券名稱</th>
          <th width="120">折扣百分比</th>
          <th width="120">到期日</th>
          <th width="120">折扣碼</th>
          <th width="100">啟用狀態</th>
          <th width="100">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in couponList" :key="item.code">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date }}</td>
          <td>{{ item.code }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="d-flex">
            <button class="btn btn-outline-primary btn-sm mr-1" @click="openModal(false, item)">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal(item.id)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emitProductPage="getCouponList"></Pagination>
    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="couponModal">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">優惠券標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="newCoupon.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">折扣百分比</label>
                    <input
                      type="text"
                      class="form-control"
                      id="percent"
                      placeholder="請輸入折扣百分比"
                      v-model="newCoupon.percent"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="date">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="date"
                      placeholder="請輸入到期日"
                      v-model="newCoupon.due_date"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="折扣碼">折扣碼</label>
                    <input
                      type="text"
                      class="form-control"
                      id="折扣碼"
                      placeholder="請輸入折扣碼"
                      v-model="newCoupon.code"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <div class="form-check">
                    <!-- 原本checkbox的v-model value是true/false 要更改為1/0 -->
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="newCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="checkCoupon(newCoupon.code)">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="deleteModal">
              <span>刪除優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger"></strong>
            優惠券? (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination';

export default {
  name: 'Coupons',
  data() {
    return {
      couponList: [] || JSON.parse(localStorage.getItem('coupons')),
      pagination: {},
      newCoupon: {},
      isLoading: false,
      isNew: false,
      couponId: '',
      todayDate: ''
    };
  },
  components: {
    Pagination
  },
  methods: {
    getCouponList(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.couponList = response.data.coupons;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
        localStorage.setItem('coupons', JSON.stringify(vm.couponList));
        vm.checkDate();
      });
    },
    openModal(isNewParam, item) {
      if (!isNewParam) {
        this.newCoupon = { ...item };
        this.isNew = false;
      } else {
        this.newCoupon = {}; //按編輯後會有產品資料在裡面，所以要先清空
        this.isNew = true;
      }
      $('#couponModal').modal('show');
    },
    checkCoupon(code) {
      let filterCoupon = this.couponList.filter(function(item) {
        return item.code === code;
      });
      if (filterCoupon.length !== 0 && this.isNew) {
        alert('此優惠碼已存在，請更換');
        return;
      }
      this.updateCoupon();
    },
    // 新增&編輯優惠券
    updateCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        // 更改為編輯產品的api及方法
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.newCoupon.id}`;
        httpMethod = 'put';
      }

      // post的api需要帶參數
      vm.$http[httpMethod](api, { data: vm.newCoupon })
        .then((response) => {
          if (response.data.success) {
            $('#couponModal').modal('hide');
            alert('更新優惠券成功');
            vm.getCouponList();
          }
        })
        .catch((err) => {
          alert('新增失敗');
          console.log(err);
        });
    },
    checkDate() {
      const vm = this;
      vm.couponList.forEach(function(item) {
        let due_date = Date.parse(item.due_date.replace(/-/g, '/'));
        let couponTitle = item.title;
        if (vm.todayDate > due_date && item.is_enabled === 1) {
          vm.$swal(`${couponTitle}的優惠日期已到，請取消啟用!`);
          return;
        }
      });
    },
    deleteModal(couponId) {
      this.couponId = couponId;
      $('#deleteModal').modal('show');
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.couponId}`;
      vm.isLoading = true;
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.isLoading = false;
          $('#deleteModal').modal('hide');
          // this.$swal("成功刪除優惠券");
        } else {
          alert('刪除失敗');
        }
        vm.getCouponList(vm.pagination.current_page);
      });
    }
  },
  mounted() {
    this.getCouponList();
    this.todayDate = Date.parse(new Date().toDateString());
  }
};
</script>
