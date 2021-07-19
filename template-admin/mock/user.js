module.exports = {
  login: function (req, res) {
    res.json({
      code: 2000,
      data: {
        token: "7inch-admin-template",
        userInfo: {
          name: "Admin",
          avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          roles: ["admin"],
        },
      },
    });
  },

  logout: function (req, res) {
    res.json({ code: 2000 });
  },
};
