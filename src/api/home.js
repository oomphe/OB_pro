import request from "@/utils/request";
//添加粉丝页名称
export function addPages(name) {
  return request({
    url: "/crawler/addpages",
    method: "post",
    data: { name }
  });
}

export function selectByState(state) {
  return request({
    url: "/crawler/selectByState",
    method: "post",
    data: { state }
  });
}

export function showPages(
  postId,
  pageId,
  createdAt,
  checkpoint,
  videoViews,
  likes,
  comments,
  shares,
  pages
) {
  const res = {
    postId,
    pageId,
    createdAt,
    checkpoint,
    videoViews,
    likes,
    comments,
    shares,
    pages
  };
  return request({
    url: "/crawler/showPages",
    method: "get",
    params: res
  });
}
