import { App } from "vue";
import { createI18n } from "vue-i18n";
import { readLanguage } from "@/utils/localStorage";
import en from "@/locales/en.json";
import zhCn from "@/locales/zh_CN.json";
import { Language } from "@/enums";

export const i18n = createI18n({
  legacy: false,
  locale: readLanguage() || Language.zhCN,
  globalInjection: true,
  fallbackLocale: Language.zhCN,
  messages: {
    en: { ...en },
    zhCn: { ...zhCn },
  },
});

export function setupI18n(app: App) {
  app.use(i18n);
}
