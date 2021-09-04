import { Schema, model, Document } from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "config";
import { User, UserRule } from "@/types/user";

interface UserSchema extends User {
  generateAuthToken(): string;
}

const userSchema = new Schema<UserSchema>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey"),
    { expiresIn: "1h" }
  );
  return token;
};

const validateUser = (user: User, type: string = "signup") => {
  const userRule: UserRule = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  };
  if (type === "login") {
    const schema = Joi.object(userRule);
    return schema.validate(user);
  }
  userRule.name = Joi.string().min(2).max(50).required();
  const schema = Joi.object(userRule);
  return schema.validate(user);
};

const UserModel = model<UserSchema & Document>("User", userSchema);

export { UserModel, validateUser };
