"use client";

import { useState } from "react";

interface QuestionsViewProps {
  questions: {
    id: number;
    questionText: string;
    answerText: string | null;
    createdAt: Date;
  }[];
}

export default function QuestionsView({ questions }: QuestionsViewProps) {
  const [questionsList, setQuestionsList] = useState(questions);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loadingQuestions, setLoadingQuestions] = useState<{
    [key: number]: boolean;
  }>({});

  const sendAnswer = async (questionId: number, answerText: string) => {
    setLoadingQuestions((prev) => ({ ...prev, [questionId]: true }));

    const response = await fetch("/api/answer-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionId, answerText }),
    });

    setLoadingQuestions((prev) => ({ ...prev, [questionId]: false }));

    if (response.ok) {
      setQuestionsList((prev) =>
        prev.filter((question) => question.id !== questionId)
      );
    }
  };

  const handleAnswerChange = (questionId: number, answerText: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerText,
    }));
  };

  return (
    <div>
      <div className="dark:text-white text-2xl mb-8">
        Inbox (Unanswered Questions)
      </div>
      <div className="space-y-6">
        {questionsList.length > 0 ? (
          questionsList.map((question) => (
            <div
              key={question.id}
              className="w-full mx-auto dark:bg-gray-800 rounded-xl p-4"
            >
              <div className="text-lg font-semibold">
                {question.questionText}
              </div>
              <div className="mt-2">
                <textarea
                  value={answers[question.id] || ""}
                  onChange={(e) => {
                    handleAnswerChange(question.id, e.target.value);
                    const textarea = e.target;
                    textarea.style.height = "auto";
                    textarea.style.height = `${textarea.scrollHeight}px`;
                  }}
                  placeholder="Your answer..."
                  rows={1}
                  className="w-full p-3 rounded-lg border border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
                  style={{ minHeight: "8rem" }}
                />
              </div>
              <button
                onClick={() =>
                  sendAnswer(question.id, answers[question.id] || "")
                }
                disabled={loadingQuestions[question.id] || false}
                className={`mt-4 w-full py-2 px-4 rounded-lg text-white ${
                  loadingQuestions[question.id]
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                {loadingQuestions[question.id] ? (
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Send Answer"
                )}
              </button>
            </div>
          ))
        ) : (
          <div className="text-xl text"> --No Inbox Messages</div>
        )}
      </div>
    </div>
  );
}
