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
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing user email");
      }
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    const { userId, paymentId, propertyId, totalPrice, from, to } = metadata;

    // const { userId, paymentId, propertyId, totalPrice, from, to } =
    //   session.metadata || {
    //     userId: null,
    //     paymentId: null,
    //     propertyId: null,
    //     totalPrice: null,
    //     from: null,
    //     to: null,
    //   };

    if (!userId || !paymentId || !propertyId || !totalPrice || !from || !to) {
      throw new Error("Invalid or missing metadata");
    }

    await db.rent.update({
      where: {
        id: paymentId,
      },
      data: {
        isPaid: true,
        startDate: new Date(from),
        endDate: new Date(to),
        amount: parseFloat(totalPrice),
        property: {
          update: {
            status: "booked",
          },
        },
      },
    });
    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 }
    );
  }
}
