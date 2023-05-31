import Vue from "vue";
import Router from "vue-router";
import _ from "lodash";

import route from "@/route";
import store from "@/store";

import { getBoardRowCount } from "@/utils/board";
import { getToken } from "@/utils/auth";
import { getLanguage, setLanguage } from "@/utils/language";
import { getUserInfo } from "@/utils/userInfo";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import PageNotFound from "@/views/PageNotFound.vue";

import { loadLanguageAsync } from "@/utils/i18n";

Vue.use(Router);

const modulesFiles = require.context("./modules", true, /\.js$/);
const routers = modulesFiles.keys().map(item => modulesFiles(item).default);

const setI18n = async () => {
  let language;
  if (getLanguage() !== null) {
    language = getLanguage();
  } else {
    const systemLang = window.navigator.language.split("-")[0];
    const lang = _.find(store.state.common.code.LANG_TPCD, { cmmnCode: systemLang });
    if (lang !== undefined) {
      language = lang.cmmnCode;
    } else {
      language = "en";
    }
  }
  setLanguage(language);
  await loadLanguageAsync(language);
};

export const constantRoutes = _.concat(
  routers,
  {
    path: "/",
    redirect: "/admin/dashBoard",
  },
  {
    path: "/login",
    component: () => import("@/views/home/login"),
    meta: { title: "LABEL.673" },
  },
  { path: "*", component: PageNotFound }
);

export const asyncRoutes = [{ path: "*", component: PageNotFound }];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    base: process.env.BASE_URL,
    scrollBehavior: () => {
      document.querySelector("body").scrollTop = 0;
    },
    routes: constantRoutes,
  });

const router = createRouter();

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  if (getToken() === null && to.path !== "/login") {
    route.replace("/login").catch(() => {});
  }

  if (getToken() !== null && store.state.user.info === null) await store.dispatch("user/setInfo");

  if (store.state.location.depth2 !== null) store.dispatch("location/setDepth3", null);

  if (store.state.common.code === null) {
    await store.dispatch("common/setCode", getLanguage());
  }
  if (getToken() !== null && store.state.common.menu === null) {
    await store.dispatch("common/setMenu", getLanguage());
  }
  await setI18n();
  if (getBoardRowCount() !== null && store.state.table.rowCount === null) {
    await store.dispatch("table/setRowCount");
  }

  if (getUserInfo() !== null && store.state.user.openInfo === null) {
    store.dispatch("user/setOpenInfo", getUserInfo());
  }

  if (store.state.common.menu !== null) {
    store.state.common.menu.forEach(item => {
      item.visible = false;
    });
  }

  let checkUrl = to.path + "/";
  for (const i of to.path.split("/")) {
    checkUrl = checkUrl.substring(0, checkUrl.lastIndexOf("/"));
    if (_.filter(store.state.common.menu_origin, { menuUrlAddr: checkUrl }).length > 0) {
      to.meta.auth = _.filter(store.state.common.menu_origin, { menuUrlAddr: checkUrl, scrnIndictFlag: "N" }).length > 0 ? false : true;
    }
  }

  next();
});

router.afterEach(async () => {
  NProgress.done();
});

export default router;
