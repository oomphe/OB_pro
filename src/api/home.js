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
