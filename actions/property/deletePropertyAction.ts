"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { Property } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deletePropertyAction(property: Property) {
  try {
    if (!property) {
      return { error: "Property not found." };
    }
    const session = await auth();
    if (!session?.user) {
      return { error: "You must be logged in." };
    }
    if (session.user.id !== property.userId) {
      return { error: "You are not authorized." };
    }

    await db.property.delete({ where: { id: property.id } });
    revalidatePath("/profile/my-properties");
    return { success: "Property deleted successfully." };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
