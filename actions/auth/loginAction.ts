"use server";

import { signIn } from "@/auth";
import VerifiedEmail from "@/emails/VerifiedEmail";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/auth/routes";
import { generateVerificationToken } from "@/lib/auth/token";
import { getUserByEmail } from "@/lib/auth/user";
import { logInSchema, TLoginSchema } from "@/lib/auth/validation";
import { sentEmailWithNodemailer } from "@/lib/sendEmail";
import { render } from "@react-email/components";
import { AuthError } from "next-auth";

export async function loginAction(values: TLoginSchema) {
  try {
    const validation = logInSchema.safeParse(values);

    if (!validation.success) {
      return { error: "Invalid values! Please check your inputs!" };
    }
    const { email, password } = validation.data;

    const userExist = await getUserByEmail(email);

    if (!userExist?.emailVerified) {
      if (!userExist?.email) {
        return { error: "User email is not available." };
      }
      const generateToken = await generateVerificationToken(userExist.email);

      const emailHtml = await render(
        VerifiedEmail({
          name: userExist.username,
          token: generateToken.token,
        })
      );
      const emailData = {
        email,
        subject: "Verification email account.",
        html: emailHtml,
      };

      await sentEmailWithNodemailer(emailData);
      return { success: "Email is not verified.Confirmation email is sent." };
    }

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
