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
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        }
        return { top: 0, left: 0 };
    },
})

export default router