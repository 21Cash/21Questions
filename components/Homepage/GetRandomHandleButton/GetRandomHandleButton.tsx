"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GetRandomHandleButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRandomPersonClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-random-user-handle");
      const data = await response.json();

      if (data.randomHandle) {
        router.push(`/profile/${data.randomHandle}`);
      } else {
        alert("No random handle found.");
      }
    } catch (error) {
      console.error("Error fetching random handle:", error);
      alert("Failed to fetch random handle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full mt-10">
      <button
        onClick={handleRandomPersonClick}
        className="px-12 py-5 bg-purple-600 hover:bg-purple-700 text-xl rounded-lg shadow-md flex items-center justify-center transition-transform duration-300 transform hover:scale-105"
        disabled={loading}
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
        ) : (
          "Ask Random Person"
        )}
      </button>
    </div>
  );
}
