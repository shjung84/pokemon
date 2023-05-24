// import { createWebHistory, createRouter } from "vue-router";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Layout from "@/layout/page";
import PageNotFound from "@/views/PageNotFound.vue";

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
            title: "PokeList",
          },
        },
        {
          path: "/detail/:id",
          component: () => import("@/views/Pokemon/detail"),
          meta: {
            title: "Pokemon Detail",
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
      console.log(`11111111111 getPokemonPageList`);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(savedPosition);
          resolve(savedPosition);
        }, 300);
        console.log(`reject : ${reject}`);
      });
    } else {
      console.log(`22222222222 getPokemonPageList`);
      return { x: 0, y: 0 };
    }
  },
});

// 인스턴스에 라우터 인스턴스를 등록
new Vue({
  router: router,
});

export default router;
