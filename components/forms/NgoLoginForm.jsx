"use client";
import React from "react";
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
import { ngoLoginSchema } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useAuth } from "../../context/AuthContext";

import { loginNgo } from "../../lib/actions/ngo.action";

const NgoLoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { updateNgo } = useAuth();

  const form = useForm({
    resolver: zodResolver(ngoLoginSchema),
  });

  const onSubmit = async (values) => {
    try {
      const ngoInfo = await loginNgo({
        username: values.username,
        password: values.password,
      });

      if (ngoInfo) {
        localStorage.setItem("ngo", ngoInfo);
        updateNgo(JSON.parse(ngoInfo));
        toast({
          title: "Ngo Logged In",
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center rounded-t-xl bg-[hsl(var(--secondary))]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-4 text-white"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2 font-mont text-xl font-bold text-[hsl(var(--foreground))]">
                  Username
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-2 font-mont text-xl font-bold text-[hsl(var(--foreground))]">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="h-12 bg-[hsl(var(--card))]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-8 font-mont text-xl font-bold bg-green-700 hover:bg-green-500"
          >
            NGO Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NgoLoginForm;
