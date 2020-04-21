import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";
import axios from "axios";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      this.$store.commit("USER_DATA_SET", user);
    }

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status == 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  render: h => h(App)
}).$mount("#app");
