import { createApp } from "vue";
import { createPinia } from "pinia";
import VueGtag from "vue-gtag";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
app.use(
  VueGtag,
  {
    appName: "Rentalize app",
    pageTrackerScreenviewEnabled: true,
    config: { id: import.meta.env.VITE_GOOGLE_ANALYTICS_ID },
    router,
    // for testing
    onBeforeTrack() {
      console.log("onBeforeTrack");
    },
    onAfterTrack() {
      console.log("onAfterTrack");
    },
  },
  router
);
app.use(createPinia());
app.use(router);

app.mount("#app");
