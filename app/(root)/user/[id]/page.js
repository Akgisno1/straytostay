import React from "react";

import UrgentPosts from "../../../../components/shared/UrgentPosts";
import UserInfo from "../../../../components/shared/UserInfo";
const page = () => {
  return (
    <div className="flex size-full flex-row gap-4 overflow-auto p-4 max-sm:p-4">
      <UserInfo />
      <div className="h-full w-2/5 max-lg:hidden">
        <UrgentPosts />
      </div>
    </div>
  );
};

export default page;
