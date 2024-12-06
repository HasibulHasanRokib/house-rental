"use server";

import { auth } from "@/auth";
import { editProfileSchema, TEditProfileSchema } from "@/lib/auth/validation";
import db from "@/lib/db";

export async function updateProfileAction(values: TEditProfileSchema) {
  try {
    const validation = editProfileSchema.safeParse(values);
    if (!validation.success)
      return { error: "Invalid values! Please check your inputs!" };

    const { id, username, image, phone, address, gender } = validation.data;
    const session = await auth();
    if (session?.user.id !== id) return { error: "Unauthorized" };
    await db.user.update({
      where: {
        id,
      },
      data: {
        username,
        image,
        address,
        phoneNo: phone,
        gender,
      },
    });
    return { success: "Update Successful" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}