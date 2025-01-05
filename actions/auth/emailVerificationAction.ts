"use server";

import { getUserByEmail } from "@/lib/auth/user";
import { getVerificationTokenByToken } from "@/lib/auth/verification-token";
import db from "@/lib/db";

export default async function emailVerificationAction(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist." };
  }
  const hasExpired = new Date(existingToken.expire) < new Date();
  if (hasExpired) {
    return { error: "Token has expired." };
  }

  const userExist = await getUserByEmail(existingToken.email);
  if (!userExist) {
    return { error: "Email dose not exist." };
  }

  await db.user.update({
    where: {
      id: userExist.id,
    },
    data: {
      emailVerified: new Date(),
      email: userExist.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Account verified." };
}
