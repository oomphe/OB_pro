import { addPages } from "@/api/home";
import { showPages, searchByName } from "../../api/home";
import { Message } from "element-ui";
const home = {
  state: {
    tableData: [], //search results
    fansData: [], //粉丝页数据
    fansTable: [] //粉丝页表格数据
  },
  mutations: {
    //设置tableData的数据
    SET_TABLEDATA(state, data) {
      state.tableData = data;
    },
    //设置fansData的数据
    SET_FANSDATA(state, data) {
      state.fansData = data;
    },
    //设置fansTable的数据
    SET_FANSTABLE(state, data) {
      state.fansTable = data;
    }
  },
  actions: {
    //addPages（添加粉丝页）
    AddPages({ commit }, name) {
      return new Promise(async (resolve, reject) => {
        addPages(name)
          .then(data => {
            if (data.data.code == "200") {
              Message({
                showClose: true,
                message: "添加成功",
                duration: 1000,
                type: "success"
              });
            } else {
              Message({
                showClose: true,
                message: "添加失败",
                duration: 1000,
                type: "error"
              });
            }
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //显示粉丝页数据
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
