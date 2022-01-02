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

  // 配置elementPlus
  setupElementPlus(app);

  // 配置store
  setupStore(app);

  // 挂载路由
  await setupRouter(app);

  // 路由准备就绪后挂载APP实例
  await router.isReady();

  app.mount("#app", true);
}

bootstrap();
