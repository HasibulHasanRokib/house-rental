"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import { getPaymentStatus } from "./action";
import { Loader2 } from "lucide-react";

const ThankYou = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId") || "";

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => getPaymentStatus({ paymentId }),
    retry: true,
    retryDelay: 500,
  });

  if (data === undefined) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-1">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h3>Loading your payment...</h3>
          <p>This won&apos;t take long.</p>
        </div>
      </div>
    );
  }
  if (data === false) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-1">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h3>Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </div>
    );
  }
  const { amount, propertyId, userId, startDate, endDate, createdAt } = data;

  return <div>ThankYou {propertyId}</div>;
};

export default ThankYou;
