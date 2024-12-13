"use client";

import { useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";

export default function ShareButton() {
  const [copyMessage, setCopyMessage] = useState("");

  const handleShareClick = () => {
    const urlToShare = window.location.href;
    navigator.clipboard.writeText(urlToShare).then(() => {
      setCopyMessage("Copied to clipboard");
      setTimeout(() => setCopyMessage(""), 2000);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleShareClick}
        className="p-2 rounded-full hover:bg-gray-700"
      >
        <ShareIcon className="w-8 h-8 text-gray-400 hover:text-gray-200" />
      </button>
      {copyMessage && (
        <div className="mt-2 text-sm text-gray-300 absolute top-full right-0">
          {copyMessage}
        </div>
      )}
    </div>
  );
}
