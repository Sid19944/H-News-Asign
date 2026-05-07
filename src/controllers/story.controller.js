import ErrorHandler from "../middleware/error.handler.js";
import { wrapAsync } from "../middleware/wrapAsync.js";
import { StoryModel } from "../models/story.model.js";
import { UserModel } from "../models/user.model.js";

const getStories = wrapAsync(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await StoryModel.countDocuments();
    const stories = await StoryModel.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      stories,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    return next(new ErrorHandler(`${err.message}`, 500));
  }
});

const getStoryById = wrapAsync(async (req, res, next) => {
  const story = await StoryModel.findById(req.params.id);
  if (!story) {
    return next(new ErrorHandler("Story not found", 404));
  }
  return res.status(200).json({ success: true, story });
});

const toggleBookmark = wrapAsync(async (req, res, next) => {
  const storyId = req.params.id;
  const user = req.user;
  const isBookmarked = user.bookmarks.includes(storyId);
  if (isBookmarked) {
    user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storyId);
  } else {
    user.bookmarks.push(storyId);
  }
  await user.save();
  return res.status(200).json({
    success: true,
    bookmarked: !isBookmarked,
    bookmarks: user.bookmarks,
  });
});

const getBookmarks = wrapAsync(async (req, res, next) => {
  // console.log(req.user)
  const user = await UserModel.findById(req.user._id).populate("bookmarks");

  return res.status(200).json({
    success: true,
    bookmarks: user.bookmarks,
  });
});

export { getStories, getStoryById, toggleBookmark, getBookmarks };
