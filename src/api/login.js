import request from "@/utils/request";

export function loginByUsername(res) {
  return request({
    url: "/crawler/login",
    method: "post",
    data: res
  });
}
