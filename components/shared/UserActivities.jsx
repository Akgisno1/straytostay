"use client";
import React, { useState, useEffect } from "react";
import { getUserActivities } from "../../lib/actions/activity.action";
import UserActivityCard from "../cards/UserActivityCard";
import FilterComponent from "../shared/FilterComponent";

const UserActivities = (userId) => {
  const [filter, setFilter] = useState("newest");
  const filters = ["newest", "frequent", "popular"];
  const [activity, setactivity] = useState([]);
  useEffect(() => {
    const fetchactivities = async () => {
      try {
        const fetchedactivities = await getUserActivities({
          userId: userId.userId,
          filter,
        });
        setactivity(fetchedactivities);
      } catch (error) {
        console.error("Failed to fetch activities", error);
      }
    };
    fetchactivities();
  }, [filter]);
  if (activity.length === 0) {
    return (
      <div className="flex w-full flex-col items-start gap-6 overflow-auto rounded-xl bg-secondary p-4 max-sm:gap-4 ">
        <div className="font-mont text-2xl">No Activities to Show.</div>
      </div>
    );
  }
  return (
    <div className="flex size-full flex-col rounded-xl bg-secondary  p-1 max-md:justify-center ">
      <FilterComponent
        filter={filter}
        setFilter={setFilter}
        filters={filters}
      />
      <div className="flex size-full flex-wrap items-start gap-6 overflow-auto">
        {activity.map((post) => (
          <UserActivityCard
            key={post._id}
            userId={userId.userId}
            activityId={post._id}
            views={post.views}
            likes={post.likes}
            title={post.title}
            images={post.images}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default UserActivities;
