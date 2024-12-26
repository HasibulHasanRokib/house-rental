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
