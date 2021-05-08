<template>
  <div class="d-flex justify-content-center">
    <!-- bs4 分頁 -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pages.has_pre }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProductPages(pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: pages.current_page == page }"
          v-for="page in pages.total_pages"
          :key="page"
        >
          <a class="page-link" href="#" @click.prevent="getProductPages(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pages.has_next }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getProductPages(pages.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['pages'], //透過page將外層資料傳進來,
  methods: {
    getProductPages(pages) {
      this.$emit('emitProductPage', pages); //觸發內層getProductPages => 觸發外層emitProductPage => 觸發最終所需methods
    }
  }
};
</script>
