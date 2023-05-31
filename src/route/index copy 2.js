// import { createWebHistory, createRouter } from "vue-router";

import Vue from "vue";
import Router from "vue-router";
import _ from "lodash";

import route from "@/route";
import store from "@/store";
Vue.use(Router);

import PageNotFound from "@/views/PageNotFound.vue";

import Layout from "@/layout/page";

// 라우터 인스턴스 생성
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      // redirect: "/MainPage",
      component: Layout,
      children: [
        {
          path: "/",
          component: () => import("@/views/Pokemon/index"),
          meta: {
            title: "Poke List",
          },
        },
        {
          path: "/detail/:id",
          component: () => import("@/views/Pokemon/detail"),
          meta: {
            title: "Pokemon Detail",
          },
        },
        {
          path: "/Generation",
          component: () => import("@/views/Generation/index"),
          meta: {
            title: "Poke Generation List",
          },
        },
        {
          path: "/Generation/detail/:id",
          component: () => import("@/views/Generation/detail"),
          meta: {
            title: "Poke Generation Detail",
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/404",
    },
    {
      path: "/404",
      component: PageNotFound,
      meta: {
        title: "PageNotFound",
      },
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // console.log(`11111111111 getPokemonPageList`);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(savedPosition);
          resolve(savedPosition);
        }, 300);
        console.log(`reject : ${reject}`);
      });
    } else {
      // console.log(`22222222222 getPokemonPageList`);
      return { x: 0, y: 0 };
    }
  },
});

// 인스턴스에 라우터 인스턴스를 등록
new Vue({
  router: router,
});

export default router;
