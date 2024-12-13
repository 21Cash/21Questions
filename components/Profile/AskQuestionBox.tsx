"use client";

import { useState } from "react";

interface AskQuestionBoxProps {
  toUsername: string;
}

export default function AskQuestionBox({ toUsername }: AskQuestionBoxProps) {
  const [questionText, setQuestionText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendQuestion = async () => {
    setIsLoading(true);
    setSuccess(false);
    const questionData = {
      toUsername,
      questionText,
    };

    const response = await fetch("/api/ask-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionData),
    });

    setIsLoading(false);
    if (response.ok) {
      setSuccess(true);
      setQuestionText("");
    }
  };

  return (
    <div className="w-full mx-auto dark:bg-gray-800 rounded-xl">
      <textarea
        className="w-full p-3 rounded-lg border border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
        placeholder="Type your question here. It Will be sent anonymously"
        value={questionText}
        onChange={(e) => {
          setQuestionText(e.target.value);
          const textarea = e.target;
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }}
        style={{ minHeight: "8rem" }}
      />
      <button
        onClick={sendQuestion}
        disabled={isLoading}
        className={`mt-4 w-full py-2 px-4 rounded-lg text-white ${
          isLoading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gray-600 hover:bg-gray-500"
        }`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : success ? (
          "Send Another Question"
        ) : (
          "Send Question"
        )}
      </button>
      {success && (
        <p className="mt-3 text-green-500 text-center">
          Question sent successfully!
        </p>
      )}
    </div>
  );
}
