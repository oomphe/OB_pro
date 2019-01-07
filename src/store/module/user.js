import { loginByUsername } from "@/api/login";
import { Message } from "element-ui";

const user = {
  state: {},
  mutations: {},
  actions: {
    LoginByUsername({ commit }, res) {
      return new Promise((resolve, reject) => {
        loginByUsername(res)
          .then(data => {
            if (data.data.state == "success") {
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
    }
  }
};
export default user;
