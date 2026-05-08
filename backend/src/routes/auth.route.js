import { Router } from "express";
import {
  getCurrUser,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-user", protect, getCurrUser);
router.post("/logout", protect, logout);

export default router;
