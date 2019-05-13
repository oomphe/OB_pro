import request from "@/utils/request";

//用户登陆
export function login(res) {
  return request({
    url: process.env.VUE_APP_BASE_APID + "/sms/users/login",
    method: "post",
    data: res
  });
}

//用户登出
export function logout(res) {
  return request({
    url: process.env.BASE_APIS + "/sms/users/logout",
    method: "post",
    data: res
  });
}
