const jwt = require("jsonwebtoken");
const config = require("config");
const { errorRes } = require("../utils/response");

module.exports = function (req, res, next) {
  if (!config.get("requiresAuth")) {
    return next();
  }

  const token = req.header("auth-token");
  if (!token) {
    return res.send(errorRes(40000));
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (e) {
    res.send(errorRes(40004));
  }
};
