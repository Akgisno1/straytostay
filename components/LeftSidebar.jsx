"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaFileAlt,
  FaBookmark,
} from "react-icons/fa";
import Logout from "./shared/Logout";
import { useAuth } from "../context/AuthContext";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import Image from "next/image";
import { useTheme } from "next-themes";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const { theme } = useTheme();

  const linkClasses = (href) =>
    `flex h-10 items-center py-6 px-3 gap-3 font-oxo text-lg font-bold rounded-md justify-center ${
      pathname === href ? "bg-primary" : "text-primary hover:bg-card"
    }`;

  const iconClasses = (href) =>
    `${pathname === href ? "text-primary-foreground" : "text-primary"}`;

  return (
    <div className="flex h-full  w-[100px] flex-col justify-between bg-accent max-sm:hidden">
      <div className="mt-4 flex h-full flex-col items-center gap-5">
        <div className="mb-5">
          <Image
            src="/straytostay.png"
            alt="logo"
            width={36}
            height={36}
            className={theme === "light" ? "invert" : ""}
          />
        </div>

        <HoverCard>
          <HoverCardTrigger>
            <Link href="/" className={linkClasses("/")}>
              <FaHome className={`text-2xl ${iconClasses("/")}`} />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent>Home</HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Link href="/community" className={linkClasses("/community")}>
              <FaUsers className={`text-2xl ${iconClasses("/community")}`} />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent>Community</HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Link href="/ngoactivity" className={linkClasses("/ngoactivity")}>
              <FaBuilding
                className={`text-2xl ${iconClasses("/ngoactivity")}`}
              />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent>NGO Activity</HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Link href="/createpost" className={linkClasses("/createpost")}>
              <FaFileAlt className={`text-2xl ${iconClasses("/createpost")}`} />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent>Create Post</HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger>
            <Link href="/savedpost" className={linkClasses("/savedpost")}>
              <FaBookmark className={`text-2xl ${iconClasses("/savedpost")}`} />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent>Saved Posts</HoverCardContent>
        </HoverCard>
      </div>

      <div className="mb-5 flex justify-center">
        {currentUser && <Logout />}
      </div>
    </div>
  );
};

export default LeftSidebar;
