import { NextResponse } from "next/server";
import argon2 from "argon2";
import { db } from "@/database/db";
import { users } from "@/database/schema";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  console.log(`Request For Signup`);

  console.log({ username, password });

  if (!username || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const hashedPassword = await argon2.hash(password);
  console.log({ hashedPassword });
  try {
    const result = await db
      .insert(users)
      .values({
        username,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json(
      { message: "User created successfully", userId: result[0]?.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(`Error During Signup`);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
