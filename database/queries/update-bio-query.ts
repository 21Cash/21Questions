import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../schema";

export default async function updateBio(userId: string, bioText: string) {
  const bioResult = await db
    .update(users)
    .set({
      bio: bioText,
    })
    .where(eq(users.id, userId))
    .returning({
      userId: users.id,
      bio: users.bio,
    });

  return bioResult;
}
