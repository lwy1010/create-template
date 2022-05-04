Page({
  data: {
    motto: "Hello World",
  },
  handleClick() {
    wx.showToast({ title: "你好！", icon: "none" });
  },
});
