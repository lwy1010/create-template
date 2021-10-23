import { createApp } from "vue";
import App from "./App.vue";
import { setupElementPlus, setupIconComponent } from "@/plugins";
import router, { setupRouter } from "@/router";

import store from "@/store";
import "@/styles/index.scss";

async function bootstrap() {
  const app = createApp(App);

  // 配置svg图标组件
  setupIconComponent(app);

  // 配置element plus
  setupElementPlus(app);

  app.use(store);

  // 挂载路由
  await setupRouter(app);

  // 路由准备就绪后挂载APP实例
  await router.isReady();

  app.mount("#app", true);
}

bootstrap();
