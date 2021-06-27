/**
 * 判断是否为生成环境
 */
export function isProdEnv(): boolean {
  return import.meta.env.PROD;
}

/**
 * 判断是否为开发环境
 */
export function isDevEnv(): boolean {
  return import.meta.env.DEV;
}
