const user = require("./user");

module.exports = {
  "POST /login": user.login,
  "POST /logout": user.logout,
};
