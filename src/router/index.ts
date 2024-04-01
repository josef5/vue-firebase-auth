import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { useStoreAuth } from "../stores/storeAuth";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHashHistory(), // Applies a # to the URL
  routes,
});

// Protecting routes
router.beforeEach(async (to) => {
  // If the user is not authenticated and the route requires authentication then redirect to login
  // Set the query parameter redirect to the current route name
  const storeAuth = useStoreAuth();

  if (to.meta.requiresAuth && !storeAuth.user.id) {
    return {
      name: "login",
      query: { redirect: to.name ? to.name.toString() : undefined },
    };
  }
});

export default router;
