import ElementPlus from "element-plus";
import "dayjs/locale/zh-cn";
import "element-plus/lib/theme-chalk/index.css";

export default function (app) {
  app.use(ElementPlus, { size: "small" });
}
