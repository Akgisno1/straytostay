"use client";
import React, { useState, useEffect } from "react";
import { getActivities } from "../lib/actions/activity.action";
import FilterComponent from "./shared/FilterComponent";
import ActivityCard from "../components/cards/ActivityCard";

const AllPosts = () => {
  const [filter, setFilter] = useState("newest");
  const filters = ["newest", "frequent", "popular"];
  const [activity, setactivity] = useState([]);

  useEffect(() => {
    const fetchactivity = async () => {
      try {
        const fetchedactivity = await getActivities(filter);
        setactivity(fetchedactivity);
      } catch (error) {
        console.error("Failed to fetch activities", error);
      }
    };
    fetchactivity();
  }, [filter]);

  if (activity.length === 0) {
    return (
      <div className="flex w-full flex-col items-start gap-6 overflow-auto rounded-xl bg-secondary p-4 max-sm:gap-4 ">
        <div className="font-mont text-2xl">No Activities to Show.</div>
      </div>
    );
  }

  return (
    <div className="flex size-full flex-col items-start gap-4 rounded-xl bg-secondary p-4">
      <div className="flex flex-row gap-2 max-md:justify-between w-full ">
        <h1 className="font-oxo text-3xl font-bold text-primary ">
          All Activities
        </h1>
        <FilterComponent
          filter={filter}
          setFilter={setFilter}
          filters={filters}
        />
      </div>
      <div className="flex w-full flex-wrap gap-4 overflow-auto pr-2">
        {activity.map((post) => (
          <ActivityCard
            key={post._id}
            postId={post._id}
            authorId={post.authorId}
            title={post.title}
            images={post.images}
            likes={post.likes}
            createdAt={post.createdAt}
            views={post.views}
          />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
