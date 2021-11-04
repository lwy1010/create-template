/**
 * @description 判断一个字符串是否为url
 */
export function isUrl(url: string) {
  return /^((ht|f)tps?):\/\/?/.test(url);
}
