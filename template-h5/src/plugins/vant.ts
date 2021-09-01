import { App } from "vue";

import {
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  Card,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Col,
  Image,
  List,
  Sidebar,
  SidebarItem,
  SubmitBar,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Tag,
  ConfigProvider,
  Lazyload,
  Loading,
} from "vant";

// import vant on demand
const components = [
  Swipe,
  SwipeItem,
  CellGroup,
  Cell,
  Col,
  Tag,
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  Card,
  CheckboxGroup,
  Checkbox,
  SubmitBar,
  Sidebar,
  SidebarItem,
  Tabbar,
  TabbarItem,
  List,
  Image,
  ConfigProvider,
  Loading,
];

/* 
  Custom theme, checkout https://vant-contrib.gitee.io/vant/v3/#/zh-CN/config-provider.
  Override theme by ConfigProvider is recommended.
 */
export function setThemeVars() {
  return {
    // buttonPrimaryBackgroundColor: "yellow",
  };
}

export default function (app: App) {
  app.use(Lazyload, { lazyComponent: true });
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
