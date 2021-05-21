<template>
  <div class="d-flex justify-content-center">
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pages.has_pre }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProductPages(pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: pages.current_page === page }"
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
  props: ['pages'],
  methods: {
    getProductPages(pages) {
      this.$emit('emitProductPage', pages);
    }
  }
};
</script>
<style lang="scss" scoped>
.page-item:first-child .page-link {
  border-top-left-radius: 1.25rem;
  border-bottom-left-radius: 1.25rem;
}
.page-item:last-child .page-link {
  border-top-right-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
}
.page-link {
  border-radius: 1.25rem;
  margin: 0 5px;
  transition: all 0.3s;
}
</style>
