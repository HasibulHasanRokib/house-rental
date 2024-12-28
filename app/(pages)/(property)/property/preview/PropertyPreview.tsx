"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import { Property, User } from "@prisma/client";
import { Calendar, Mail, MapPin, Phone, User2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import Confetti from "react-dom-confetti";

import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./DateRangePicker";

import { createCheckoutSession } from "@/actions/property/checkoutAction";
import { useRouter } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWithWrapper";
import ErrorMessage from "@/components/ErrorMessage";
export default function PropertyPreview({
  property,
  user,
}: {
  property: Property;
  user: User;
}) {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(new Date().setMonth(new Date().getMonth() + 2)),
  });

  const [error, setError] = useState<string | undefined>("");
  useEffect(() => setShowConfetti(true));

  const handleDateRangeChange = (range: any) => {
    setDateRange(range);
    validateDateRange(range);
  };
  const validateDateRange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const days = Math.floor(
        (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
      );
      const months = days / 30;
      if (months < 2) {
        setError("You must select at least a 2-month rental period.");
      } else {
        setError("");
      }
    }
  };
  const calculateTotalPrice = () => {
    if (dateRange?.from && dateRange?.to) {
      const days = Math.floor(
        (dateRange.to.getTime() - dateRange.from.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      const months = days / 30;
      return Math.floor(property.price * months);
    }
    return property.price;
  };

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCheckout = () => {
    startTransition(async () => {
      const totalPrice = calculateTotalPrice();
      const data = {
        propertyId: property.id,
        userId: user.id,
        totalPrice,
        dateRange,
      };
      await createCheckoutSession(data).then((data) => {
        if (data?.url) {
          router.push(data.url);
        } else {
          setError(data?.error);
        }
      });
    });
  };

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
                Rental Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Image
                    src={property.imagesUrl[0]}
                    alt={property.propertyTitle}
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
                        {property.propertyTitle}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <MapPin className="mr-2 h-4 w-4" /> {property.address}
                      </p>
                      <p className="flex items-center text-xl font-semibold text-green-600">
                        {formatMoney(property.price)} / month
                      </p>
                      <p className="flex items-center text-gray-600">
                        <Calendar className="mr-2 h-4 w-4" />{" "}
                        {dateRange.from.toLocaleDateString()} to{" "}
                        {dateRange.to.toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle>Owner Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="flex items-center">
                        <User2 className="mr-2 h-4 w-4" />{" "}
                        {property.contactName}
                      </p>
                      <p className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />{" "}
                        {property.contactEmail}
                      </p>
                      <p className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" />{" "}
                        {property.contactPhone}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle>Renter Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="flex items-center">
                        <User2 className="mr-2 h-4 w-4" /> {user.username}
                      </p>
                      <p className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" /> {user.email}
                      </p>
                      <p className="flex items-center">
                        <Phone className="mr-2 h-4 w-4" /> {user.phoneNo}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle>Rental Period</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="flex items-center text-gray-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        {dateRange?.from && dateRange?.to
                          ? `${dateRange.from.toLocaleDateString()} to ${dateRange.to.toLocaleDateString()}`
                          : "Select a date range"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Select Rental Period</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <DateRangePicker
                        className="w-full"
                        dateRange={dateRange}
                        onDateRangeChange={handleDateRangeChange}
                      />
                      {error && <ErrorMessage message={error} />}
                    </CardContent>
                  </Card>

                  <div className="mt-8 space-y-4">
                    <p className="text-2xl font-bold text-center">
                      Total: {formatMoney(calculateTotalPrice())}
                    </p>
                    <Button
                      size="lg"
                      className="w-full text-lg"
                      onClick={handleCheckout}
                      disabled={!!error || isPending}
                    >
                      {isPending ? "Loading..." : "Proceed to Checkout"}
                    </Button>
                    <Card className="border border-yellow-400 bg-yellow-50 shadow-md">
                      <CardHeader>
                        <CardTitle className="text-yellow-600">
                          Important Notice
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-yellow-700">
                        <>
                          <p>
                            1. Rental period must be a minimum of 2 months (60
                            days).
                          </p>
                          <p>
                            2. You will be required to pay for at least two full
                            months.
                          </p>
                          <p>
                            3. If the rental period includes months with 31
                            days, the additional day will also be charged.
                          </p>
                          <p>
                            4. Please ensure your selected rental dates meet
                            these requirements.
                          </p>
                        </>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
