import { loginByUsername, getUserInfo, logOut } from "@/api/user";
import { Message } from "element-ui";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    name: String,
    status: false,
    roles: [],
    countNum: 0,
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
    }
  },
  actions: {
    LoginByUsername({ commit }, res) {
      return new Promise((resolve, reject) => {
        loginByUsername(res)
          .then(data => {
            if (data.data.code == "200") {
              commit("SET_STATUS", true);
              commit("SET_TOKEN", data.data.state);
              setToken(data.data.state);
              commit("SET_ROLES", data.data.state.split(","));
              Message({
                showClose: true,
                message: "登陆成功",
                duration: 1000,
                type: "success"
              });
            } else {
              Message({
                showClose: true,
                message: data.data.msg,
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
        resolve();
      });
    },
    setCountNum({ commit }, data) {
      commit("SET_COUNTNUM", data);
    }
  }
};
export default user;
