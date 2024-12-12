import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2";
import { db } from "@/database/db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const NEXT_AUTH_OPTIONS: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.username, credentials?.username || ""))
          .then(
            (res) =>
              res[0] as {
                id: string;
                username: string;
                email: string | null;
                password: string;
              }
          );

        if (
          !user ||
          !(await argon2.verify(user.password, credentials!.password))
        ) {
          throw new Error("Invalid username or password");
        }

        return { id: user.id, username: user.username, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    error: "/auth/error",
  },
};
