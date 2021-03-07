<template>
  <div class="app">
    <div class="container">
      <div class="app__inner">
        <SearchResult />
        <Modal />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import SearchResult from "./components/SearchResult/Index";
import Footer from "./components/Footer";
import Modal from "@/components/Modal";

export default {
  name: "App",
  components: {
    SearchResult,
    Footer,
    Modal,
  },

  data: () => ({
    title: "sdfsdf",
  }),
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>