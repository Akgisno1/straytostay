"use client";
import React, { useState } from "react";
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
} from "../ui/form";
import { userValidationSchema } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import UploadWidget from "../shared/UploadWidget";
import { createUser } from "../../lib/actions/user.action";

const UserRegisterForm = () => {
  const { toast } = useToast();
  const [images, setImages] = useState([]);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(userValidationSchema),
  });

  const onSubmit = async (values) => {
    try {
      await createUser({
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password,

        phoneNumber: values.phoneNumber,
        bio: values.bio,
        avatar: images[0],
      });
      router.push("/useraccess");
      toast({
        title: "Registered user",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "User Registration Failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex size-full flex-col items-center  rounded-b-xl bg-[hsl(var(--secondary))]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-2 h-[80%] text-white gap-1 flex flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Name"
                    className="h-12 bg-[hsl(var(--card))]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                    className="h-12 bg-[hsl(var(--card))]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row w-full gap-1">
            <FormField
              className="w-full"
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      {...field}
                      placeholder="Username"
                      className="w-full h-12 bg-[hsl(var(--card))]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="w-full"
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="w-full h-12 bg-[hsl(var(--card))]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="bio"
                    {...field}
                    placeholder="Bio"
                    className="h-12 bg-[hsl(var(--card))]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2 w-full">
            <FormField
              control={form.control}
              name="phoneNumber"
              className="w-full"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="w-full">
                    <Input
                      type="number"
                      placeholder="Phone"
                      {...field}
                      className="w-1/2 h-12 bg-[hsl(var(--card))]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="  font-mont text-lg font-bold bg-green-700 hover:bg-green-500"
          >
            Register User
          </Button>
        </form>
      </Form>
      <div className="relative flex  w-full h-48 overflow-hidden rounded-xl  p-4">
        <div className="flex w-full flex-row gap-4 overflow-auto px-4">
          {images.map((image, index) => (
            <img
              src={image}
              key={index}
              alt=""
              className="h-full w-full  object-cover rounded-full"
            />
          ))}
        </div>
        <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <UploadWidget
            uwConfig={{
              multiple: true,
              cloudName: "Akgisno1",
              uploadPreset: "straytostay",
              folder: "useravatars",
            }}
            setState={setImages}
            buttonText="User Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default UserRegisterForm;
