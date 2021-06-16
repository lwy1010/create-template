import { App } from 'vue';
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
} from 'vant';

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
];

export default function (app: App) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
