import Layout from "@/layout/page";
1;
const generationRouter = {
  path: "/Generation",
  component: Layout,
  children: [
    {
      path: ":id",
      component: () => import("@/views/Generation"),
      meta: { title: "Poke Generation List" },
    },
    {
      path: "detail",
      component: () => import("@/views/Generation/detail"),
      meta: { title: "Poke Generation detail" },
    },
  ],
};
export default generationRouter;
