import { sql } from "drizzle-orm";
import { users } from "@/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";

export async function GET(request: NextRequest) {
  const data: any = await db.execute(sql`
        SELECT "username" 
        FROM ${users} 
        ORDER BY RANDOM() 
        LIMIT 1
    `);

  const randomHandle = data.rows[0].username;

  return NextResponse.json({
    randomHandle,
  });
}
