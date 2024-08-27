import CreateQuestionForm from "../../../components/forms/CreateQuestionForm";
import AllQuestions from "../../../components/AllQuestions";
import TopQuestions from "../../../components/shared/TopQuestions";
const page = () => {
  return (
    <div className="flex size-full flex-row max-lg:flex-col gap-4 overflow-auto p-4 max-sm:p-3 max-lg:h-[130vh]">
      <AllQuestions />
      <div className="relative flex flex-col h-full w-2/5 max-lg:h-[30vh] overflow-auto rounded-xl bg-secondary p-4 max-lg:w-full max-lg:flex-row  max-lg:gap-4 ">
        <CreateQuestionForm />
        <TopQuestions />
      </div>
    </div>
  );
};

export default page;
