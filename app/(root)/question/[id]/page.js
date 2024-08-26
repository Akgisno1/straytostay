import QuestionInfo from "../../../../components/shared/QuestionInfo";
import TopQuestions from "../../../../components/shared/TopQuestions";
const page = () => {
  return (
    <div className="flex size-full flex-row gap-4 overflow-auto p-4 max-sm:p-3">
      <QuestionInfo />
      <div className="relative h-full w-2/5 overflow-auto rounded-xl bg-secondary p-4 max-lg:hidden">
        <TopQuestions />
      </div>
    </div>
  );
};

export default page;
