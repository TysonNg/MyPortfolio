import HomePage from "@/views/Home/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: HomePage
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router