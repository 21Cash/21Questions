import {
  askQuestion,
  QuestionInfo,
} from "@/database/queries/ask-question-query";
import { QuestionInsert } from "@/database/schema";
import { NEXT_AUTH_OPTIONS } from "@/lib/NextAuthOptions";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session: any = await getServerSession(NEXT_AUTH_OPTIONS);

  const fromUsername = session?.user?.username ?? null;
  const { toUsername, questionText } = await request.json();

  if (!toUsername || toUsername == "" || !questionText || questionText == "") {
    return NextResponse.json(
      {
        message: "Mising or empty Field: toUsername or questionText.",
      },
      { status: 400 }
    );
  }

  const questionInfo: QuestionInfo = {
    fromUsername,
    toUsername,
    questionText,
  };

  try {
    await askQuestion(questionInfo);
    return NextResponse.json(
      { message: "Question Posted Successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error asking question:", error);
    return NextResponse.json(
      {
        message: `An error occurred while asking the question. message`,
      },
      { status: 500 }
    );
  }
}
