/**
 * @description 判断一个字符串是否为url
 */
export function isUrl(url: string) {
  return /^((ht|f)tps?):\/\/?/.test(url);
}

/**
 * 判断是否为生产环境
 *
 * @returns Boolean
 */
export function isProdMode() {
  return import.meta.env.PROD;
}

/**
 * 判断是否为开发环境
 *
 * @returns Boolean
 */
export function isDevMode() {
  return import.meta.env.DEV;
}
