"use client";

import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { createActivitySchema } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useAuth } from "../../context/AuthContext";

import { createActivity } from "../../lib/actions/activity.action";
import { useState } from "react";

import UploadWidget from "../shared/UploadWidget";
import { usePathname } from "next/navigation";

const UserLoginForm = () => {
  const { toast } = useToast();
  const pathname = usePathname();
  const { currentUser } = useAuth();
  const [images, setImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      urgency: false,
    },
  });

  const onSubmit = async (values) => {
    try {
      await createActivity({
        authorId: currentUser._id,
        title: values.title,
        images,
        path: pathname,
      });
      toast({
        title: "NGO Activity Posted",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Posting Activity",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex size-full flex-col items-center justify-center  gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="size-full gap-4 space-y-4 rounded-xl bg-primary-foreground p-4 font-mont"
        >
          <h1 className="pb-6 font-mont text-3xl ">Post NGO Activity</h1>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2 font-mont text-xl font-bold text-[hsl(var(--foreground))]">
                  Post Title
                </FormLabel>
                <FormControl>
                  <Input {...field} className="h-12 bg-[hsl(var(--card))]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-8 bg-green-700 font-mont text-xl font-bold hover:bg-green-500 "
          >
            Post Activity
          </Button>
        </form>
      </Form>
      <div className="relative flex size-full overflow-hidden rounded-xl bg-primary-foreground p-4">
        <div className="flex w-full flex-row gap-4 overflow-auto px-4">
          {images.map((image, index) => (
            <img
              src={image}
              key={index}
              alt=""
              className="h-full rounded-lg object-cover"
            />
          ))}
        </div>
        <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <UploadWidget
            uwConfig={{
              multiple: true,
              cloudName: "Akgisno1",
              uploadPreset: "straytostay",
              folder: "activity",
            }}
            setState={setImages}
          />
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
