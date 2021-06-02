<template>
  <div>
    <!-- 渲染產品列表 -->
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary" @click="openModal(true)">
        建立新產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">類別</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">啟用狀態</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in backProducts" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="d-flex">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm mr-1"
              @click="openModal(false, item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pages="pagination"
      @emitProductPage="getProductList"
    ></Pagination>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">
              {{ isNew ? '新增產品' : '編輯產品'}}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
            >
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="cacheProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <!-- 上傳圖片有更動時，執行上傳圖片method -->
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
                <img
                  :src="cacheProduct.imageUrl"
                  class="img-fluid"
                  alt="產品縮圖"
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="cacheProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <select
                      id="category"
                      class="form-control"
                      v-model="cacheProduct.category"
                    >
                      <option value="請選擇分類" disabled>請選擇分類</option>
                      <option
                        v-for="item in category"
                        :value="item"
                        :key="item"
                      >
                        {{ item }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="cacheProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="cacheProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="cacheProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="cacheProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="cacheProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="cacheProduct.is_enabled"
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
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Products',
  data () {
    return {
      cacheProduct: {},
      category: ['台灣好米', '台灣好茶', '黃金畜牧', '國產蜂蜜'],
      isNew: false,
      status: {
        fileUploading: false
      }
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapGetters(['productItem', 'backProducts', 'pagination'])
  },
  methods: {
    getProductList (page = 1) {
      this.$store.dispatch('getProductList', page)
    },
    openModal (isNewParam, item) {
      if (!isNewParam) {
        this.cacheProduct = { ...item }
        this.isNew = false
      } else {
        this.cacheProduct = {}
        this.isNew = true
      }
      $('#productModal').modal('show')
    },
    // 新增&編輯產品
    updateProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      if (!vm.isNew) {
        // eslint-disable-next-line no-const-assign
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.cacheProduct.id}`
        httpMethod = 'put'
      }
      vm.$http[httpMethod](api, { data: vm.cacheProduct })
        .then((response) => {
          if (response.data.success) {
            $('#productModal').modal('hide')
            vm.getProductList()
          }
        })
        .catch(() => {
          vm.$store.dispatch('catchErr', true)
        })
    },
    uploadFile () {
      const vm = this
      const uploadedFile = vm.$refs.files.files[0]
      const fileId = vm.$refs.files.id
      vm.status.fileUploading = true
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.$http
        .post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.data.success) {
            vm.status.fileUploading = false
            vm.$set(vm.cacheProduct, 'imageUrl', response.data.imageUrl)
            document.getElementById(fileId).value = ''
          } else {
            // ? 內層$emit觸發 ('註冊的方法','註冊時預設要帶的參數')
            vm.$bus.$emit('messagePush', response.data.message, 'danger')
          }
        }).catch(() => {
          vm.$store.dispatch('catchErr', true)
        })
    },
    // 刪除特定產品確認Modal
    deleteModal (productItem) {
      this.$store.dispatch('getItem', productItem)
      this.$store.dispatch('backRemoveModal', true)
    }
  },
  mounted () {
    this.getProductList()
  }
}
</script>
