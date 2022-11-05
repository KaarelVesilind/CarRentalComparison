import { createApp } from "vue";
import { createPinia } from "pinia";
import VueGtag from "vue-gtag";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
app.use(VueGtag, {
  config: { id: "G-ZJX16HT3KE" },
});
app.use(createPinia());
app.use(router);

app.mount("#app");
