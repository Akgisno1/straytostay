import UserLoginForm from "../../../components/forms/UserLoginForm.jsx";
import UserRegisterForm from "../../../components/forms/UserRegisterForm.jsx";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs.jsx";
import Link from "next/link";
import { ModeToggle } from "../../../components/ModeToggle.jsx";
import { Button } from "../../../components/ui/button.jsx";

const page = () => {
  return (
    <div className="flex size-full flex-row">
      <div className=" relative flex h-full w-1/2 items-center justify-center">
        <div className=" w-3/5">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <UserLoginForm />
            </TabsContent>
            <TabsContent value="register">
              <UserRegisterForm />
            </TabsContent>
          </Tabs>
        </div>

        <div className="absolute right-[10%] top-[10%] z-10 flex flex-row items-center gap-4">
          <Button className=" rounded bg-primary p-2 font-oxo text-xl text-primary-foreground max-sm:text-base">
            <Link href="/">Home</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
      <div className="relative flex h-full w-1/2 items-center justify-center">
        <div className="absolute right-[10%] top-[10%] z-10 flex flex-row gap-3 font-oxo text-primary">
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
