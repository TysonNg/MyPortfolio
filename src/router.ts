import HomePage from "@/views/Home/Home.vue";
import ProjectPage from "@/views/ProjectDetail/ProjectDetail.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/:slug",
    component: ProjectPage
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router