import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
// import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
import "@/assets/main.css";
// import { CardPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

// Vue.use(BootstrapVue);
// Vue.use(BootstrapVueIcons);
// Vue.component("b-card", BCard);
// Vue.use(CardPlugin);
