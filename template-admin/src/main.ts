import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import "@/styles/index.scss";
import setupSvgIcon from "@/plugins/svgIcon";
import setupElement from "@/plugins/element";
import "@/plugins/router";

const app = createApp(App);

setupSvgIcon(app);
setupElement(app);

app.use(router).use(store).mount("#app");
