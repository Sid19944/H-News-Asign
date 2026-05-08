import { scrapeApi } from "@/apiHandler/axios.api";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import {
  Bookmark,
  Home,
  Loader2,
  LogOut,
  Menu,
  RefreshCcw,
  User,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

function Navbar() {
  const location = useLocation();
  const { user, logOut } = useAuth();
  const [showNav, setShowNav] = useState(false);
  const [scraping, setScraping] = useState(false);

  const triggerScrape = () => {
    setScraping(true);
    scrapeApi
      .get("/")
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || err.message);
      })
      .finally(() => {
        setScraping(false);
      });
  };

  return (
    <div className="w-full flex justify-center border-b relative">
      <div className="flex w-full sm:w-[70%] p-2 justify-between">
        <div className="flex gap-2 items-center">
          <>
            <Menu onClick={() => setShowNav(!showNav)} className="sm:hidden" />{" "}
            <span className="font-semibold text-blue-700 text-xl">
              StoryPulse
            </span>
          </>
          <Button
            variant="outline"
            onClick={() => triggerScrape()}
            className="absolute right-2 border p-1 px-2 border-black rounded-lg"
          >
            {scraping ? <Loader2 className="animate-spin" /> : <RefreshCcw />}
          </Button>
        </div>

        <div className="sm:flex hidden font-semibold gap-4 items-center">
          <Link
            to="/"
            className={`flex gap-1 items-center ${location.pathname == "/" && "text-blue-700"}`}
          >
            <Home /> Feed
          </Link>
          <Link
            to={user ? "/bookmarks" : "/login"}
            className={`flex gap-1 items-center ${location.pathname == "/bookmarks" && "text-blue-700"}`}
          >
            <Bookmark /> Bookmarks
          </Link>
          {!user ? (
            <Link to="/login">
              <User />
            </Link>
          ) : (
            <Link
              onClick={logOut}
              className={`flex gap-1 items-center ${location.pathname == "/profile" && "text-blue-700"}`}
            >
              {user?.username}
              <LogOut />
            </Link>
          )}
        </div>

        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className="flex sm:hidden absolute top-11 left-0 text-xl p-3 gap-4 border w-full bg-gray-400 flex-col z-10"
            >
              <Link
                to="/"
                onClick={() => setShowNav(!showNav)}
                className={`flex gap-1 border-b items-center ${location.pathname == "/" && "text-blue-700"}`}
              >
                <Home /> Feed
              </Link>
              <Link
                to={user ? "/bookmarks" : "/login"}
                onClick={() => setShowNav(!showNav)}
                className={`flex gap-1 border-b items-center ${location.pathname == "/bookmarks" && "text-blue-700"}`}
              >
                <Bookmark /> Bookmarks
              </Link>
              {!user ? (
                <Link
                  to="/login"
                  onClick={() => setShowNav(!showNav)}
                  className={`flex gap-1 border-b items-center ${location.pathname == "/login" && "text-blue-700"}`}
                >
                  <User /> Login
                </Link>
              ) : (
                <Link
                  onClick={logOut}
                  className={`flex gap-1 border-b items-center ${location.pathname == "/login" && "text-blue-700"}`}
                >
                  <LogOut />
                  {user?.username}
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Navbar;
