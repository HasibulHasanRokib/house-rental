"use server";

import { auth } from "@/auth";
import db from "@/lib/db";

export async function getPaymentStatus({ paymentId }: { paymentId: string }) {
  const session = await auth();

  if (!session || !session?.user.id) {
    throw new Error("You need to be logged in to view this page.");
  }

  const payment = await db.rent.findFirst({
    where: { id: paymentId },
  });

  if (!payment) throw new Error("This payment does not exist.");

  if (payment.isPaid) {
    return payment;
  } else {
    return false;
  }
}

//property

export const getPropertyById = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  const property = await db.property.findFirst({
    where: { id: propertyId },
  });

  if (!property) throw new Error("This property does not exist.");

  return property;
};
//User

export const getUserById = async ({ userId }: { userId: string }) => {
  const user = await db.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error("This user does not exist.");

  return user;
};
export const getOWnerById = async ({ userId }: { userId: string }) => {
  const owner = await db.user.findFirst({
    where: { id: userId },
  });

  if (!owner) throw new Error("This owner does not exist.");

  return owner;
};
