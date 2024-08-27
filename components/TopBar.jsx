"use client";
import React from "react";
import ProfileAvatar from "./shared/ProfileAvatar";
import Link from "next/link";

// import GlobalSearch from "./shared/GlobalSearch";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "../context/AuthContext";

const TopBar = () => {
  const { currentUser, currentNgo } = useAuth();

  return (
    <div className="flex h-[9vh] w-full flex-row items-center justify-between p-4">
      <div className="flex flex-row items-center gap-4">
        <h2 className="font-oxo text-4xl font-bold text-green-500 max-md:text-3xl ">
          StraytoStay
        </h2>
      </div>

      {/* <div className="flex flex-row items-center justify-center rounded-xl bg-transparent max-md:hidden">
        <GlobalSearch />
      </div> */}

      <div className="flex flex-row items-center justify-end gap-4">
        {currentUser || currentNgo ? (
          <ProfileAvatar />
        ) : (
          <Link
            href="/useraccess"
            className="rounded-md bg-accent p-2 font-oxo text-xl text-accent-foreground max-md:text-base"
          >
            Login/Register
          </Link>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default TopBar;
