import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Callback from "@/views/Callback.vue";
import { useAuthStore } from "@/store/auth.store";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/callback",
    component: Callback,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (
    to.matched.some((router) => router.meta.requiresAuth) &&
    !authStore.authentication.access_token
  ) {
    return next({ name: "login" });
  }

  if (
    !to.matched.some((router) => router.meta.requiresAuth) &&
    authStore.authentication.access_token
  ) {
    return next({ name: "home" });
  }

  return next();
});

export default router;
