import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Checkout session completed:", session);

      const metadata = session.metadata || {};
      const { userId, paymentId, propertyId, totalPrice, from, to } = metadata;
      console.log({ propertyId });

      if (!userId || !paymentId || !propertyId || !totalPrice || !from || !to) {
        console.error("Missing or invalid metadata in session");
        throw new Error("Invalid or missing metadata");
      }

      await db.rent.update({
        where: { id: paymentId },
        data: {
          id: paymentId,
          isPaid: true,
          startDate: new Date(from),
          endDate: new Date(to),
          amount: parseFloat(totalPrice),
          property: { update: { status: "booked" } },
        },
      });
      console.log("Database updated successfully");
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 }
    );
  }
}
