import { App } from "vue";

export function setupElementPlus(app: App) {
  app.config.globalProperties.$ELEMENT = { size: "small" };
}
