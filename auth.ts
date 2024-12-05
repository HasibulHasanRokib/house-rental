import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";
import { getUserById } from "./lib/auth/user";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      session.user.name = token.name;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const userExist = await getUserById(token.sub);
      if (!userExist) return token;
      token.role = userExist.role;
      token.name = userExist.username;
      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
