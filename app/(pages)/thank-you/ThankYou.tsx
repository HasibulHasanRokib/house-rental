"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getPaymentStatus } from "./action";
import {
  Calendar,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
  User2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import Confetti from "react-dom-confetti";
import Image from "next/image";

const ThankYou = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId") || "";
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => setShowConfetti(true));

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ paymentId }),
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

  const { amount, startDate, endDate, createdAt, userId } = data;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 360 }}
        />
      </div>
      <div className="min-h-screen py-2 px-4 sm:px-6 lg:px-8">
        <MaxWidthWrapper>
          <Card className="overflow-hidden  shadow-none border-none rounded">
            <CardHeader className=" p-6">
              <CardTitle className="text-3xl font-bold border-b-2 py-2">
                <p className="text-base font-medium text-primary">Thank you!</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                  Payment Confirmed
                </h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Image
                    src={data.property?.imagesUrl[0]!}
                    alt={data.property?.propertyTitle!}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle>Property Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-2xl font-bold">
                        {data.property?.propertyTitle}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <MapPin className="mr-2 h-4 w-4" />{" "}
                        {data.property?.address}
                      </p>
                      <p className="flex items-center text-xl font-semibold text-green-600">
                        {formatMoney(data.property?.price!)} / month
                      </p>
                      <div>
                        <p className="font-medium">Amenities:</p>
                        <ul className="list-disc list-inside text-gray-600">
                          {data.property?.hasAlarm && <li>Alarm</li>}
                          {data.property?.hasCentralHeating && (
                            <li>Central Heating</li>
                          )}
                          {data.property?.hasLaundryRoom && (
                            <li>Laundry Room</li>
                          )}
                          {data.property?.hasParking && <li>Parking</li>}
                          {data.property?.hasSwimmingPool && (
                            <li>Swimming Pool</li>
                          )}
                          {data.property?.hasWoodenCeiling && (
                            <li>Wooden Ceiling</li>
                          )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Amount paid:</span>{" "}
                        {formatMoney(amount)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Payment method:</span>{" "}
                        Credit Card
                      </p>

                      <p className="text-gray-600">
                        <span className="font-medium">Payment date:</span>{" "}
                        {createdAt.toLocaleString()}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Payment ID:</span>{" "}
                        {paymentId}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">User ID:</span> {userId}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle>Owner Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="flex items-center">
                        <User2 className="mr-2 h-4 w-4" />{" "}
                        {data.property?.contactName}
                      </p>
                      <p className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />{" "}
                        {data.property?.contactEmail}
                      </p>
                      <p className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" />{" "}
                        {data.property?.contactPhone}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle>Tenant Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="flex items-center">
                        <User2 className="mr-2 h-4 w-4" /> {data.user.username}
                      </p>
                      <p className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" /> {data.user.email}
                      </p>
                      <p className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" /> {data.user.phoneNo}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle>Rental Period</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="flex items-center text-gray-600">
                        <Calendar className="mr-2 h-4 w-4" />{" "}
                        {startDate?.toLocaleDateString()} to{" "}
                        {endDate?.toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default ThankYou;
