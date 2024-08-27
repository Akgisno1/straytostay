"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getUserById } from "../../lib/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { checkisngo } from "../../lib/actions/ngo.action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import UserPosts from "./UserPosts";
import UserActivities from "./UserActivities";
import UserQuestions from "./UserQuestions";

const UserInfo = () => {
  const params = useParams();
  const userId = params.id;
  const [user, setUser] = useState(null);
  const [isngo, setisngo] = useState(false);

  useEffect(() => {
    const fetchisngo = async () => {
      try {
        const fetchedisngo = await checkisngo(userId);
        setisngo(fetchedisngo);
      } catch (error) {
        console.error("Failed to check ngo", error);
      }
    };
    fetchisngo();
  }, [userId]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="relative flex size-full flex-wrap items-start gap-6 overflow-auto overflow-x-hidden rounded-xl bg-secondary p-4  max-sm:p-3">
      {user?.cover && (
        <div className="max-sm: absolute top-0 h-[250px] w-full items-center justify-center overflow-hidden max-sm:h-[120px]">
          <img
            src={user.cover}
            className=" w-full object-cover object-center"
          />
        </div>
      )}
      <div className=" z-10 w-full flex-col">
        {user && (
          <div className=" flex w-full flex-row items-center  gap-8 max-sm:mt-14 max-sm:gap-2">
            <Avatar className="size-52 max-sm:size-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className=" bg-primary- flex w-full flex-col overflow-hidden rounded-xl  p-4 text-primary max-sm:p-1 max-sm:text-xs">
              <div className="text-blue-500">@{user.username}</div>
              <div>{user.name.toUpperCase()}</div>
              <div className="flex flex-row gap-2 max-sm:flex-col">
                <div>{user.phoneNumber}</div>
                <div className="text-blue-500">{user.email}</div>
              </div>
              <div>{user.bio}</div>
            </div>
          </div>
        )}
        <div className="mt-10 w-full">
          <Tabs defaultValue="posts" className="w-full ">
            <TabsList>
              <TabsTrigger value="posts" className="text-xl">
                Posts
              </TabsTrigger>
              <TabsTrigger value="questions" className="text-xl">
                Questions
              </TabsTrigger>
              {isngo && (
                <TabsTrigger value="activities" className="text-xl">
                  Activity
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="posts">
              <UserPosts userId={userId} />
            </TabsContent>
            <TabsContent value="questions">
              <UserQuestions userId={userId} />
            </TabsContent>
            <TabsContent value="activities">
              <UserActivities userId={userId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
