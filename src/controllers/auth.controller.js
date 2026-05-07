import jwt from "jsonwebtoken";
import { wrapAsync } from "../middleware/wrapAsync.js";
import ErrorHandler from "../middleware/error.handler.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

const generateToken = async (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const register = wrapAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return next(new ErrorHandler("Please enter all field", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password dos't match", 400));
  }

  const userExist = await UserModel.findOne({ $or: [{ email }, { username }] });
  if (userExist) {
    return next(new ErrorHandler("User already exist with us", 400));
  }

  const user = await UserModel.create({
    username: username.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: password.trim(),
  });
  if (!user) {
    return next(new ErrorHandler("Faild to register", 500));
  }

  return res.status(201).json({
    success: true,
    message: "User registerd successfully",
  });
});

const login = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Enter email and password", 400));
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Email is not registered with us!", 400));
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return next(new ErrorHandler("Wrong password", 400));
  }

  const token = await generateToken(user._id);
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "none",
    })
    .json({
      success: true,
      message: "User Logded In Successfully",
    });
});

const logout = wrapAsync(async (req, res, next) => {
  return res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({ success: true });
});

export { register, login, logout };
