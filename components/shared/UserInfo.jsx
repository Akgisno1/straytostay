"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getUserById } from "../../lib/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserInfo = () => {
  const params = useParams(); // Use useParams to get the dynamic path parameter
  const userId = params.id;
  const [user, setUser] = useState(null); // Fetch the 'id' parameter from the URL path
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);
        console.log(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="relative flex size-full flex-wrap items-start gap-6 overflow-auto overflow-x-hidden rounded-xl bg-secondary px-6 py-8 max-md:justify-center max-sm:p-3">
      {user?.cover && (
        <div className="max-sm: absolute top-0 h-[250px] w-full items-center justify-center overflow-hidden max-sm:h-[120px]">
          <img
            src={user.cover}
            className=" w-full object-cover object-center"
          />
        </div>
      )}

      {user && (
        <div className="z-10 flex w-full flex-row items-center  gap-8 max-sm:mt-14 max-sm:gap-2">
          <Avatar className="size-52 max-sm:size-24">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className=" flex w-full flex-col overflow-hidden rounded-xl  p-4 text-primary backdrop-blur-3xl max-sm:p-1 max-sm:text-xs">
            <div>{user.username}</div>
            <div>{user.name.toUpperCase()}</div>
            <div className="flex flex-row max-sm:flex-col ">
              <div>{user.phoneNumber}</div>
              <div className="text-blue-500">{user.email}</div>
            </div>
            <div>{user.bio}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
