import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Landing from "../views/Landing.vue";
import { projectAuth } from "../firebase/config";

// route guard basically let people in based on truthiness of user
// or if user is logged in
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next();
  } else {
    next({ name: "Auth" });
  }
};

//route guard for logged in user so they cannot see welcome page
const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next();
  } else {
    next({ name: "Home" });
  }
};

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
