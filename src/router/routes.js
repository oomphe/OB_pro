import login from "../views/login.vue";
import page404 from "../views/error-pages/404.vue";
import page401 from "../views/error-pages/401.vue";
export const constantRouterMap = [
  {
    path: "/",
    name: "login",
    meta: { title: "系统登录", hidden: true },
    component: login
  },
  {
    path: "/404",
    name: "page404",
    meta: { title: "页面走丢了", hidden: true },
    component: page404
  },
  {
    path: "/401",
    name: "page401",
    meta: { title: "权限不足", hidden: true },
    component: page401
  }
];

export const asyncRouterMap = [
  {
    path: "/homepage",
    name: "homepage",
    component: () => import(/* webpackChunkName: "about" */ "../views/homepage.vue")
  }
];
