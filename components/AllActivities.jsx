import React from "react";
import { getActivities } from "../lib/actions/activity.action";
import ActivityCard from "../components/cards/ActivityCard";

const AllPosts = async () => {
  const result = await getActivities({
    filter: "popular",
    page: 1,
    pageSize: 10,
  });

  return (
    <div className="flex size-full flex-wrap items-start  gap-6 overflow-auto  rounded-xl bg-secondary px-6 py-8">
      {result.map((post) => (
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
  );
};

export default AllPosts;
