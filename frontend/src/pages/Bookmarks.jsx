import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
const StoryCard = lazy(() => import("@/components/StoryCard"));
import { Button } from "@/components/ui/button";
import { storyApi } from "@/apiHandler/axios.api";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    user && fetchBookmarks();
  }, [user]);

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
        fetchBookmarks();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || err.message);
      });
  };

  return (
    <div className="flex flex-col items-center h-full">
        <div className="flex flex-col w-[60%] px-3 gap-3 p-3 overflow-auto">
        <div className="flex flex-col gap-3">
          <Suspense fallback={<p>Loading...</p>}>
            {bookmarks?.map((story) => (
              <StoryCard
                key={story.sId}
                story={story}
                isBookmarked={true}
                toggleBookmarked={toggleBookmarked}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
