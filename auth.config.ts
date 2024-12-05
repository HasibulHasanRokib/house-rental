import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { logInSchema } from "./lib/auth/validation";
import { getUserByEmail } from "./lib/auth/user";

import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validation = logInSchema.safeParse(credentials);
        if (validation.success) {
          const { email, password } = validation.data;
          const user = await getUserByEmail(email);
          if (!user) return null;
          const matchPassword = await bcrypt.compare(password, user.password);
          if (matchPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
