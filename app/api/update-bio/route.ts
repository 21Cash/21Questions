import updateBio from "@/database/queries/update-bio-query";
import { NEXT_AUTH_OPTIONS } from "@/lib/NextAuthOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session: any = await getServerSession(NEXT_AUTH_OPTIONS);
  const userId = session?.user?.id;

  if (!session) {
    return NextResponse.json(
      {
        message: "UnAuthorized!",
      },
      { status: 401 }
    );
  }

  const { bioText } = await request.json();
  const updatedBioData = await updateBio(userId, bioText);
  return NextResponse.json(updatedBioData);
}
