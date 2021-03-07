import Vue from "vue";
import App from "./App.vue";
import store from "./store";
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Algolia
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
