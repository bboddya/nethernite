<template>
  <ais-search-box
    autofocus
    class="col-md-10 offset-md-1 col-sm-12 offset-sm-0 mt-4"
  >
    <div class="search-wrap" slot-scope="{ currentRefinement, refine }">
      <input
        type="search"
        class="form-control"
        :value="currentRefinement"
        @input="refine($event.currentTarget.value)"
      />

      <img
        class="search-icon"
        src="@/assets/img/magnifying-glass.svg"
        alt="magnifying-glass"
      />
    </div>
  </ais-search-box>
</template>

<script>
export default {
  name: "Search",
  data: () => ({}),
};
</script>

<style scoped lang="scss"></style>
