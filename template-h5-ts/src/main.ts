import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import configVant from "@/configs/vant";

const app = createApp(App);

// setup vant
configVant(app);

app.use(router).use(store).mount("#app");
