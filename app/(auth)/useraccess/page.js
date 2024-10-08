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
// import { Button } from "../../../components/ui/button.jsx";

const page = () => {
  return (
    <div className="flex size-full flex-row">
      <div className="relative flex h-full w-1/2 items-center justify-center max-md:hidden">
        <div className="absolute left-[10%] top-[10%] z-10 flex flex-row gap-3 font-oxo text-primary">
          <Image src="/straytostay.png" alt="logo" width={36} height={36} />
          <h2 className="font-oxo text-4xl font-bold text-white max-md:text-3xl max-sm:hidden">
            StraytoStay
          </h2>
        </div>
        <img
          src="/logpage.jpg"
          alt="loginpageimage"
          className=" size-[90%] object-cover grayscale  transition duration-300 ease-in-out hover:grayscale-0"
        />
        <div className="absolute bottom-[10%] left-[10%] z-10 flex w-4/5 flex-row gap-3 font-oxo text-primary">
          <h2 className="font-oxo text-2xl  text-white max-md:text-3xl max-sm:hidden">
            Adopt a friend, save a life. Every stray deserves a loving home and
            a chance at happiness. Open your heart and let love in—give a stray
            a forever home today.
          </h2>
        </div>
      </div>
      <div className=" relative flex h-full w-1/2 items-center justify-center max-md:w-full">
        <div className=" mt-4 w-3/5 max-md:w-[90%]">
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
        <Link
          href="/ngoaccess"
          variant="outline"
          className="absolute left-[10%] top-[5%] z-10 rounded bg-green-500 p-2 font-oxo text-xl text-primary max-md:left-[5%] max-sm:text-base"
        >
          Login/Register as an NGO
        </Link>
        <div className="absolute right-[10%] top-[5%] z-10 flex flex-row items-center gap-4 max-md:right-[5%]">
          <Link
            href="/"
            className=" rounded bg-primary p-2 font-oxo text-xl text-primary-foreground max-sm:text-base"
          >
            Home
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default page;
