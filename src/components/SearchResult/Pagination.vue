<template>
  <div class="col-4 offset-4 mt-4 colpagination">
    <ais-pagination>
      <ul
        class="pagination"
        slot-scope="{
          currentRefinement,
          pages,
          isFirstPage,
          isLastPage,
          refine,
          createURL,
        }"
      >
        <li class="page-item" v-if="!isFirstPage">
          <a
            class="page-link"
            :href="createURL(currentRefinement - 1)"
            @click.prevent="refine(currentRefinement - 1)"
          >
            ‹
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pages"
          :key="page"
          :class="page === currentRefinement ? 'page-item active' : 'page-item'"
        >
          <a
            class="page-link"
            :href="createURL(page)"
            @click.prevent="refine(page)"
          >
            {{ page + 1 }}
          </a>
        </li>
        <li class="page-item" v-if="!isLastPage">
          <a
            class="page-link"
            :href="createURL(currentRefinement + 1)"
            @click.prevent="refine(currentRefinement + 1)"
          >
            ›
          </a>
        </li>
      </ul>
    </ais-pagination>
  </div>
</template>

<script>
export default {
  name: "Table",
  data: () => ({}),
};
</script>

<style lang="scss">
</style>
