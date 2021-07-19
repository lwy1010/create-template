/**
 * @description determine if a string is a link.
 */
export function isUrl(url) {
  return /^((ht|f)tps?):\/\/?/.test(url);
}
