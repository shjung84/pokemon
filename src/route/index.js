// import { createWebHistory, createRouter } from "vue-router";

import Vue from "vue";
import Router from "vue-router";
import _ from "lodash";

// import route from "@/route";
import store from "@/store";

import PageNotFound from "@/views/PageNotFound.vue";

Vue.use(Router);

const modulesFiles = require.context("./modules", true, /\.js$/);
const routers = modulesFiles.keys().map(item => modulesFiles(item).default);

export const constantRoutes = _.concat(
  routers,
  {
    path: "/",
    redirect: "/MainPage",
  },
  { path: "*", component: PageNotFound }
);

export const asyncRoutes = [{ path: "*", component: PageNotFound }];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    base: process.env.BASE_URL,

    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(savedPosition);
            resolve(savedPosition);
          }, 300);
          console.log(`reject : ${reject}`);
        });
      } else {
        return { x: 0, y: 0 };
      }
    },
    routes: constantRoutes,
  });

const router = createRouter();

router.beforeEach(async (to, from, next) => {
  if (store.state.common.menu === null) {
    await store.dispatch("common/setMenu", true);
  }

  next();
});

export default router;
