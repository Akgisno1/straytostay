"use client";

import React, { useState } from "react";
import { ClipboardIcon, CheckCircledIcon } from "@radix-ui/react-icons"; // Ensure you are using the correct icon names from Radix

const ShareButton = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const handleShareClick = async () => {
    try {
      // Copy the link to the clipboard
      await navigator.clipboard.writeText(link);
      setCopied(true); // Set copied state to true

      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleShareClick}
      className="flex items-center justify-center rounded border-2 border-green-500 p-2 text-green-500 transition-colors duration-300 hover:bg-green-500 hover:text-white"
    >
      {copied ? (
        <CheckCircledIcon className="size-5" />
      ) : (
        <ClipboardIcon className="size-5" />
      )}
      <span className="ml-2">{copied ? "Copied!" : "Share"}</span>
    </button>
  );
};

export default ShareButton;
