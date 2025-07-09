import { PawPrint } from "lucide-react";
import React from "react";
import OnboardingForm from "../forms/OnboardingForm";

const OnboardingPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className=" text-primary-foreground flex size-8 items-center justify-center rounded-md bg-green-600">
            <PawPrint className="size-6 bg-green-600" />
          </div>
          <span className=" font-oxo text-2xl font-bold">StraytoStay</span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <OnboardingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
