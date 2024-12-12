import { NextRequest, NextResponse } from "next/server";

interface UserRequestInfo {
  name: string;
  password: string;
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ msg: "Helllo" });
  const requestData: UserRequestInfo = await request.json();

  console.log(requestData);

  return NextResponse.json(requestData);
}
