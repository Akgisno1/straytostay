"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers, FaBuilding, FaFileAlt } from "react-icons/fa";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const BottomBar = () => {
  const pathname = usePathname();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setScrollDirection(currentScrollTop > lastScrollTop ? "down" : "up");
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const linkClasses = (href) =>
    `flex items-center justify-center p-2 text-lg font-bold rounded-md ${
      pathname === href ? "bg-green-500" : "text-primary hover:bg-card"
    }`;

  const iconClasses = (href) =>
    `${pathname === href ? "text-primary-foreground" : "text-primary"}`;

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-neutral-200 bg-accent dark:border-white/[0.2] ${
        scrollDirection === "down" ? "translate-y-full" : "translate-y-0"
      } transition-transform duration-300 ease-in-out sm:hidden`}
    >
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
            <FaBuilding className={`text-2xl ${iconClasses("/ngoactivity")}`} />
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
    </div>
  );
};

export default BottomBar;
