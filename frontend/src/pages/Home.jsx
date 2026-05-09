import React, { useEffect, useState } from "react";
import { lazy } from "react";
import { storyApi } from "@/apiHandler/axios.api";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
const StoryCard = lazy(() => import("@/components/StoryCard"));
import { Skeleton } from "boneyard-js/react";
import { skeletonData } from "@/lib/skeleton.data";


function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetchStories();
    fetchBookmarks();
  }, [page]);

  const fetchStories = () => {
    setIsLoading(true);
    storyApi
      .get(`/?page=${page}&limit=10`)
      .then((res) => {
        setStories(res.data.stories);
        setPages(res.data.pages);
        setPage(res.data.page);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || err.message);
      })
      .finally(() => {
        setIsLoading(false);
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
      <div className="flex flex-col sm:w-[60%] px-3 gap-3 p-3 h-full">
        <div className="flex flex-col gap-3 overflow-auto min-h-0 flex-1">
          {isLoading ? (
            <Skeleton name="story-card" loading={true}>
              {skeletonData.map((story,idx) => (
                <StoryCard
                  story={story}
                  key={idx}
                  isBookmarked={bookmarks.some((bk) => bk._id == story._id)}
                  toggleBookmarked={toggleBookmarked}
                />
              ))}
            </Skeleton>
          ) : (
            stories.map((story) => (
              <StoryCard
                story={story}
                key={story._id}
                isBookmarked={bookmarks.some((bk) => bk._id == story._id)}
                toggleBookmarked={toggleBookmarked}
              />
            ))
          )}
        </div>

        <div id="pagination" className="px-2 flex w-full justify-center gap-2">
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="cursor-pointer border p-1 px-2 rounded-lg "
          >
            ← Prev
          </Button>
          <div className=" flex ">
            <Button
              variant="outline"
              onClick={() => setPage(1)}
              className={`cursor-pointer border w-10 rounded-lg flex justify-center items-center ${page == 1 && "bg-blue-300 text-blue-800"}`}
            >
              1
            </Button>

            {page !== 1 && page !== pages && (
              <Button
                variant="outline"
                onClick={() => setPage(page)}
                className={`cursor-pointer border w-10 rounded-lg flex justify-center items-center ${page == page && "bg-blue-300 text-blue-800"}`}
              >
                {page}
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => setPage(pages)}
              className={`cursor-pointer border w-10 rounded-lg flex justify-center items-center ${page == pages && "bg-blue-300 text-blue-800"}`}
            >
              {pages}
            </Button>
          </div>
          <Button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
            className="cursor-pointer border p-1 px-2 rounded-lg "
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
