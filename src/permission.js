import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth";

const whiteList = ["/login", "/404", "/401"]; // 免登白名单
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    if (to.path === "/" || to.path === "/login") {
      next({ path: "/homepage" });
    } else {
      if (store.getters.countNum === 0) {
        store.dispatch("setCountNum", 1);
        const roles = store.getters.roles;
        store.dispatch("GenerateRoutes", { roles }).then(() => {
          // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRoutes);
          next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        });
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next();
        } else {
          next({ path: "/401", replace: true, query: { noGoBack: true } });
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next("/login"); // 否则全部重定向到登录页
    }
  }
});

// 判断是否有权限
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf("1") >= 0) {
    return true;
  }
  if (!permissionRoles) {
    return true;
  }
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}
