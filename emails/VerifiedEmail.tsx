import React from "react";
import {
  Html,
  Tailwind,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
} from "@react-email/components";
function VerifiedEmail({ name, token }: { name: string; token: string }) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://nextjs-house-rental.vercel.app";
  return (
    <div>
      <Html>
        <Tailwind>
          <Body className="bg-gray-100 p-4">
            <Container className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
              <Section>
                <Heading>
                  <Text className="font-bold text-center text-3xl">
                    House<span className="text-green-600">Rental</span>
                  </Text>
                </Heading>
              </Section>
              <Section>
                <Heading>
                  <Text className="font-bold text-center text-xl capitalize">
                    Hello, {name}
                  </Text>
                </Heading>
              </Section>
              <Section>
                <Text className="font-bold text-center ">
                  Please{" "}
                  <Link
                    href={`${baseUrl}/auth/active-account?token=${token}`}
                    className="cursor-pointer underline text-lg px-1"
                  >
                    Click here
                  </Link>{" "}
                  to verify your account
                </Text>
              </Section>

              <Text className="font-medium text-center">
                <span>
                  &copy; {new Date().getFullYear()} All rights reserved
                </span>
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </div>
  );
}
export default VerifiedEmail;
