import { Property, User } from "@prisma/client";
import {
  Html,
  Tailwind,
  Body,
  Container,
  Section,
  Heading,
  Text,
} from "@react-email/components";

import React from "react";

const PaymentConfirmationEmail = ({
  paymentId,
  paymentDate,
  amount,
  property,
  user,
  rentalPeriodFrom,
  rentalPeriodTo,
  owner,
}: {
  paymentId: string;
  paymentDate: string;
  rentalPeriodFrom: string;
  rentalPeriodTo: string;
  amount: number;
  property: Property;
  user: User;
  owner: User;
}) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://nextjs-house-rental.vercel.app";
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-100 p-4">
          <Container className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <Section>
              <Heading className="text-3xl font-bold text-center text-green-600 mb-2">
                Thank You!
              </Heading>
              <Text className="text-center text-gray-600">
                Your payment has been confirmed.
              </Text>
            </Section>

            <Section className="space-y-6 mt-6">
              {/* Booking Details */}
              <Section className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <Heading className="text-xl font-semibold mb-4">
                  Payment Details
                </Heading>
                <Container className="grid grid-cols-2 gap-4">
                  <Text className="text-sm font-medium text-gray-500">
                    Payment ID: {paymentId}
                  </Text>

                  <Text className="text-sm font-medium text-gray-500">
                    Payment amount: BDT {amount}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Property ID: {property?.id}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Payment Date: {paymentDate}
                  </Text>

                  <Text className="text-sm font-medium text-gray-500">
                    Rental Period From: {rentalPeriodFrom}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Rental Period To: {rentalPeriodTo}
                  </Text>
                </Container>
              </Section>

              {/* User Information */}
              <Section className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <Heading className="text-xl font-semibold mb-4">
                  User Information
                </Heading>
                <Container>
                  <Text className="text-sm font-medium text-gray-500">
                    User ID: {user?.id}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Name: {user?.username}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Email: {user?.email}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Phone number: {user?.phoneNo}
                  </Text>
                </Container>
              </Section>

              {/* Property Details */}
              <Section className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <Heading className="text-xl font-semibold mb-4">
                  Property Details
                </Heading>
                <Container>
                  <Text className="text-sm font-medium text-gray-500">
                    Property ID:{property?.id}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Title:{property?.propertyTitle}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Address: {property?.address}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Owner ID: {property?.userId}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Owner name: {owner?.username}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Owner email: {owner?.email}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">
                    Owner phone number: {owner?.phoneNo}
                  </Text>
                </Container>
              </Section>
            </Section>
            <Text className="font-medium text-center">
              <span>&copy; {new Date().getFullYear()} All rights reserved</span>
            </Text>
            <Text className="font-bold text-center">
              House<span className="text-green-600">Rental</span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PaymentConfirmationEmail;
