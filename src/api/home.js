import request from "@/utils/request";
//添加粉丝页名称
export function addPages(name) {
  return request({
    url: "/crawler/addpages",
    method: "post",
    data: { name }
  });
}

export function showPages(res) {
  return request({
    url: "/crawler/showPages",
    method: "post",
    data: res
  });
}

export function searchByName(res) {
  return request({
    url: "/crawler/fuzzySearch",
    method: "post",
    data: res
  });
}

//获取spy网站登陆信息列表
export function getSpyToolsList() {
  return request({
    url:  process.env.VUE_APP_BASE_API + '/api/sak-spytools',
    method: 'get'
  });
}

export function spyLogin(res) {
  return request({
    url: 'https://dropship-spy.com/login/',
    method: 'post',
    data: res
  });
}

