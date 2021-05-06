import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// firebase
import { projectAuth } from "./firebase/config";

// global styles
import "./assets/main.css";

let app;
// prevent the router guard to send user to login page when
// the page is refreshed
projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .mount("#app");
  }
});
