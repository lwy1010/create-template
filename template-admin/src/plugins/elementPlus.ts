import { App } from "vue";
import "element-plus/theme-chalk/el-message.css";

export function setupElementPlus(app: App) {
  app.config.globalProperties.$ELEMENT = { size: "small" };
}
