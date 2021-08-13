const express = require("express");
const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const bcryptjs = require("bcryptjs");
const { successRes, errorRes, validateRes } = require("../utils/response");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { error } = validateUser(req.body, "login");
  if (error) return res.send(validateRes(error.details[0].message));

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send(errorRes(40001));

  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) return res.send(errorRes(40001));

  const token = user.generateAuthToken();
  const userInfo = { ..._.pick(user, ["name", "email", "_id", "isAdmin"]), token };

  res.send(successRes(userInfo));
});

router.post("/signup", async (req, res) => {
  console.log(req.body, "body");
  const { error } = validateUser(req.body);
  if (error) return res.send(validateRes(error.details[0].message));

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.send(errorRes(4002));

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  const userInfo = { ..._.pick(user, ["name", "email", "_id", "isAdmin"]), token };

  res.send(userInfo);
});

module.exports = router;
