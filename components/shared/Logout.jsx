import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { logoutUser } from "../../lib/actions/user.action";
import { useToast } from "../ui/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { logoutNgo } from "../../lib/actions/ngo.action";

const Logout = () => {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, currentNgo } = useAuth();

  const handlelogout = async () => {
    try {
      if (currentUser) {
        await logoutUser();
        localStorage.removeItem("user");
      }
      if (currentNgo) {
        await logoutNgo();
        localStorage.removeItem("ngo");
      }

      router.push("/");

      window.location.reload();

      toast({
        title: "User Logged Out",
      });
    } catch (error) {
      toast({
        title: "LogOut failed",
        variant: "destructive",
      });
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          onClick={handlelogout}
          className="group flex h-10 items-center  rounded-md px-3 py-6 font-oxo text-lg font-bold text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))] "
        >
          <FaSignOutAlt className="text-2xl text-[hsl(var(--destructive))] group-hover:text-white md:text-center" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>Logout</HoverCardContent>
    </HoverCard>
  );
};

export default Logout;
