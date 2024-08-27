// src/components/ActivityDeleteButton.js

"use client";

import React, { useEffect, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons"; // Import a trash icon
import { deleteActivity } from "../../lib/actions/activity.action"; // Import server action to delete activity
import { useRouter, usePathname } from "next/navigation"; // Import hooks to use router and pathname
import { useToast } from "../ui/use-toast"; // Import toast for notifications
import { useAuth } from "../../context/AuthContext"; // Import your AuthContext

const ActivityDeleteButton = ({ activityId, userId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast(); // Use the toast function from react-hot-toast
  const { currentUser, currentNgo } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  // Determine if the button should be visible
  useEffect(() => {
    if (
      pathname === "/profile" &&
      (userId === currentUser?._id || userId === currentNgo?._id)
    ) {
      setIsVisible(true);
    }
  }, [pathname, userId, currentUser, currentNgo]);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (!confirmation) return;

    const response = await deleteActivity(activityId);

    if (response.success) {
      toast({
        title: "Activity deleted successfully",
      });
      router.refresh(); // Refresh the page after deletion
    } else {
      toast({
        title: "Failed to delete activity",
        variant: "destructive",
      });
    }
  };

  if (!isVisible) return null; // Don't render the button if it's not visible

  return (
    <button
      className="text-red-500 hover:text-red-700" // Red color for trash icon button
      onClick={handleDelete}
      title="Delete Activity"
    >
      <TrashIcon width={24} height={24} />
    </button>
  );
};

export default ActivityDeleteButton;
