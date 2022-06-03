import { computed } from "vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { Language } from "@/enums";
import { useAppStore } from "@/store/app";

export function useLocale() {
  const appStore = useAppStore();
  const currentLocale = computed(() => (appStore.currentLanguage === Language.zhCN ? zhCn : en));

  return currentLocale;
}
