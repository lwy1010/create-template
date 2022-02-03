export enum StatusCode {
  // 参数校验失败
  validateFail = 4000,
  // 用户已注册
  UserRegistered = 4001,
  // 用户未注册
  UserUnregister = 4002,
  // 密码或邮箱错误
  InvalidEmailOrPassword = 4003,
  // 无效的token
  InvalidToken = 4004,
  // 没有操作权限
  NoPermission = 4005,
  // 没有token
  TokenNotFound = 4006,
  // 没有该文章
  PostNotFound = 4007,
  // 服务器错误
  ServerError = 5000,
}
