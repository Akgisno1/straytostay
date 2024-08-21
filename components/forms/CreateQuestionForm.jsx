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
  FormLabel,
} from "../ui/form";
import { createQuestionSchema } from "../../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../../context/AuthContext";
import { Textarea } from "../ui/textarea";

import { createQuestion } from "../../lib/actions/question.action";

const CreateQuestionForm = () => {
  const { toast } = useToast();
  const pathname = usePathname();
  const { currentUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await createQuestion({
        authorId: currentUser._id,
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

  // Render the form only if there's a current user
  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex w-full flex-row items-center justify-center  gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full w-full gap-4 space-y-4 rounded-xl bg-primary-foreground p-4 font-mont"
        >
          <h1 className=" font-mont text-3xl ">Question the Community</h1>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} className="h-12 bg-[hsl(var(--card))]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-8 bg-green-700 font-mont text-xl font-bold hover:bg-green-500"
          >
            Ask Question
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateQuestionForm;
