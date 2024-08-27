import ActivityInfo from "../../../../components/shared/ActivityInfo";
import CreateActivityForm from "../../../../components/forms/CreateActivityForm.jsx";
const page = () => {
  return (
    <div className="flex size-full flex-row gap-4 overflow-auto p-4 max-sm:p-3">
      <ActivityInfo />

      <div className="size-full max-lg:hidden">
        <CreateActivityForm />
      </div>
    </div>
  );
};

export default page;
