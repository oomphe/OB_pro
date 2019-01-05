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
  // const res = {
  //   videoViews,
  //   likes,
  //   comments,
  //   shares,
  //   pages
  // };
  return request({
    url: "/crawler/showPages",
    method: "get",
    contentType: "application/json",
    res: JSON.stringify(res),
    dataType: "json",
    params: res
  });
}

export function searchByName(res) {
  return request({
    url: "/crawler/fuzzySearch",
    method: "get",
    params: res
  });
}
