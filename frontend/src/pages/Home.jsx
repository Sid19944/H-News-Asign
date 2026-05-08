import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "@/components/Navbar";
import { lazy, Suspense } from "react";
import { storyApi } from "@/apiHandler/axios.api";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
const StoryCard = lazy(() => import("@/components/StoryCard"));

function Home() {
  const [stories, setStories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetchStories();
    fetchBookmarks();
  }, [page]);

  const fetchStories = () => {
    storyApi
      .get(`/?page=${page}&limit=10`)
      .then((res) => {
        setStories(res.data.stories);
        setPages(res.data.pages);
        setPage(res.data.page);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || err.message);
      });
  };

  const fetchBookmarks = () => {
    storyApi
      .get(`/bookmarks`)
      .then((res) => {
        setBookmarks(res.data.bookmarks);
      })
      .catch(() => {
        console.log("User not logged in");
      });
  };

  const toggleBookmarked = (id) => {
    storyApi
      .post(`/${id}/bookmark`)
      .then((res) => {
        fetchStories();
        fetchBookmarks();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || err.message);
      });
  };

  return (
    <div className="flex flex-col items-center h-full ">
      <div className="flex flex-col w-[60%] px-3 gap-3 p-3 h-full">
        <div className="flex flex-col gap-3 overflow-auto min-h-0">
          {stories.map((story) => (
            <Suspense fallback={<p>Loading...</p>}>
              <StoryCard
                key={story.sId}
                story={story}
                isBookmarked={bookmarks.some((bk) => bk._id == story._id)}
                toggleBookmarked={toggleBookmarked}
              />
            </Suspense>
          ))}
        </div>
        <div id="pagination" className="flex w-full justify-center gap-2">
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="cursor-pointer border p-1 px-2 rounded-lg"
          >
            ← Prev
          </Button>
          {Array.from({ length: pages }, (_, i) => (
            <Button
              variant="outline"
              key={i}
              onClick={() => setPage(i + 1)}
              className={`cursor-pointer border w-10 rounded-lg flex justify-center items-center ${page == i + 1 && "bg-blue-300 text-blue-800"}`}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
            className="cursor-pointer border p-1 px-2 rounded-lg"
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
