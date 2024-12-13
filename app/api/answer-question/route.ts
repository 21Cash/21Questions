import answerQuestion from "@/database/queries/answer-question-query";
import { NEXT_AUTH_OPTIONS } from "@/lib/NextAuthOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session: any = await getServerSession(NEXT_AUTH_OPTIONS);
  const username = session?.user?.username;
  const userId = session?.user?.id;

  if (!session) {
    return NextResponse.json(
      {
        message: "UnAuthorized!",
      },
      { status: 401 }
    );
  }

  const { questionId, answerText } = await request.json();

  if (!questionId || !answerText || answerText == "") {
    return NextResponse.json(
      { message: "Bad Request, questionId or answerText is empty or null." },
      { status: 400 }
    );
  }

  try {
    const response = await answerQuestion({
      answeringByUserId: userId,
      questionId,
      answerText,
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { message: "An error Occured. Failed To Answer Question." },
      { status: 500 }
    );
  }
}
