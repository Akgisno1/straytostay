"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getTimestamp } from "../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { getUserByName } from "../../lib/actions/user.action";

const PostCard = ({
  postId,
  authorusername,
  title,
  description,
  images,
  urgency,
  createdAt,
}) => {
  const formattedDate = getTimestamp(createdAt);

  const [author, setauthor] = useState(null);

  useEffect(() => {
    const fetchauthor = async () => {
      try {
        const fetchedauthor = await getUserByName(authorusername);
        setauthor(fetchedauthor);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchauthor();
  }, [authorusername]);
  return (
    <div className=" flex h-[430px] w-[48%] flex-col rounded-lg bg-primary-foreground p-4 text-card-foreground shadow-md max-md:h-[330px] max-sm:w-[98%] ">
      {author && (
        <div className="mb-4 flex flex-row items-center justify-between">
          <Link href={`/user/${author._id}`} className="flex flex-row ">
            <Avatar>
              <AvatarImage src={author.avatar} alt={authorusername} />
              <AvatarFallback>
                {authorusername.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3 flex flex-col justify-center ">
              <div className="font-semibold">{authorusername}</div>
              <div className="text-sm text-gray-500 max-md:text-xs">
                {formattedDate}
              </div>
            </div>
          </Link>
          <div className="flex flex-row items-center gap-2 font-oxo font-bold">
            {urgency && (
              <div className=" rounded-lg p-2 text-center text-base font-bold  text-red-500 max-lg:text-sm">
                Urgent
              </div>
            )}
            <Link
              href={`/user/${author._id}`}
              className="truncate rounded-lg bg-green-500 p-2 text-center text-base  text-primary-foreground max-lg:text-sm"
            >
              Contact here
            </Link>
          </div>
        </div>
      )}

      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <img
                src={image}
                alt={`Post image ${index}`}
                className="h-64 w-full rounded-lg object-cover max-md:h-40"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="my-2 line-clamp-1 text-xl font-semibold ">{title}</div>
      <div className="mt-1 line-clamp-2 overflow-hidden ">{description}</div>
    </div>
  );
};

export default PostCard;
