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
    scrollBehavior: () => {
      document.querySelector("body").scrollTop = 0;
    },
    routes: constantRoutes,
  });

const router = createRouter();

// router.beforeEach(async (to, from, next) => {
router.beforeEach(async (to, from, next) => {
  console.log(to, from, next);

  if (store.state.common.menu === null) {
    await store.dispatch("common/setMenu", true);
    // console.log(`1 store.state.common.menu :: ${store.state.common.menu}`);
  }

  next();
});

// 라우터 인스턴스 생성
// const router = new Router({
//   mode: "history",
//   routes: [
//     {
//       path: "/",
//       // redirect: "/MainPage",
//       component: Layout,
//       children: [
//         {
//           path: "/",
//           component: () => import("@/views/Pokemon/index"),
//           meta: {
//             title: "Poke List",
//           },
//         },
//         {
//           path: "/detail/:id",
//           component: () => import("@/views/Pokemon/detail"),
//           meta: {
//             title: "Pokemon Detail",
//           },
//         },
//         {
//           path: "/Generation",
//           component: () => import("@/views/Generation/index"),
//           meta: {
//             title: "Poke Generation List",
//           },
//         },
//         {
//           path: "/Generation/detail/:id",
//           component: () => import("@/views/Generation/detail"),
//           meta: {
//             title: "Poke Generation Detail",
//           },
//         },
//       ],
//     },
//     {
//       path: "/:pathMatch(.*)",
//       redirect: "/404",
//     },
//     {
//       path: "/404",
//       component: PageNotFound,
//       meta: {
//         title: "PageNotFound",
//       },
//     },
//   ],

//   scrollBehavior(to, from, savedPosition) {
//     if (savedPosition) {
//       // console.log(`11111111111 getPokemonPageList`);
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log(savedPosition);
//           resolve(savedPosition);
//         }, 300);
//         console.log(`reject : ${reject}`);
//       });
//     } else {
//       // console.log(`22222222222 getPokemonPageList`);
//       return { x: 0, y: 0 };
//     }
//   },
// });

// // 인스턴스에 라우터 인스턴스를 등록
// new Vue({
//   router: router,
// });

export default router;
