"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { setSlug } from "@/lib/utils";
import { AddingPropertySchema, TAddingPropertySchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function addingProperty(values: TAddingPropertySchema) {
  try {
    const validation = AddingPropertySchema.safeParse(values);

    if (!validation.success) {
      return { error: "Invalid values! Please check your inputs!" };
    }

    const session = await auth();
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
      status,
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

    await db.property.create({
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
        status,
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

    revalidatePath("/properties/my-properties");
    return { success: "Adding property successful." };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
