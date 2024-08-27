"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getActivityById,
  incrementActivityViews,
} from "../../lib/actions/activity.action";
import { useAuth } from "../../context/AuthContext";
import { getUserById } from "../../lib/actions/user.action";
import { getTimestamp } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import LikeButton from "../icons/LikeButton";
import CreateCommentForm from "../forms/CreateCommentForm";
import AllComments from "./AllComments";

const ActivityInfo = () => {
  const params = useParams();
  const activityId = params.id;
  const [activity, setactivity] = useState(null);
  const [user, setUser] = useState(null);
  const [viewIncremented, setViewIncremented] = useState(false); // State to track if views were incremented
  const { currentNgo, currentUser } = useAuth();
  const isloggedIn = currentUser || currentNgo;

  useEffect(() => {
    const fetchactivity = async () => {
      try {
        const fetchedactivity = await getActivityById(activityId);
        if (fetchedactivity) {
          setactivity(fetchedactivity);
          console.log(fetchedactivity);
        } else {
          console.error("activity not found");
        }
      } catch (error) {
        console.error("Failed to fetch activity data:", error);
      }
    };
    fetchactivity();
  }, [activityId]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (activity?.authorId) {
          const fetchedUser = await getUserById(activity.authorId);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, [activity?.authorId]);

  const incrementViews = async () => {
    try {
      await incrementActivityViews(activityId);
      setViewIncremented(true); // Mark as incremented after the call
    } catch (error) {
      console.error("Failed to increment activity views:", error);
    }
  };

  useEffect(() => {
    if (activityId && !viewIncremented) {
      // Only increment if not already incremented
      incrementViews();
    }
  }, [activityId, viewIncremented]);
  const formattedDate = activity ? getTimestamp(activity.createdAt) : "";

  return (
    <div className="relative flex size-full flex-col items-start gap-4 overflow-x-hidden rounded-xl bg-secondary p-4 max-sm:p-3">
      <div className="flex w-full flex-col gap-2 rounded-lg bg-primary-foreground p-4 pt-2 text-card-foreground shadow-md">
        {activity && (
          <>
            <div className="flex flex-row items-center justify-between">
              {user && (
                <Link href={`/user/${user._id}`} className="flex flex-row">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex flex-col justify-center">
                    <div className="font-semibold">{user.username}</div>
                  </div>
                </Link>
              )}
              <div className="flex items-center gap-4">
                {isloggedIn && (
                  <LikeButton
                    activityId={activityId}
                    initialLikes={activity?.likes}
                    userId={currentNgo?._id || currentUser?._id}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-row  items-center overflow-y-hidden ">
              {activity.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="h-56 w-full rounded-lg object-contain"
                />
              ))}
            </div>
            <div className=" font-mont text-lg font-bold max-sm:text-sm">
              {activity.title}
            </div>
            <div className="flex flex-row items-center gap-6 text-sm max-sm:text-xs">
              <div className="text-gray-500">{activity.views} views</div>
              <div className="text-gray-500">{formattedDate}</div>
            </div>

            <div className="flex flex-col">
              <CreateCommentForm activityId={activityId} />
            </div>
          </>
        )}
      </div>
      <div className="flex w-full flex-col">
        <AllComments activityId={activityId} />
      </div>
    </div>
  );
};

export default ActivityInfo;
