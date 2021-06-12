/**
 * @description determine if a string is a link.
 */
export function isUrl(url: string) {
  return /^((ht|f)tps?):\/\/?/.test(url);
}
