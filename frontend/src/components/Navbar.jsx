import { Bookmark, Home, Menu, User } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <div className="w-full flex justify-center border-b">
      <div className="flex w-full sm:w-[60%] p-2 justify-between">
        <div className="flex gap-2 items-center">
          <Menu />{" "}
          <span className="font-semibold text-blue-700 text-xl">
            StoryPulse
          </span>
        </div>
        <div className="sm:flex hidden font-semibold gap-5 items-center">
          <Link
            to="/"
            className={`flex gap-1 items-center ${location.pathname == "/" && "text-blue-700"}`}
          >
            <Home /> Feed
          </Link>
          <Link
            to="/bookmarks"
            className={`flex gap-1 items-center ${location.pathname == "/bookmarks" && "text-blue-700"}`}
          >
            <Bookmark /> Bookmarks
          </Link>
          <Link
            to="/profile"
            className={`flex gap-1 items-center ${location.pathname == "/profile" && "text-blue-700"}`}
          >
            {" "}
            <User /> Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
