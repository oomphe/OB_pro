import Vue from "vue";
import Router from "vue-router";
import { constantRouterMap } from "./routes";

Vue.use(Router);

let router = new Router({
  routes: constantRouterMap
});

export default router;
