import { eq, NonUndefinedKeysOnly } from "drizzle-orm";
import { db } from "../db";
import { questions, users } from "../schema";

interface ProfileDataQueryProps {
  username: string;
  authorizedUser: boolean; // Is the user asking for this query, Authorized for this profile ?
}

export type ProfileData = {
  username: string;
  bio: string | null;
  askedQuestionsData: {
    // Asked to User Questions
    id: number;
    questionText: string;
    answerText: string | null;
    createdAt: Date;
    answeredAt: Date | null;
  }[];
};
export default async function getProfileData({
  username,
  authorizedUser,
}: ProfileDataQueryProps) {
  const userData = await db.query.users.findFirst({
    where: eq(users.username, username),
    columns: { bio: true, hideUnansweredQuestions: true, id: true },
  });

  if (!userData) {
    throw new Error("User not found.");
  }

  const { bio, hideUnansweredQuestions, id } = userData;

  let askedQuestionsData = await db.query.questions.findMany({
    where: eq(questions.toUser, id),
    columns: {
      id: true,
      questionText: true,
      answerText: true,
      createdAt: true,
      answeredAt: true,
    },
  });

  if (!authorizedUser && hideUnansweredQuestions) {
    askedQuestionsData = askedQuestionsData.filter(
      (question) => question.answerText != null && question.answerText !== ""
    );
  }

  const returnData: ProfileData = {
    username,
    bio,
    askedQuestionsData,
  };
  return returnData;
}
