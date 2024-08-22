import React from "react";
import { getUrgentPosts } from "../../lib/actions/post.action";
import Link from "next/link";
const UrgentPosts = async () => {
  const posts = await getUrgentPosts();

  return (
    <div className="flex size-full flex-col items-start  gap-4 overflow-auto  rounded-xl bg-secondary px-6 pb-8 pt-4">
      <h1 className="font-oxo text-3xl font-semibold text-red-500">
        Urgent Adoptions
      </h1>
      {posts.map((post) => (
        <Link
          href={`/post/${post._id}`}
          key={post._id}
          className=" flex h-[200] w-full flex-col rounded-lg bg-primary-foreground  text-card-foreground shadow-md hover:bg-destructive max-md:w-[96%]"
        >
          <img
            src={post.images[0]}
            className="h-32 w-full rounded-t-lg object-cover"
          />

          <div className=" p-2 truncate whitespace-nowrap text-xl font-semibold ">
            {post.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UrgentPosts;
