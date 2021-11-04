import SvgIcon from "@/components/svg-icon/index.vue";
import { App } from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const svgs = import.meta.globEager("../icons/*.svg");

/**
 * @description svg图标组件
 */
export function setupIconComponent(app: App) {
  app.component("SvgIcon", SvgIcon);
}
