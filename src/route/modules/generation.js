import Layout from "@/layout/page";

const generationRouter = {
  path: "/Generation",
  component: Layout,
  children: [
    {
      path: "/",
      component: () => import("@/views/Generation"),
      meta: { title: "Poke Generation List" },
    },
    {
      // path: "/detail/:id",
      path: "/detail",
      component: () => import("@/views/Generation/detail"),
      meta: { title: "Poke Generation detail" },
    },
  ],
};
export default generationRouter;
