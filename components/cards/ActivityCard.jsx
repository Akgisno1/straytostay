"use client";
import React, { useState, useEffect } from "react";
import { getNgoById } from "../../lib/actions/ngo.action";
import { getTimestamp } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useAuth } from "../../context/AuthContext";
import LikeButton from "../icons/LikeButton"; // Import the LikeButton component
import Link from "next/link";

const ActivityCard = ({
  postId,
  authorId,
  title,
  likes,
  images,
  views,
  createdAt,
}) => {
  const formattedDate = getTimestamp(createdAt);
  const { currentUser, currentNgo } = useAuth();

  // State to store the fetched NGO data
  const [ngo, setNgo] = useState(null);

  useEffect(() => {
    // Fetch NGO data when the component mounts
    const fetchNgo = async () => {
      try {
        const fetchedNgo = await getNgoById(authorId);
        setNgo(fetchedNgo); // Store the fetched NGO data in state
      } catch (error) {
        console.error("Failed to fetch NGO data:", error);
      }
    };

    fetchNgo();
  }, [authorId]);

  return (
    <div
      className={`flex h-[400px] ${
        currentNgo ? "w-[48%]" : "w-[32%]"
      } flex-col rounded-lg bg-primary-foreground p-4 text-card-foreground shadow-md max-sm:w-[96%]`}
    >
      <div className="mb-4 flex flex-row items-center justify-between">
        {ngo && ( // Only render this part if ngo data is loaded
          <Link
            href={`/user/${ngo._id}`}
            className="flex flex-row items-center"
          >
            <Avatar>
              <AvatarImage src={ngo.avatar} alt={ngo.name} />
              <AvatarFallback>
                {ngo.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3 font-semibold">{ngo.name}</div>
          </Link>
        )}
      </div>

      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <img
                src={image}
                alt={`Post image ${index}`}
                className="h-56 w-full rounded-lg object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mb-2 mt-4 truncate text-xl font-semibold">{title}</div>
      <div className="flex flex-row items-center justify-start gap-6">
        <LikeButton
          activityId={postId}
          initialLikes={likes}
          userId={currentNgo?._id || currentUser?._id}
        />
        <div className="text-sm text-gray-500">{views} views</div>

        <div className="ml-auto text-sm text-gray-500">{formattedDate}</div>
      </div>
    </div>
  );
};

export default ActivityCard;
