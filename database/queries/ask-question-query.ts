import { eq } from "drizzle-orm";
import { QuestionInsert, questions, users } from "../schema";
import { db } from "../db";

export type QuestionInfo = {
  fromUsername: string | null;
  toUsername: string;
  questionText: string;
};

export async function askQuestion(questionInfo: QuestionInfo) {
  const { toUsername, questionText } = questionInfo;

  const toUserResult = await db.query.users.findFirst({
    where: eq(users.username, toUsername),
    columns: { id: true },
  });

  if (!toUserResult) {
    throw new Error("User not found");
  }

  const questionInsert: QuestionInsert = {
    toUser: toUserResult.id,
    questionText,
  };

  await db.insert(questions).values(questionInsert);
}
