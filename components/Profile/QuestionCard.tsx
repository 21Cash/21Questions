"use client";

import { useState } from "react";

interface QuestionCardProps {
  questionText: string;
  answerText: string | null;
  createdAt: Date;
  answeredAt?: Date | null;
  askedToUsername: string;
}

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  if (diffInHours > 0)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  if (diffInMinutes > 0)
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
};

export default function QuestionCard({
  questionText,
  answerText,
  createdAt,
  answeredAt,
  askedToUsername,
}: QuestionCardProps) {
  const timeAgoCreated = getTimeAgo(createdAt);
  const timeAgoAnswered = answeredAt ? getTimeAgo(answeredAt) : "";

  return (
    <div className="dark:bg-gray-750 p-4 rounded-lg shadow-lg w-full mx-auto ring-1 ring-gray-400 relative">
      <div className="flex flex-col justify-start mb-2 relative">
        <div className="text-lg font-semibold text-gray-900 dark:text-white break-words max-w-full pr-16">
          {questionText.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
      {answerText ? (
        <div className="text-sm text-gray-700 dark:text-gray-200 break-words max-w-full">
          {answerText.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500 dark:text-gray-300">
          No answer yet
        </div>
      )}

      <div className="absolute right-2 bottom-7 text-xs text-gray-400 dark:text-gray-500">
        Asked {timeAgoCreated}
      </div>

      {answeredAt && (
        <div className="absolute right-2 bottom-3 text-xs text-gray-400 dark:text-gray-500">
          Answered {timeAgoAnswered}
        </div>
      )}
    </div>
  );
}
