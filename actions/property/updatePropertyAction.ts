"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { UTApi } from "uploadthing/server";
import { setSlug } from "@/lib/utils";
import { AddingPropertySchema, TAddingPropertySchema } from "@/lib/validation";
import { Property } from "@prisma/client";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function UpdatePropertyAction(values: Property) {
  try {
    if (!values) {
      return { error: "Property not found." };
    }
    const validation = AddingPropertySchema.safeParse(values);
    if (!validation.success) {
      return { error: "Invalid input." };
    }

    const session = await auth();

    if (!session?.user) {
      return { error: "You must be logged in." };
    }
    if (session.user.id !== values.userId) {
      return { error: "You are not authorized." };
    }
    if (session?.user.role !== "owner") {
      return { error: "Unauthorized" };
    }
    const {
      address,
      area,
      bathrooms,
      bedrooms,
      city,
      contactEmail,
      contactName,
      contactPhone,
      country,
      details,
      imagesUrl,
      price,
      propertyTitle,
      rooms,

      type,
      buildingAge,
      hasAlarm,
      hasCentralHeating,
      hasLaundryRoom,
      hasParking,
      hasSwimmingPool,
      hasWoodenCeiling,
    } = validation.data;

    const slug = `${setSlug(propertyTitle)}-${nanoid(10)}`;

    await db.property.updateMany({
      where: { id: values.id },
      data: {
        address,
        area,
        bathrooms,
        bedrooms,
        city,
        contactEmail,
        contactName,
        contactPhone,
        details,
        price,
        propertyTitle,
        rooms,
        slug,
        country,

        type,
        buildingAge,
        hasAlarm,
        hasCentralHeating,
        hasLaundryRoom,
        hasParking,
        hasSwimmingPool,
        hasWoodenCeiling,
        imagesUrl,
        userId: session.user.id,
      },
    });

    revalidatePath("/profile/my-properties");
    return { success: "Adding property successful." };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}

export async function deleteImage(url: string) {
  try {
    console.log(url);
    const utapi = new UTApi();
    await utapi.deleteFiles(url);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
