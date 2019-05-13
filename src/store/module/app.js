import { constantRouterMap, asyncRouterMap } from "@/router/routes";
const app = {
  state: {
    routers: constantRouterMap,
    addRoutes: [] //获取到的路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRoutes = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters = [];
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        commit("SET_ROUTERS", accessedRouters);
        resolve(accessedRouters);
      });
    }
  }
};

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0);
  } else {
    return true;
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

export default app;
