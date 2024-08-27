import React from "react";
import CreateActivityForm from "../../../components/forms/CreateActivityForm.jsx";
import AllActivities from "../../../components/AllActivities";

const page = () => {
  return (
    <div className="flex size-full flex-row gap-4 overflow-auto p-4 max-sm:p-3 max-lg:flex-col ">
      <AllActivities />
      <CreateActivityForm />
    </div>
  );
};

export default page;
