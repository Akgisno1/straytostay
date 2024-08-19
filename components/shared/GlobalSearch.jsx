import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";

const GlobalSearch = () => {
  return (
    <div className="  flex h-[7vh] w-[20vw] flex-row items-center gap-2 rounded-xl bg-accent p-2   lg:w-[30vw]">
      <Image
        src="/search.svg"
        alt="search"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder="Search globally"
        className=" h-[6vh] border-none
          shadow-none outline-none"
      />
    </div>
  );
};

export default GlobalSearch;
