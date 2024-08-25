import CreateQuestionForm from "../../../components/forms/CreateQuestionForm";
import AllQuestions from "../../../components/AllQuestions";
import TopQuestions from "../../../components/shared/TopQuestions";
const page = () => {
  return (
    <div className="flex size-full flex-row gap-4 overflow-auto p-4 max-sm:p-3">
      <AllQuestions />
      <div className="relative h-full w-2/5 overflow-auto rounded-xl bg-secondary p-4 max-lg:hidden">
        <CreateQuestionForm />
        <TopQuestions />
      </div>
    </div>
  );
};

export default page;
