import { addPages, selectByState } from "@/api/home";
import { showPages } from "../../api/home";
const home = {
  state: {
    tableData: [], //search results
    fansData: [] //粉丝页数据
  },
  mutations: {
    SET_TABLEDATA(state, data) {
      state.tableData = data;
    },
    SET_FANSDATA(state, data) {
      state.fansData = data;
    }
  },
  actions: {
    //addPages
    AddPages({ commit }, name) {
      return new Promise(async (resolve, reject) => {
        addPages(name)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    searchByState({ commit }, state) {
      return new Promise(async (resolve, reject) => {
        selectByState(state)
          .then(data => {
            commit("SET_TABLEDATA", data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    ShowPages({ commit }, res) {
      return new Promise(async (resolve, reject) => {
        showPages(res)
          .then(data => {
            commit("SET_FANSDATA", data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default home;
