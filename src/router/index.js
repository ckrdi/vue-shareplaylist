import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Landing from "../views/Landing.vue";
import { projectAuth } from "../firebase/config";
import CreatePlaylist from "../views/CreatePlaylist.vue";
import PlaylistDetails from "../views/PlaylistDetails.vue";
import NotFound from "../views/NotFound.vue";
import All from "../views/All.vue";

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
    path: "/all",
    name: "All",
    component: All,
    beforeEnter: requireAuth,
  },
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/playlists/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/:id",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
