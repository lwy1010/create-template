module.exports = {
  login: function (req, res) {
    const { username, password } = req.body;
    const result = {
      code: 2000,
      data: {
        token: "admin-token",
        userInfo: {
          name: "Admin",
          avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          role: "admin",
        },
      },
    };
    if (username === "editor" && password === "123456") {
      result.data.userInfo.role = "editor";
      result.data.userInfo.name = "Editor";
      res.json(result);
      return;
    }
    if (username === "admin" && password === "123456") {
      res.json(result);
      return;
    }
    res.json({ code: 10001, message: "账号或登录密码错误" });
  },

  logout: function (req, res) {
    res.json({ code: 2000 });
  },
};
