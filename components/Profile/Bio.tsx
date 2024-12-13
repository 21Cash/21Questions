"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface BioProps {
  bioText: string | null;
  bioUsername: string;
}

export default function Bio({ bioText, bioUsername }: BioProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(bioText);
  const [newBio, setNewBio] = useState(bioText);

  const session: any = useSession();

  const handleSave = async () => {
    await fetch("/api/update-bio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bioText: newBio }),
    });
    setBio(newBio);
    setIsEditing(false);
  };

  if (session?.data?.user?.username === bioUsername) {
    return (
      <div>
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              className="w-full p-2 rounded border dark:bg-gray-750 resize-none overflow-auto"
              style={{ minHeight: "4rem" }}
              value={newBio || ""}
              onChange={(e) => setNewBio(e.target.value)}
              onInput={(e) => {
                const textarea = e.target as HTMLTextAreaElement;
                textarea.style.height = "auto";
                textarea.style.height = `${textarea.scrollHeight}px`;
              }}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="relative">
            <p className="min-h-16 p-5 rounded-lg dark:bg-gray-750 shadow-x whitespace-pre-line">
              {bio}
            </p>
            <button
              className="absolute top-2 right-2 text-sm text-blue-500"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-16 p-5 rounded-lg dark:bg-gray-750 shadow-lg whitespace-pre-line relative">
        <h3 className="text-lg font-semibold text-gray-400 absolute top-0 mt-2 left-5">
          Bio
        </h3>
        <div className="mt-4">{bio}</div>
      </div>
    </div>
  );
}
