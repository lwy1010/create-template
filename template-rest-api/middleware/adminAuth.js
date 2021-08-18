const config = require("config");
const { errorRes } = require("../utils/response");

module.exports = function (req, res, next) {
  if (!config.get("requiresAuth")) {
    return next();
  }

  if (!req.user.isAdmin) {
    return res.send(errorRes(40005));
  }

  next();
};
