/**
 * @description 统一接口响应的格式
 */
export function formatRes(data: unknown, msg = "ok", code = 0) {
  return { msg, code, data };
}

/**
 * @description 基于dicebear服务获取用户的头像
 */
export function setupAvatar(userName: string) {
  const re = /^[\u4E00-\u9FA5]+$/;
  let name = "";
  if (re.test(userName) && userName.length >= 3) {
    name = userName.substring(userName.length - 2);
  } else {
    name = userName.substring(0, 1);
  }
  return `https://avatars.dicebear.com/api/initials/${name}.svg?radius=50`;
}
