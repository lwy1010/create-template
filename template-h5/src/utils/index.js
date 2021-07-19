/**
 * 判断是否为生成环境
 *
 * @returns Boolean
 */
export function isProdEnv() {
  return import.meta.env.PROD;
}

/**
 * 判断是否为开发环境
 *
 * @returns Boolean
 */
export function isDevEnv() {
  return import.meta.env.DEV;
}
