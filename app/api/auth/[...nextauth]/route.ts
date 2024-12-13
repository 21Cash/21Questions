import { NEXT_AUTH_OPTIONS } from "@/lib/NextAuthOptions";
import NextAuth from "next-auth";

const handler = NextAuth(NEXT_AUTH_OPTIONS);

export { handler as GET, handler as POST };
