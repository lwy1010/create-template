/* 
  自定义的状态码及其表示的意思
  400xx表示客户端的请求错误
  500xx表示服务端的接口错误
*/
const statusCodes = [
  { code: 40001, message: "Invalid email or password." },
  { code: 40002, message: "User already registered." },
  { code: 40003, message: "The movie with the given id was not found." },
  { code: 40004, message: "Invalid token." },
  { code: 40005, message: "Access denied. No permission" },
  { code: 40006, message: "Access denied. No token provided." },
];

/**
 * @description 响应接口调用成功
 *
 * @param {object | array} data
 */
const successRes = (data) => {
  return {
    message: "ok",
    code: 0,
    data,
  };
};

/**
 * @description 响应接口调用错误
 *
 * @param {number} statusCode
 */
const errorRes = (statusCode) => {
  let error = statusCodes.find((error) => error.code === statusCode);

  // 如果没匹配到自定义的状态码，默认就是50000，表示服务器错误
  if (!error) error = { code: 50000, message: "Server Error." };

  return {
    message: error.message,
    code: statusCode,
    data: null,
  };
};

/**
 * @description 响应参数校验错误
 *
 * @param {string} message
 */
const validateRes = (message) => {
  return {
    message,
    code: 40000, // 40000 表示客服端请求的参数有误，参数校验失败
    data: null,
  };
};

module.exports = { successRes, errorRes, validateRes };
