import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "dayjs/locale/zh-cn";
import locale from "element-plus/lib/locale/lang/zh-cn";

export default function (app) {
  // setup default size of component and use zh-cn lang
  app.use(ElementPlus, { size: "small", locale });
}
