/**
 * @description 获取用户的头像
 */
export function getAvatarLink(userName: string) {
  const re = /^[\u4E00-\u9FA5]+$/;
  let name = "";
  if (re.test(userName) && userName.length >= 3) {
    name = userName.substring(userName.length - 2);
  } else {
    name = userName.substring(0, 1);
  }
  // 通过dicebear服务来托管用户的头像
  return `https://avatars.dicebear.com/api/initials/${name}.svg?radius=50`;
}
