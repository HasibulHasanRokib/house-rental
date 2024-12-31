"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/auth/routes";
import { logInSchema, TLoginSchema } from "@/lib/auth/validation";
import { AuthError } from "next-auth";

export async function loginAction(values: TLoginSchema) {
  try {
    const validation = logInSchema.safeParse(values);

    if (!validation.success) {
      return { error: "Invalid values! Please check your inputs!" };
    }
    const { email, password } = validation.data;

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Log in successful." };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return { error: "Something went wrong!" };
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
