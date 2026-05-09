import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { lazy } from "react";
const StoryCard = lazy(() => import("@/components/StoryCard"));
import { storyApi } from "@/apiHandler/axios.api";
import { Skeleton } from "boneyard-js/react";
import { skeletonData } from "@/lib/skeleton.data";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    user && fetchBookmarks();
  }, [user]);

  const fetchBookmarks = () => {
    setIsLoading(true);
    storyApi
      .get(`/bookmarks`)
      .then((res) => {
        setBookmarks(res.data.bookmarks);
      })
      .catch(() => {
        console.log("User not logged in");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleBookmarked = (id) => {
    storyApi
      .post(`/${id}/bookmark`)
      .then((res) => {
        fetchBookmarks();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || err.message);
      });
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col sm:w-[60%] px-3 gap-3 p-3 overflow-auto">
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <Skeleton name="story-card" loading={true}>
              {skeletonData.map((story, idx) => (
                <StoryCard
                  story={story}
                  key={idx}
                  isBookmarked={bookmarks.some((bk) => bk._id == story._id)}
                  toggleBookmarked={toggleBookmarked}
                />
              ))}
            </Skeleton>
          ) : (
            bookmarks.map((story) => (
              <StoryCard
                story={story}
                key={story._id}
                isBookmarked={bookmarks.some((bk) => bk._id == story._id)}
                toggleBookmarked={toggleBookmarked}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
