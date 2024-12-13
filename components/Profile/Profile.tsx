import { ProfileData } from "@/database/queries/profile-data-query";
import AskQuestionBox from "./AskQuestionBox";
import QuestionCard from "./QuestionCard";
import ShareButton from "./ShareButton";
import Bio from "./Bio";

type ProfileProps = ProfileData;

function getFirstAlphabetLetter(str: string) {
  if (!str) return "U";
  const firstAlphabet = str.match(/[a-zA-Z]/);
  return firstAlphabet ? firstAlphabet[0].toUpperCase() : "U";
}

export default function Profile({
  username,
  bio,
  askedQuestionsData,
  userAskedQuestions,
}: ProfileProps) {
  return (
    <div className="relative w-[650px] space-y-6 mt-8 rounded-2xl mx-auto min-h-screen dark:bg-gray-800 shadow-2xl ring-gray-700 ring-2 p-10 mb-6">
      <div className="absolute top-4 right-4">
        <ShareButton />
      </div>

      <div className="w-[100px] h-[100px] mx-auto rounded-full bg-gray-300 flex items-center justify-center text-white">
        <span className="text-2xl">{getFirstAlphabetLetter(username)}</span>
      </div>

      <p className="mt-4 text-2xl text-center">{username}</p>

      <Bio bioText={bio} bioUsername={username} />

      <div>
        <AskQuestionBox toUsername={username} />
      </div>

      <div>
        <div className="text-2xl pb-5">Answered Questions:</div>
        <div className="space-y-10">
          {askedQuestionsData
            .filter(
              (question) =>
                question.answerText && question.answerText.length > 0
            )
            .map((question, index: number) => (
              <QuestionCard
                key={index}
                questionText={question.questionText}
                answerText={question.answerText}
                createdAt={question.createdAt}
                answeredAt={question.answeredAt}
                askedToUsername={username}
              />
            ))
            .reverse()}
        </div>
      </div>
    </div>
  );
}
