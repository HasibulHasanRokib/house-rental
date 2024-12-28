import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import PaymentConfirmationEmail from "@/emails/PaymentReceivedEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);

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

      const metadata = session.metadata || {};
      const { userId, paymentId, propertyId, totalPrice, from, to } = metadata;

      if (!userId || !paymentId || !propertyId || !totalPrice || !from || !to) {
        throw new Error("Invalid or missing metadata");
      }

      const updatedPayment = await db.rent.update({
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

      const payment = await db.rent.findFirst({
        where: { id: updatedPayment.id },
        include: {
          user: true,
          property: true,
        },
      });

      //For tenant
      await resend.emails.send({
        from: "HouseRent <rokib4000@gmail.com>",
        to: [event.data.object.customer_details?.email!],
        subject: "Payment confirmed!",
        react: PaymentConfirmationEmail({
          paymentId,
          paymentDate: updatedPayment.createdAt.toLocaleDateString(),
          rentalPeriodFrom: updatedPayment.startDate?.toLocaleString()!,
          rentalPeriodTo: updatedPayment.endDate?.toLocaleString()!,
          amount: updatedPayment.amount,
          property: payment!.property!,
          user: payment!.user!,
        }),
      });
      console.log({
        email: "rokib4000@gmail.com",
        to: event.data.object.customer_details?.email,
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 }
    );
  }
}
