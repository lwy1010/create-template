import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import setupVant from "@/plugins/vant";
import "@/plugins/vconsole";

const app = createApp(App);

setupVant(app);

app.use(router).use(store).mount("#app");
