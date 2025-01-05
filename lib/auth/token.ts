import { v4 as uuidv4 } from "uuid";
import db from "../db";
import { getVerificationTokenByEmail } from "./verification-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expire = new Date(new Date().getTime() + 3600 * 1000);

  const existToken = await getVerificationTokenByEmail(email);
  if (existToken) {
    await db.verificationToken.delete({
      where: { id: existToken.id },
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expire,
    },
  });
  return verificationToken;
};
