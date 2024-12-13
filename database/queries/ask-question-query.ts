import { eq } from "drizzle-orm";
import { QuestionInsert, questions, users } from "../schema";
import { db } from "../db";

export type QuestionInfo = {
  fromUsername: string | null;
  toUsername: string;
  questionText: string;
};

export async function askQuestion(questionInfo: QuestionInfo) {
  const { fromUsername, toUsername, questionText } = questionInfo;

  const fromUser = fromUsername
    ? await db.query.users.findFirst({
        where: eq(users.username, fromUsername),
        columns: { id: true },
      })
    : null;

  const toUserResult = await db.query.users.findFirst({
    where: eq(users.username, toUsername),
    columns: { id: true },
  });

  if (!toUserResult || (fromUsername && !fromUser)) {
    throw new Error("User not found");
  }

  const questionInsert: QuestionInsert = {
    fromUser: fromUser ? fromUser.id : null,
    toUser: toUserResult.id,
    questionText,
  };

  await db.insert(questions).values(questionInsert);
}
