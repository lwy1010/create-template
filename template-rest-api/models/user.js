const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.method("generateAuthToken", function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
});

const validateUser = (user, type) => {
  const userRule = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  };
  if (type === "login") {
    const schema = Joi.object(userRule);
    return schema.validate(user);
  }
  userRule.name = Joi.string().min(2).max(50).required();
  console.log(userRule, "userRule");
  const schema = Joi.object(userRule);
  return schema.validate(user);
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  validateUser,
};
