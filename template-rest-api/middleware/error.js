const { errorRes } = require("../utils/response");

// eslint-disable-next-line no-unused-vars
module.exports = function (err, req, res, next) {
  res.send(errorRes(50000));
};
