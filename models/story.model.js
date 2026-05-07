import mongoose, { Schema } from "mongoose";

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: "",
    },
    points: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      default: "unknown",
    },
    postedAt: {
      type: String,
      default: "",
    },
    sId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

export const StoryModel = mongoose.model("Story", storySchema);
