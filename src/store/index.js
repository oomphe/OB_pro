import Vue from "vue";
import Vuex from "vuex";
import home from "./module/home";
import user from "./module/user";
import app from "./module/app";
import facebook from "./module/facebook";
import getters from "./getters";
// import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    user,
    app,
    facebook
  },
  getters
});
