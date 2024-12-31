"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { setSlug } from "@/lib/utils";
import { AddingPropertySchema, TAddingPropertySchema } from "@/lib/validation";
import { nanoid } from "nanoid";

export async function addingPropertyAction(values: TAddingPropertySchema) {
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

    return {
      success: "Property added successfully. Pending admin verification.",
    };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
