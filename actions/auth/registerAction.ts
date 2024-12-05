"use server";

import { getUserByEmail } from "@/lib/auth/user";
import { registerSchema, TRegisterSchema } from "@/lib/auth/validation";
import db from "@/lib/db";

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

    await db.user.create({
      data: {
        username: fullName,
        email,
        password: hashPassword,
        role: userRole,
      },
    });

    return { success: "Registration successful." };
  } catch (error) {
    return { error: "Something went wrong." };
  }
}
