import React from "react";
import AllPosts from "../../../components/AllPosts";
import UrgentPosts from "../../../components/shared/UrgentPosts";
const page = () => {
  return (
    <div className="flex size-full flex-row gap-4 overflow-auto p-4 ">
      <AllPosts />
      <div className="h-full w-2/5 max-lg:hidden">
        <UrgentPosts />
      </div>
    </div>
  );
};

export default page;
