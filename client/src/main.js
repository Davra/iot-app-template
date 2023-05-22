import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import VueAxios from "vue-axios";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

Vue.use(VueAxios, axios);
//for local dev
if (process.env.VUE_APP_LOCAL_DEV && process.env.VUE_APP_LOCAL_DEV === "true") {
  Vue.axios.defaults.baseURL = "https://" + process.env.VUE_APP_TENANT_HOST;
  Vue.axios.defaults.headers.common.Authorization = "Bearer " + process.env.VUE_APP_TOKEN;
}
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
