import React from "react";
import CreateActivityForm from "../../../components/forms/CreateActivityForm.jsx";
import AllActivities from "../../../components/AllActivities";

const page = () => {
  return (
    <div className="flex size-full flex-row gap-8 p-8 max-sm:p-3 overflow-auto">
      <AllActivities />
      <CreateActivityForm />
    </div>
  );
};

export default page;
