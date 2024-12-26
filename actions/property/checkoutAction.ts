"use server";

import { auth } from "@/auth";
import db from "@/lib/db";
import { stripe } from "@/lib/stripe";

interface ActionProps {
  propertyId: string;
  userId: string;
  totalPrice: number;
  dateRange: {
    from: Date;
    to: Date;
  };
}

export const createCheckoutSession = async (data: ActionProps) => {
  try {
    const { propertyId, userId, dateRange, totalPrice } = data;

    if (!propertyId || typeof propertyId !== "string") {
      return {
        error: "Invalid property ID. Please provide a valid identifier.",
      };
    }

    if (!userId || typeof userId !== "string") {
      return { error: "Invalid user ID. Please provide a valid identifier." };
    }

    if (
      !dateRange?.from ||
      !dateRange?.to ||
      !(dateRange.from instanceof Date) ||
      !(dateRange.to instanceof Date)
    ) {
      return {
        error: "Invalid date range. Provide valid start and end dates.",
      };
    }

    if (!totalPrice || typeof totalPrice !== "number" || totalPrice <= 0) {
      return { error: "Invalid total price. Provide a positive number." };
    }

    const session = await auth();
    if (!session || session?.user.id !== userId) {
      return {
        error: "Unauthorized. You are not allowed to perform this action.",
      };
    }

    const property = await db.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      return { error: "Property not found. Please check the property ID." };
    }

    if (property.status === "booked") {
      return {
        error: "This property is already booked. Choose another property.",
      };
    }
    const finalizeBookingAfterPayment = await db.rent.create({
      data: {
        amount: totalPrice,
        userId,
        propertyId,
      },
    });

    const product = await stripe.products.create({
      name: property.propertyTitle,
      images: [property.imagesUrl[0]],
      default_price_data: {
        currency: "bdt",
        unit_amount: totalPrice * 100, // Stripe expects amounts in cents
      },
    });

    // Create a Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_URL}/thank-you?paymentId=${finalizeBookingAfterPayment.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/property/preview?id=${property.id}`,
      payment_method_types: ["card"],
      mode: "payment",
      metadata: {
        userId,
        propertyId,
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        totalPrice: totalPrice.toString(),
      },
      line_items: [{ price: product.default_price as string, quantity: 1 }],
    });

    return { url: stripeSession.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
};
