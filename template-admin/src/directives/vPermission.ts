import { Directive, DirectiveBinding } from "vue";
import { useAppStore } from "@/store/app";

/**
 * @description 自定义的权限指令，可以根据当前用户的权限进行按钮级别的控制
 * 用法: <button v-permission="['admin']">删除</button>
 */
function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const appStore = useAppStore();
  const { value: roles } = binding;

  if (roles?.length && roles instanceof Array) {
    const hasPermission = appStore.roles.some((role) => roles.includes(role));
    if (!hasPermission) {
      (el?.parentNode && el?.parentNode.removeChild(el)) || (el.style.display = "none");
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`);
  }
}

export const vPermission: Directive = {
  created(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
