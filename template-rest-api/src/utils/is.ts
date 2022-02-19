/**
 * @description 判断是否是开发环境
 */
export function isDevMode() {
  return process.env.NODE_ENV === "development";
}
