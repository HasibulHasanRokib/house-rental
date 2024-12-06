"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { setSlug } from "@/lib/utils";
import { AddingPropertySchema, TAddingPropertySchema } from "@/lib/validation";
import { nanoid } from "nanoid";

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
        area: Number(area),
        bathrooms: Number(bathrooms),
        bedrooms: Number(bedrooms),
        city,
        contactEmail,
        contactName,
        contactPhone,
        details,
        price: Number(price),
        propertyTitle,
        rooms: Number(rooms),
        slug,
        country,
        status,
        type,
        buildingAge: Number(area),
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

    return { success: "Adding property successful." };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
