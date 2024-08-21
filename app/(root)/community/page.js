import CreateQuestionForm from "../../../components/forms/CreateQuestionForm";
import AllQuestions from "../../../components/AllQuestions";
import TopQuestions from "../../../components/shared/TopQuestions";
const page = () => {
  return (
    <div className="flex size-full flex-row gap-8 p-8 max-sm:p-3 overflow-auto">
      <AllQuestions />
      <div className="max-lg:hidden h-full w-2/5 bg-secondary p-6 rounded-xl relative overflow-auto">
        <CreateQuestionForm />
        <TopQuestions />
      </div>
    </div>
  );
};

export default page;
