import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    USER_DATA_SET(state, userRegistration) {
      state.user = userRegistration;
      localStorage.setItem("user", JSON.stringify(userRegistration));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userRegistration.token}`;
    },
    USER_DATA_REMOVE(state) {
      state.user = null;
      localStorage.removeItem("user");
      axios.defaults.headers.common["Authorization"] = null;
      location.reload();
    }
  },
  actions: {
    register({ commit }, register) {
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      return axios.post("//localhost:3000/register", register).then(data => {
        commit("USER_DATA_SET", data.data);
      });
    },
    login({ commit }, userCredentials) {
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      return axios
        .post("//localhost:3000/login", userCredentials)
        .then(data => {
          commit("USER_DATA_SET", data.data);
        });
    },
    logout({ commit }) {
      commit("USER_DATA_REMOVE");
    }
  },
  getters: {
    LoggedIn(state) {
      return !!state.user;
    }
  }
});
