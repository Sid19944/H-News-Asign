import jwt from "jsonwebtoken";
import ErrorHandler from "./error.handler.js";
import { UserModel } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  let token =
    req?.cookies?.token || req?.header("Authorization")?.replace("Bearer", "");
  if (!token) {
    return next(new ErrorHandler("Not authorized", 401));
  }
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decodeToken._id).select("-password");
    next();
  } catch (error) {
    return next(new ErrorHandler("Token Faild or Expired", 401));
  }
};
