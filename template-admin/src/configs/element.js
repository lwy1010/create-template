import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

export default function (app) {
  app.use(ElementPlus, { size: "small" });
}
