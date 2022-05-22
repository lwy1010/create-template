import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupVconsole } from "@/plugins/vconsole";
import { setupSentry } from "@/plugins/sentry";
import settings from "@/settings";
import "virtual:svg-icons-register";
import "virtual:windi.css";
import "./styles/index.scss";

async function bootstrap() {
  const app = createApp(App);

  // 配置store
  setupStore(app);

  // 挂载路由
  setupRouter(app);

  // 设置vconsole
  setupVconsole();

  // 路由准备就绪后挂载APP实例
  await router.isReady();

  // 配置sentry
  settings.enableSentry && setupSentry(app, router);

  app.mount("#app", true);
}

bootstrap();
