import axios from "axios";
import { load } from "cheerio";
import { StoryModel } from "../models/story.model.js";
import { wrapAsync } from "../middleware/wrapAsync.js";

const scrapreHackerNews = async () => {
  const { data } = await axios.get("https://news.ycombinator.com");
  const $ = load(data);
  const stories = [];

  $(".athing")
    .slice(0, 10)
    .each((i, el) => {
      const titleRow = $(el);
      const subTextRow = titleRow.next();

      const sId = titleRow.attr("id");
      const titilEl = titleRow.find(".titleline > a").first();
      const title = titilEl.text().trim();
      const url = titilEl.attr("href") || "";

      const points = parseInt(subTextRow.find(".score").text()) || 0;
      const author = subTextRow.find(".hnuser").text().trim() || "unknown";
      const postedAt =
        subTextRow.find(".age").attr("title") ||
        subTextRow.find(".age a").text().trim() ||
        "";

      if (title) stories.push({ sId, title, url, points, author, postedAt });
    });

  for (const story of stories) {
    await StoryModel.findOneAndUpdate({ sId: story.sId }, story, {
      upsert: true,
      new: true,
    });
  }
  return stories;
};

const triggerScrape = wrapAsync(async (req, res, next) => {
  try {
    const stories = await scrapreHackerNews();

    return res.status(200).json({
      success: true,
      message: `Scraped ${stories.length} stories`,
      stories,
    });
  } catch (err) {}
});

export { triggerScrape, scrapreHackerNews };
