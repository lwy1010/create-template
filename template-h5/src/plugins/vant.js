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
  SubmitBar,
  Swipe,
  SwipeItem,
  Tag,
  ConfigProvider,
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
  ConfigProvider,
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

export default function (app) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
