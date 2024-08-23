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
import { createAnswerSchema } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../../context/AuthContext";
import { Textarea } from "../ui/textarea";

import { createAnswer } from "../../lib/actions/answer.action";

const CreateAnswerForm = (questionId) => {
  const { toast } = useToast();
  const pathname = usePathname();
  const { currentUser, currentNgo } = useAuth();

  const form = useForm({
    resolver: zodResolver(createAnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await createAnswer({
        questionId: questionId.questionId,
        authorId: currentUser?._id || currentNgo?._id,
        content: values.content,
        path: pathname,
      });
      form.reset();
      toast({
        title: "Answer Created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error creating Answer",
        variant: "destructive",
      });
    }
  };
  if (!currentNgo && !currentUser) {
    return null;
  }

  return (
    <div className="flex w-full flex-row items-center justify-center  gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex size-full   flex-row items-center gap-4 rounded-xl bg-primary-foreground pt-4 font-mont"
        >
          <FormField
            className="h-10 w-full"
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="h-10 w-full">
                <FormControl className="h-10 w-full">
                  <Textarea
                    {...field}
                    className="h-10 w-full bg-[hsl(var(--card))]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className=" bg-green-700 font-mont text-sm font-bold hover:bg-green-500"
          >
            Answer
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateAnswerForm;
