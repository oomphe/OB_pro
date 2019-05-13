import {
  login,
  getUserInfo,
  logOut,
  getProductListByKeyword
} from "@/api/user";
import { Message } from "element-ui";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    name: String,
    status: false,
    roles: [],
    countNum: 0,
    proList: [],
    token: getToken() // 客户端记号
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_ROLES: (state, role) => {
      state.roles = role;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_COUNTNUM: (state, data) => {
      state.countNum = data;
    },
    SET_PROLIST: (state, data) => {
      state.proList = data;
    }
  },
  actions: {
    LoginByUserEmail({ commit }, res) {
      return new Promise((resolve, reject) => {
        login(res)
          .then(data => {
              debugger
              commit("SET_STATUS", true);
              commit("SET_TOKEN", data.data.state);
              sessionStorage.setItem("token", data.data.access_token);
              sessionStorage.setItem("userId", data.data.id);
              Message({
                showClose: true,
                message: "登陆成功",
                duration: 1000,
                type: "success"
              });
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(data => {
            commit("SET_STATUS", true);
            commit("SET_NAME", data.name);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logOut(state.token)
          .then(() => {
            this.dispatch("FedLogOut");
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", null);
        commit("SET_STATUS", false);
        commit("SET_ROLES", []);
        removeToken();
        sessionStorage.clear()
        resolve();
      });
    },
    setCountNum({ commit }, data) {
      commit("SET_COUNTNUM", data);
    }
  }
};
export default user;
