import { addPages } from "@/api/home";
import { showPages, searchByName } from "../../api/home";
const home = {
  state: {
    tableData: [], //search results
    fansData: [], //粉丝页数据
    fansTable: [] //粉丝页表格数据
  },
  mutations: {
    SET_TABLEDATA(state, data) {
      state.tableData = data;
    },
    SET_FANSDATA(state, data) {
      state.fansData = data;
    },
    SET_FANSTABLE(state, data) {
      state.fansTable = data;
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
    ShowPages({ commit }, res) {
      return new Promise(async (resolve, reject) => {
        showPages(res)
          .then(data => {
            commit("SET_FANSDATA", data.data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    SearchByName({ commit }, res) {
      return new Promise(async (resolve, reject) => {
        searchByName(res)
          .then(data => {
            commit("SET_FANSTABLE", data.data);
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
