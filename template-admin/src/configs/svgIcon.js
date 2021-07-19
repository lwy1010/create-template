import SvgIcon from "@/components/svg-icon/index.vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const svgs = import.meta.globEager("../icons/*.svg");

export default function (app) {
  app.component("SvgIcon", SvgIcon);
}
