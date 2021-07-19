import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/styles/index.scss";
import configSvgIcon from "@/configs/svgIcon";
import configElement from "@/configs/element";
import "@/configs/router";

const app = createApp(App);

// setup svg icon
configSvgIcon(app);
// setup element plus
configElement(app);

app.use(router).use(store).mount("#app");
