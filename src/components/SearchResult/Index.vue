<template>
  <ais-instant-search
    class="row search-list"
    :search-client="searchClient"
    index-name="npm-search"
  >
    <Search />
    <Content />
    <Pagination />
    {{ searchClientItem }}
  </ais-instant-search>
</template>

<script>
import algoliasearch from "algoliasearch";
import Pagination from "./Pagination";
import Content from "./Content";
import Search from "./Search";

export default {
  name: "SearchResult",
  components: {
    Pagination,
    Content,
    Search,
  },

  data: () => ({
    packages: "",
    searchClientItem: "",
    page: 1,
    searchClient: algoliasearch(
      "OFCNCOG2CU",
      "f54e21fa3a2a0160595bb058179bfb1e",
      { protocol: "https:" }
    ),
  }),
};
</script>

<style lang="scss">
</style>
