import ElementPlus from "element-plus";
import "dayjs/locale/zh-cn";
import "element-plus/lib/theme-chalk/index.css";
import { App } from "vue";

export default function (app: App) {
  app.use(ElementPlus, { size: "small" });
}
