<template>
  <div>
    <section class="containter">
      <div class="row my-3">
        <div class="col-lg-4 mb-2">
          <div class="card text-center py-2 h-100">
            <div
              class="card-body d-flex justify-content-around align-items-center"
            >
              <i class="fas fa-wallet text-primary fa-3x"></i>
              <div>
                <div class="h4">目前總收益</div>
                <div class="h5">{{ totalPaid | currency }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-2">
          <div class="card text-center py-2 h-100">
            <div
              class="card-body d-flex justify-content-around align-items-center"
            >
              <i class="fas fa-clipboard-list text-primary fa-3x"></i>
              <div>
                <div class="h4">訂單總量</div>
                <div class="h3">{{ orderList.length }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 mb-2">
          <div class="card text-center py-2 h-100">
            <div
              class="card-body d-flex justify-content-around align-items-center"
            >
              <i class="fas fa-file-invoice-dollar text-primary fa-3x"></i>
              <div>
                <div class="h4">應收貨款</div>
                <div class="h5 text-danger">{{ totalUnPaid | currency }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-lg-6 mb-2">
          <div class="card">
            <div class="card-header">產品類別售出總數</div>
            <div class="card-body">
              <div id="chart"></div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">單一產品售出排名</div>
            <div class="card-body">
              <div id="chartProduct"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Chart',
  data () {
    return {
      orderList: [],
      chartCategoryAry: [],
      chartProductAry: [],
      products: []
    }
  },
  computed: {
    totalPaid () {
      if (this.orderList.length !== 0) {
        const paidOrder = this.orderList.filter((item) => {
          return item.is_paid
        })
        const totalAry = paidOrder.map((el) => el.total)
        return totalAry.reduce((a, b) => a + b)
      } else {
        return '目前無訂單'
      }
    },
    totalUnPaid () {
      if (this.orderList.length !== 0) {
        const unPaidOrder = this.orderList.filter((item) => !item.is_paid)
        const totalAry = unPaidOrder.map((el) => el.total)
        return totalAry.reduce((a, b) => a + b)
      } else {
        return '目前無訂單'
      }
    }
  },
  methods: {
    getOrderList (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http
        .get(api)
        .then((response) => {
          vm.orderList = response.data.orders
          vm.renderCategoryChart()
          vm.renderProductChart()
          vm.$store.dispatch('updateLoading', false)
        })
        .catch(() => {
          vm.$store.dispatch('catchErr', true)
        })
    },
    renderCategoryChart () {
      const vm = this
      const categoryAry = []
      vm.orderList.forEach((item) => {
        categoryAry.push(Object.values(item.products))
      })
      const categoryObj = {}
      categoryAry.forEach((categoryItem) => {
        categoryItem.forEach((item) => {
          vm.products.push(item.product)
        })
      })
      vm.products.forEach((productItem) => {
        if (!categoryObj[productItem.category]) {
          categoryObj[productItem.category] = 1
        } else {
          categoryObj[productItem.category] += 1
        }
      })
      const chartAry = Object.keys(categoryObj)
      chartAry.forEach((aryItem) => {
        const ary = []
        ary.push(aryItem)
        ary.push(categoryObj[aryItem])
        vm.chartCategoryAry.push(ary)
      })
      // eslint-disable-next-line no-unused-vars,no-undef
      const chart = c3.generate({
        bindto: '#chart',
        data: {
          type: 'bar',
          columns: vm.chartCategoryAry
        },
        color: {
          pattern: ['#ED7D31', '#5A9BD5', '#FFC000', '#2a9d8f']
        }
      })
    },
    renderProductChart () {
      const vm = this
      const productObj = {}
      vm.products.forEach((item) => {
        if (!productObj[item.title]) {
          productObj[item.title] = 1
        } else {
          productObj[item.title] += 1
        }
      })
      const chartAry = Object.keys(productObj)
      chartAry.forEach((aryItem) => {
        const ary = []
        ary.push(aryItem)
        ary.push(productObj[aryItem])
        vm.chartProductAry.push(ary)
      })
      vm.chartProductAry.sort((a, b) => {
        return b[1] - a[1]
      })
      if (vm.chartProductAry.length > 3) {
        let otherTotal = 0
        vm.chartProductAry.forEach((item, index, ary) => {
          if (index > 2) {
            otherTotal += ary[index][1]
          }
        })
        vm.chartProductAry.splice(3, vm.chartProductAry.length)
        vm.chartProductAry.push(['其他', otherTotal])
      }
      // eslint-disable-next-line no-unused-vars,no-undef
      const chartProduct = c3.generate({
        bindto: '#chartProduct',
        data: {
          type: 'pie',
          columns: vm.chartProductAry
        },
        color: {
          pattern: ['#ED7D31', '#5A9BD5', '#FFC000', '#2a9d8f']
        }
      })
    }
  },
  mounted () {
    this.getOrderList()
  }
}
</script>
