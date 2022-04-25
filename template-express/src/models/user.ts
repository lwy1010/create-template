import { Schema, model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import config from "@/config/config";
import { User } from "@/types/user";
import idPlugin from "mongoose-id";

interface UserSchema extends User {
  generateAuthToken(): string;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  avatar: { type: String },
});

userSchema.plugin(idPlugin);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.jwtSecret,
    { expiresIn: "1h" }
  );
  return token;
};

const UserModel = model<UserSchema & Document>("User", userSchema);

export { UserModel };
