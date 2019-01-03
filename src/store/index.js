import Vue from "vue";
import Vuex from "vuex";
import home from "./module/home";
import user from "./module/user";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    user
  }
});
