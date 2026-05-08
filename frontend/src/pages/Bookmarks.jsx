import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { lazy } from "react";
const StoryCard = lazy(() => import("@/components/StoryCard"));
import { storyApi } from "@/apiHandler/axios.api";
import { Skeleton } from "boneyard-js/react";

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

  console.log(isLoading)

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
          <Skeleton name="story-card" loading={isLoading}>
            {bookmarks.map((story) => (
              <StoryCard
                key={story.sId}
                story={story}
                isBookmarked={true}
                toggleBookmarked={toggleBookmarked}
              />
            ))}
          </Skeleton>
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
