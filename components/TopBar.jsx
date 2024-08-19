"use client";
import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GlobalSearch from "./shared/GlobalSearch";
import { ModeToggle } from "./ModeToggle";

const TopBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-[9vh] w-full flex-row items-center justify-between p-4">
      <div className="flex flex-row items-center gap-4">
        <h2 className="font-oxo text-4xl font-bold text-primary max-md:text-3xl max-sm:hidden">
          StraytoStay
        </h2>
      </div>
      {!(pathname === "/access" || pathname === "/access-ngo") && (
        <div className="flex flex-row items-center justify-center rounded-xl bg-transparent max-md:hidden">
          <GlobalSearch />
        </div>
      )}
      <div className="flex flex-row items-center justify-end gap-4">
        <Link
          href="/useraccess"
          className="rounded-md bg-accent p-2 font-oxo text-xl text-accent-foreground max-md:text-base"
        >
          Login/Register
        </Link>

        <ModeToggle />
      </div>
    </div>
  );
};

export default TopBar;
