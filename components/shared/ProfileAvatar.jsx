import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "../../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logoutUser } from "../../lib/actions/user.action";
import { useToast } from "../ui/use-toast";

const ProfileAvatar = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const pathname = usePathname();
  const handlelogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("user");

      if (pathname !== "/") {
        router.push("/");
      } else {
        window.location.reload();
      }
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>
            {currentUser.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/">View Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/">Edit Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/">View Chats</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div onClick={handlelogout}>Logout</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
