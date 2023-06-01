import Layout from "@/layout/page";

const homeRouter = {
  path: "/",
  component: Layout,
  children: [
    {
      path: "/MainPage",
      component: () => import("@/views/home"),
      meta: { title: "Home" },
    },
  ],
};
export default homeRouter;
