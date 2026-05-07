import { Router } from "express";
import {
    getBookmarks,
  getStories,
  getStoryById,
  toggleBookmark,
} from "../controllers/story.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/", getStories);
router.get("/bookmarks", protect, getBookmarks)
router.get("/:id", getStoryById);
router.post("/:id/bookmark", protect, toggleBookmark)

export default router;
