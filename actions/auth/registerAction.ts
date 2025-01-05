"use server";

import VerifiedEmail from "@/emails/VerifiedEmail";
import { generateVerificationToken } from "@/lib/auth/token";
import { getUserByEmail } from "@/lib/auth/user";
import { registerSchema, TRegisterSchema } from "@/lib/auth/validation";
import db from "@/lib/db";
import { sentEmailWithNodemailer } from "@/lib/sendEmail";
import { render } from "@react-email/components";
import bcrypt from "bcryptjs";

export async function registerAction(values: TRegisterSchema) {
  try {
    const validation = registerSchema.safeParse(values);

    if (!validation.success) {
      return { error: "Invalid values! Please check your inputs!" };
    }

    const { firstName, lastName, userRole, email, password } = validation.data;

    const userExist = await getUserByEmail(email);

    if (userExist) return { error: "Email already exist." };

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const fullName = firstName + lastName;

    const newUser = await db.user.create({
      data: {
        username: fullName,
        email,
        password: hashPassword,
        role: userRole,
      },
    });
    const verificationToken = await generateVerificationToken(email);

    const emailHtml = await render(
      VerifiedEmail({
        name: newUser.username,
        token: verificationToken.token,
      })
    );
    const emailData = {
      email,
      subject: "Verification email account.",
      html: emailHtml,
    };

    await sentEmailWithNodemailer(emailData);

    return { success: "Confirmation email sent!" };
  } catch (error) {
    return { error: "Something went wrong." };
  }
}
