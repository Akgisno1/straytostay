// src/components/QuestionDeleteButton.js

"use client";

import React, { useEffect, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons"; // Import a trash icon
import { deleteQuestion } from "../../lib/actions/question.action"; // Import server action to delete question
import { useRouter, usePathname } from "next/navigation"; // Import hooks to use router and pathname
import { useToast } from "../ui/use-toast"; // Import your custom toast hook
import { useAuth } from "../../context/AuthContext"; // Import your AuthContext

const QuestionDeleteButton = ({ questionId, authorId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast(); // Use the toast function from react-hot-toast
  const { currentUser, currentNgo } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  // Determine if the button should be visible
  useEffect(() => {
    if (
      pathname === "/profile" &&
      (authorId === currentUser?._id || authorId === currentNgo?._id)
    ) {
      setIsVisible(true);
    }
  }, [pathname, authorId, currentUser, currentNgo]);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirmation) return;

    const response = await deleteQuestion(questionId);

    if (response.success) {
      toast({
        title: "Question deleted successfully",
      });
      router.refresh(); // Refresh the page after deletion
    } else {
      toast({
        title: "Failed to delete question",
        variant: "destructive",
      });
    }
  };

  if (!isVisible) return null; // Don't render the button if it's not visible

  return (
    <button
      className="text-red-500 hover:text-red-700" // Red color for trash icon button
      onClick={handleDelete}
      title="Delete Question"
    >
      <TrashIcon width={24} height={24} />
    </button>
  );
};

export default QuestionDeleteButton;
