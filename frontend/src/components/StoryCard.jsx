import { easeInOut, motion } from "framer-motion";
import { Bookmark, BookmarkCheck, User, Zap } from "lucide-react";
import React from "react";
import { Link } from "react-router";

function StoryCard({ story, isBookmarked, toggleBookmarked }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: easeInOut }}
      className="border p-3 rounded-sm bg-white"
    >
      <div className="flex text-sm items-center gap-2 justify-between">
        <div className="flex">
          <span
            className={`flex items-center rounded-sm px-1 text-xs ${story.points >= 1000 ? "bg-[#FFDBCD] text-red-700" : "bg-[#FFDDB8] text-[#6B4303]"}`}
          >
            {story.points >= 1000 && <Zap style={{ height: "10px" }} />}
            {story.points}
          </span>
          <span className="flex items-center text-gray-400">
            <User style={{ height: "12px" }} />
            {story.author}
          </span>
        </div>
        <span onClick={() => toggleBookmarked(story._id)} className="cursor-pointer">
          {isBookmarked ? (
            <BookmarkCheck className="text-blue-800" />
          ) : (
            <Bookmark />
          )}
        </span>
      </div>
      <Link to={story.url}>{story.title}</Link>

      <h1 className="text-xs text-gray-400">
        {new Date(story.postedAt.split(" ")[0]).toLocaleDateString()}
        {", "}
        {new Date(story.postedAt.split(" ")[0]).toLocaleTimeString()}
      </h1>
    </motion.div>
  );
}

export default StoryCard;
