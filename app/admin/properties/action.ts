"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { Status } from "@prisma/client";

export async function ChangePropertyStatus({
  id,
  newStatus,
}: {
  id: string;
  newStatus: string;
}) {
  try {
    const session = await auth();
    const propertyExist = await db.property.findFirst({
      where: {
        id,
      },
    });

    if (session && session.user.role === "admin" && newStatus === "booked") {
      return { error: "Admin  is not allowed to booked properties!" };
    }

    if (propertyExist?.status === "rejected") {
      return {
        error: `Cannot update the status of property with ID "${propertyExist.propertyTitle}" because it is rejected.`,
      };
    }

    if (propertyExist?.status === "booked") {
      return {
        error: `Cannot update the status of property with ID "${propertyExist.propertyTitle}"  because it is already booked.`,
      };
    }

    const updateProperty = await db.property.update({
      where: {
        id,
      },
      data: {
        status: newStatus as Status,
      },
    });
    return {
      success: `Property with ID "${updateProperty.propertyTitle}"  successfully updated to status ${newStatus}.`,
    };
  } catch (error) {
    return { error: error };
  }
}
