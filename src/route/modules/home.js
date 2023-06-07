import Layout from "@/layout/page";

const homeRouter = {
  path: "/MainPage",
  component: Layout,
  children: [
    {
      path: "/",
      // component: () => import("@/views/home"),
      component: () => import("@/views/Pokemon/index_mapList"),

      meta: { title: "Home" },
    },
  ],
};
export default homeRouter;
