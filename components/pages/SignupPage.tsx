import { PawPrint } from "lucide-react";
import React from "react";
import { SignupForm } from "../forms/SignupForm";

const SignUpPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/ngologpage.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] "
        />
        <div className="absolute bottom-[10%] left-[10%] z-10 flex w-4/5 flex-row gap-3 font-oxo text-primary">
          <h2 className="font-oxo text-2xl  text-white max-md:text-3xl max-sm:hidden">
            Compassion knows no species. Stand up for those who cannot
            speak—because every life, no matter how small, deserves care,
            respect, and kindness.
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-end">
          <div className=" text-primary-foreground flex size-8 items-center justify-center rounded-md bg-green-600">
            <PawPrint className="size-6 bg-green-600" />
          </div>
          <span className=" font-oxo text-2xl font-bold">StraytoStay</span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
