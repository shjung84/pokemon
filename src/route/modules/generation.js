import Layout from "@/layout/page";
1;
const generationRouter = {
  path: "/Generation",
  component: Layout,
  children: [
    {
      path: ":page",
      name: "Generation List",
      component: () => import("@/views/Generation"),
      meta: { title: "Poke Generation List" },
    },
    {
      path: "detail/:id",
      name: "Generation Detail",
      component: () => import("@/views/Generation/detail"),
      meta: { title: "Poke Generation detail" },
    },
  ],
};
export default generationRouter;
