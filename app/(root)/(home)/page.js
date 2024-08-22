import React from "react";
import AllPosts from "../../../components/AllPosts";
import UrgentPosts from "../../../components/shared/UrgentPosts";
const page = () => {
  return (
    <div className="flex size-full flex-row gap-8 p-8 overflow-auto">
      <AllPosts />
      <div className="max-lg:hidden h-full w-2/5">
        <UrgentPosts />
      </div>
    </div>
  );
};

export default page;
