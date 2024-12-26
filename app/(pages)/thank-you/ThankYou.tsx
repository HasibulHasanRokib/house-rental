"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  getOWnerById,
  getPaymentStatus,
  getPropertyById,
  getUserById,
} from "./action";
import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Home,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils";
import Confetti from "react-dom-confetti";

const ThankYou = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId") || "";
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  useEffect(() => setShowConfetti(true));

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => getPaymentStatus({ paymentId }),
    retry: true,
    retryDelay: 500,
  });

  const { data: property } = useQuery({
    queryKey: ["get-property"],
    queryFn: async () => getPropertyById({ propertyId }),
    retry: true,
    retryDelay: 500,
  });

  const { data: user } = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => getUserById({ userId }),
    retry: true,
    retryDelay: 500,
  });
  const { data: owner } = useQuery({
    queryKey: ["get-owner"],
    queryFn: async () => getOWnerById({ userId: property?.userId! }),
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
      <div className="py-2 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto shadow-none rounded-none">
          <CardHeader className="bg-green-500 text-white ">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8" />
              <CardTitle className="text-2xl font-bold">
                Rental Confirmed!
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Home className="w-6 h-6 mr-2 text-blue-500" />
                  Property Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 flex items-center mt-1">
                      Title: {property?.propertyTitle}
                    </p>
                    <p className="text-gray-600 flex items-center mt-1">
                      Address: {property?.address},{property?.city}
                    </p>
                    <p className="text-gray-600 mt-1 capitalize">
                      Area: {property?.area} sqrt
                    </p>
                    <p className="text-gray-600 mt-1 capitalize">
                      Bedrooms: {property?.bedrooms}
                    </p>
                    <p className="text-gray-600 mt-1 capitalize">
                      Bathrooms: {property?.bathrooms}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Amenities:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {property?.hasAlarm && <li>Alarm</li>}
                      {property?.hasCentralHeating && <li>Central Heating</li>}
                      {property?.hasLaundryRoom && <li>Laundry Room</li>}
                      {property?.hasParking && <li>Parking</li>}
                      {property?.hasSwimmingPool && <li>Swimming Pool</li>}
                      {property?.hasWoodenCeiling && <li>Wooden Ceiling</li>}
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-blue-500" />
                  Payment Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">Amount paid:</span>{" "}
                      {formatMoney(amount)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Payment method:</span>{" "}
                      Credit Card
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">Payment ID:</span>{" "}
                      {paymentId}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Payment date:</span>{" "}
                      {createdAt.toLocaleString()}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-500" />
                  Tenant Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">User id:</span> {user?.id}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Name:</span>{" "}
                      {user?.username}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {user?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">Gender:</span>{" "}
                      {user?.gender}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Address:</span>{" "}
                      {user?.address}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-500" />
                  Owner Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">User id:</span> {owner?.id}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Name:</span>{" "}
                      {owner?.username}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {owner?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">Gender:</span>{" "}
                      {owner?.gender}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Address:</span>{" "}
                      {owner?.address}
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-500" />
                  Rental Period
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">From:</span>{" "}
                      {startDate?.toDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium">To:</span>{" "}
                      {endDate?.toDateString()}
                    </p>
                  </div>
                </div>
              </section>

              <div className="border-t pt-6 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Need help? Contact our support team at support@houserent.com
                </p>
                <div className="space-x-4">
                  <Button variant="outline">Print Confirmation</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ThankYou;
