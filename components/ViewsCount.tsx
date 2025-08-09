"use client";

import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";

const ViewsCount = ({ id, totalViews }: { id: string; totalViews: number }) => {
  const [isUpdating, setIsUpdating] = useState(true);
  // const [viewCount, setViewCount] = useState(totalViews);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (hasIncremented.current) return;

    const incrementView = async () => {
      try {
        const response = await fetch("/api/increment-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          // const { updatedViews } = await response.json();
          // setViewCount(updatedViews); // Update local state with new views
        } else {
          console.error("Failed to increment views:", response.statusText);
        }
      } catch (error) {
        console.error("Error incrementing view count:", error);
      } finally {
        setIsUpdating(false);
        hasIncremented.current = true;
      }
    };

    incrementView();
  }, [id]);

  return (
    <div className="view-text">
      {isUpdating ? (
        <Skeleton width={"100%"} height={20} />
      ) : (
        <span className="font-black">views: {totalViews}</span>
      )}
    </div>
  );
};

export default ViewsCount;

