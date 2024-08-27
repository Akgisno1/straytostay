"use client";

import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { createQuestionSchema } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../../context/AuthContext";
import { Textarea } from "../ui/textarea";

import { createQuestion } from "../../lib/actions/question.action";

const CreateQuestionForm = () => {
  const { toast } = useToast();
  const pathname = usePathname();
  const { currentUser, currentNgo } = useAuth();
  const isloggedIn = currentUser || currentNgo;

  const form = useForm({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await createQuestion({
        authorId: currentUser?._id || currentNgo?._id,
        content: values.content,
        path: pathname,
      });
      form.reset();
      toast({
        title: "Question Created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error creating Question",
        variant: "destructive",
      });
    }
  };

  if (!isloggedIn) {
    return null;
  }
  return (
    <div className="flex w-full flex-row items-center justify-center  gap-4 max-sm:gap-2 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="size-full gap-4 max-sm:gap-2 space-y-4 rounded-xl bg-primary-foreground p-4 max-sm:p-2 font-mont "
        >
          <h1 className=" font-mont text-3xl max-lg:text-xl max-sm:text-base">
            Question the Community
          </h1>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-12 max-sm:h-8 bg-[hsl(var(--card))]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-8 max-sm:h-6 max-sm:mt-2 bg-green-700 font-mont text-xl font-bold hover:bg-green-500 max-lg:text-base max-sm:text-xs"
          >
            Ask Question
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateQuestionForm;
