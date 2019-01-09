import Vue from "vue";
import Vuex from "vuex";
import home from "./module/home";
import user from "./module/user";
import app from "./module/app";
import getters from "./getters";
// import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    user,
    app
  },
  getters
  // // 持久化vuex状态
  // plugins: [createPersistedState({
  //   storage: {
  //     getItem: key => utils.getLocal(key),
  //     setItem: (key, value) => utils.saveLocal(key, value, 1 * 24 * 60 * 60),
  //     removeItem: key => utils.removeLocal(key)
  //   }
  // })]
});
