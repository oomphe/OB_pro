import request from "@/utils/request";

//获取Facebook爬虫列表
export function getFaceBookSpliders(res) {
  return request({
    url: process.env.VUE_APP_BASE_API + "/api/facebook-spiders",
    method: "get",
    params: res
  });
}

//创建采样任务
export function createFaceBookSpliders(res) {
  return request({
    url: process.env.VUE_APP_BASE_API +"/api/facebook-spiders",
    method: "post",
    data: res
  });
}

//更新Facebook爬虫
export function updateFaceBookSpliders({ res, id }) {
  return request({
    url: process.env.VUE_APP_BASE_API + "/api/facebook-spiders/" + id,
    method: "put",
    data: res
  });
}

//删除单条爬虫爬虫
export function deleteFaceBookSpiders(id) {
  return request({
    url: process.env.VUE_APP_BASE_API + "/api/facebook-spiders/" + id,
    method: "delete"
  });
}

//获取Facebook爬虫类别列表
export function getFbSplidersClassifys() {
  return request({
    url: process.env.VUE_APP_BASE_API + "/api/facebook-spiders-classifys",
    method: "get"
  });
}

//获取Facebook获取的视频列表
export function getFaceBookVideos(res) {
  return request({
    url: process.env.VUE_APP_BASE_API + "/api/facebook-videos",
    method: "get",
    params: res
  });
}

//获取Facebook 获取的视频分享等信息列表
export function getFaceBookVideosShare(res) {
  return request({
    url: process.env.VUE_APP_BASE_API + "/api/facebook-videos-share",
    method: "get",
    params: res
  });
}
