"use client";

import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { createPostSchema } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useAuth } from "../../context/AuthContext";
import { Textarea } from "../ui/textarea";
import { createPost } from "../../lib/actions/post.action";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import UploadWidget from "../shared/UploadWidget";

const UserLoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [images, setImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      urgency: false,
    },
  });

  const onSubmit = async (values) => {
    try {
      await createPost({
        authorusername: currentUser.username,
        title: values.title,
        description: values.description,
        images,
        urgency: values.urgency,
      });
      toast({
        title: "Adoption Post Created",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error creating Post",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex size-full flex-row items-center justify-center  gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full w-[70%] gap-4 space-y-4 rounded-xl bg-primary-foreground p-4 font-mont"
        >
          <h1 className="pb-6 font-mont text-3xl ">Create Adoption Post</h1>
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2 font-mont text-xl font-bold text-foreground">
                  Post Description
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-12 bg-[hsl(var(--card))]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormLabel className="ml-4 mt-2 font-mont text-xl font-bold text-foreground">
                  Urgent Adoption
                </FormLabel>
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-8 font-mont text-xl font-bold ">
            Create Post
          </Button>
        </form>
      </Form>
      <div className="relative flex h-full w-[30%] overflow-hidden rounded-xl bg-primary-foreground p-4">
        <div className="flex w-full flex-col gap-4 overflow-auto px-4">
          {images.map((image, index) => (
            <img
              src={image}
              key={index}
              alt=""
              className="h-1/3 w-full rounded-lg object-cover"
            />
          ))}
        </div>
        <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <UploadWidget
            uwConfig={{
              multiple: true,
              cloudName: "Akgisno1",
              uploadPreset: "straytostay",
              folder: "posts",
            }}
            setState={setImages}
          />
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
