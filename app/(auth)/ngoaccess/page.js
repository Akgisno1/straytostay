import NgoLoginForm from "../../../components/forms/NgoLoginForm.jsx";
import NgoRegisterForm from "../../../components/forms/NgoRegisterForm.jsx";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs.jsx";
import Link from "next/link";
import { ModeToggle } from "../../../components/ModeToggle.jsx";

const page = () => {
  return (
    <div className="flex size-full flex-row">
      <div className=" relative flex h-full w-1/2 items-center justify-center max-md:w-full">
        <div className=" w-3/5 max-md:w-[90%]">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <NgoLoginForm />
            </TabsContent>
            <TabsContent value="register">
              <NgoRegisterForm />
            </TabsContent>
          </Tabs>
        </div>

        <div className="absolute right-[10%] top-[5%] max-md:right-[5%] z-10 flex flex-row items-center gap-4">
          <Link
            href="/"
            className=" rounded bg-primary p-2 font-oxo text-xl text-primary-foreground max-sm:text-base"
          >
            Home
          </Link>
          <ModeToggle />
        </div>
      </div>
      <div className="relative flex h-full w-1/2 items-center justify-center max-md:hidden">
        <div className="absolute right-[10%] top-[10%]  z-10 flex flex-row gap-3 font-oxo text-primary">
          <Image src="/straytostay.png" alt="logo" width={36} height={36} />
          <h2 className="font-oxo text-4xl font-bold text-white max-md:text-3xl max-sm:hidden">
            StraytoStay
          </h2>
        </div>
        <img
          src="/ngologpage.jpg"
          alt="loginpageimage"
          className=" size-[90%] object-cover grayscale  transition duration-300 ease-in-out hover:grayscale-0"
        />
        <div className="absolute bottom-[10%] left-[10%] z-10 flex w-4/5 flex-row gap-3 font-oxo text-primary">
          <h2 className="font-oxo text-2xl  text-white max-md:text-3xl max-sm:hidden">
            Compassion knows no species. Stand up for those who cannot
            speak—because every life, no matter how small, deserves care,
            respect, and kindness.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default page;
