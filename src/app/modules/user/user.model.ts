import mongoose from "mongoose";
import { TUser, Product, UserModel } from "./user.interface";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";

const productSchema: Schema<Product> = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema: Schema<TUser, UserModel> = new Schema({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: true },
  hobbies: { type: [String] },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: { type: [productSchema] },
});

// using this pre middleware for hashing password
userSchema.pre("save", async function (next) {
  const user = this;
  // hashing password before saving new user to DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// using this post middleware for removing password field in case of GET req.
userSchema.post("save", function (user: any, next) {
  // removing password field form user response
  delete user._doc.password;
  next();
});

// Custom static method for user existance echeck
userSchema.static("isUserExists", async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
});

// exporting the User model
export const User = mongoose.model<TUser, UserModel>("User", userSchema);
