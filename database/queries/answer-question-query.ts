import { eq } from "drizzle-orm";
import { db } from "../db";
import { sql } from "drizzle-orm";

import { Question, questions } from "../schema";

type AnswerQuestionInfo = {
  answeringByUserId: string;
  questionId: number;
  answerText: string;
};

export default async function answerQuestion(answerInfo: AnswerQuestionInfo) {
  const { answeringByUserId, questionId, answerText } = answerInfo;

  const questionData = await db.query.questions.findFirst({
    where: eq(questions.id, questionId),
    columns: {
      toUser: true,
    },
  });

  if (!questionData || questionData.toUser !== answeringByUserId) {
    throw new Error("Failed to Answer question!");
  }

  const updateResult = await db
    .update(questions)
    .set({
      answerText: answerText,
      answeredAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(questions.id, questionId))
    .returning({
      questionId: questions.id,
      answeredAt: questions.answeredAt,
      questionText: questions.questionText,
      answerText: questions.answerText,
    });

  return updateResult;
}
