import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import PaymentConfirmationEmail from "@/emails/PaymentReceivedEmail";
import { render } from "@react-email/components";
import { sentEmailWithNodemailer } from "@/lib/sendEmail";

// const resend = new Resend("re_H852q2rG_5cwSBcv9aqLL4pVhrBMok6pw");

export async function POST(req: NextRequest) {
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
    const ownerInfo = await db.user.findFirst({
      where: {
        id: payment?.property?.userId,
      },
    });

    //For tenant
    const emailHtml = await render(
      PaymentConfirmationEmail({
        paymentId,
        paymentDate: updatedPayment.createdAt.toLocaleString(),
        rentalPeriodFrom: updatedPayment.startDate?.toLocaleDateString()!,
        rentalPeriodTo: updatedPayment.endDate?.toLocaleDateString()!,
        amount: updatedPayment.amount,
        property: payment!.property!,
        user: payment!.user!,
        owner: ownerInfo!,
      })
    );
    const emailData = {
      email: event.data.object.customer_details?.email!,
      subject: "Payment Confirmation Email",
      html: emailHtml,
    };

    await sentEmailWithNodemailer(emailData);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
