import { createApp } from "vue";
import App from "./App.vue";
import { setupElementPlus } from "@/plugins/elementPlus";
import router, { setupRouter } from "@/router";
import { setupStore } from "@/store";
import "virtual:svg-icons-register";
import "virtual:windi.css";
import "./styles/index.scss";

async function bootstrap() {
  const app = createApp(App);

  setupElementPlus(app);

  setupStore(app);

  setupRouter(app);

  await router.isReady();

  app.mount("#app", true);
}

bootstrap();
