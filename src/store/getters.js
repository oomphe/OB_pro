const getters = {
  fansTable: state => state.home.fansTable,
  fansData: state => state.home.fansData,
  permissionRouters: state => state.app.routers, // 符合权限的路由
  addRoutes: state => state.app.addRoutes, // 根据权限获取到的路由列表
  roles: state => state.user.roles, // 用户权限
  isLogin: state => state.user.status, // 登录状态
  name: state => state.user.name, // 用户姓名
  token: state => state.user.token, // token
  countNum: state => state.user.countNum
};

export default getters;
