import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Admin from "../views/Admin.vue";

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
  },
];

const router = createRouter({
  history: createWebHashHistory(), // Applies a # to the URL
  routes,
});

const isAuthed = false;

// Protecting routes
router.beforeEach(async (to) => {
  // If the user is not authenticated and tries to access the admin route, they will be redirected to the home route
  if (to.name === "admin" && !isAuthed) {
    return { name: "home" };
  }
});

export default router;
