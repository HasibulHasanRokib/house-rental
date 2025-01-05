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

    const emailHtml = await render(
      PaymentConfirmationEmail({
        paymentId,
        paymentDate: updatedPayment.createdAt.toLocaleDateString(),
        rentalPeriodFrom: updatedPayment.startDate?.toLocaleString()!,
        rentalPeriodTo: updatedPayment.endDate?.toLocaleString()!,
        amount: updatedPayment.amount,
        property: payment!.property!,
        user: payment!.user!,
      })
    );
    const emailData = {
      email: event.data.object.customer_details?.email!,
      subject: "Verification email account.",
      html: emailHtml,
    };

    await sentEmailWithNodemailer(emailData);

    //For tenant
    // const { data, error } = await resend.emails.send({
    //   from: "Acme <onboarding@resend.dev>",
    //   to: [event.data.object.customer_details?.email!],
    //   subject: "Payment confirmed!",
    //   react: PaymentConfirmationEmail({
    // paymentId,
    // paymentDate: updatedPayment.createdAt.toLocaleDateString(),
    // rentalPeriodFrom: updatedPayment.startDate?.toLocaleString()!,
    // rentalPeriodTo: updatedPayment.endDate?.toLocaleString()!,
    // amount: updatedPayment.amount,
    // property: payment!.property!,
    // user: payment!.user!,
    //   }),
    // });

    // if (error) {
    //   return console.error({ error });
    // }

    // console.log({ data });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
