import SvgIcon from "@/components/SvgIcon/index.vue";
import { App } from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const svgs = import.meta.globEager("../icons/*.svg");

export default function (app: App) {
  app.component("SvgIcon", SvgIcon);
}
