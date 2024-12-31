"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/auth/routes";
import { getUserByEmail } from "@/lib/auth/user";
import { logInSchema, TLoginSchema } from "@/lib/auth/validation";
import bcrypt from "bcryptjs";

export async function loginAction(values: TLoginSchema) {
  try {
    const validation = logInSchema.safeParse(values);

    if (!validation.success) {
      return { error: "Invalid values! Please check your inputs!" };
    }
    const { email, password } = validation.data;

    const userExist = await getUserByEmail(email);

    if (!userExist) return { error: "Invalid email!" };

    const passOk = await bcrypt.compareSync(password, userExist.password);

    if (!passOk) return { error: "Invalid credentials!" };

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Log in successful." };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
