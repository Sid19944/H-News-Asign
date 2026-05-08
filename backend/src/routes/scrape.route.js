import { Router } from "express";
import { triggerScrape } from "../controllers/scrape.controller.js";
import { getStories } from "../controllers/story.controller.js";
const router = Router();

router.get("/", triggerScrape);

export default router;
