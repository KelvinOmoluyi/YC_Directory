"use client";

import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const ViewsCount = ({ id, totalViews }: { id: string; totalViews: number }) => {
  const [isUpdating, setIsUpdating] = useState(true);
  const [viewCount, setViewCount] = useState(totalViews);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (hasIncremented.current) return;

    const incrementView = async () => {
      try {
        const response = await fetch('/api/increment-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error('Failed to increment view count');
        }

        const data = await response.json();

        // ✅ Optimistically add +1
        setViewCount(data.updatedViews);
        hasIncremented.current = true;
      } catch (error) {
        console.error('Error incrementing view count:', error);
      } finally {
        setIsUpdating(false);
      }
    };

    incrementView();
  }, [id]);

  return (
    <div className="view-text">
      {isUpdating ? (
        <Skeleton width={"100%"} height={20} />
      ) : (
        <span className="font-black">views: {viewCount}</span>
      )}
    </div>
  );
};

export default ViewsCount;

