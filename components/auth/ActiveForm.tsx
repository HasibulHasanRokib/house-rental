"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import emailVerificationAction from "@/actions/auth/emailVerificationAction";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import LoadingAnimate from "../LoadingAnimate";
import { buttonVariants } from "../ui/button";

export default function ActiveForm() {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onsubmit = useCallback(() => {
    if (!token) {
      setError("Missing token.");
      return;
    }
    emailVerificationAction(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  useEffect(() => {
    onsubmit();
  }, [onsubmit]);

  return (
    <Card className="w-full max-w-md mx-auto p-6 sm:p-8 lg:p-10 flex flex-col items-center mt-8">
      <CardHeader className="text-center">
        <CardTitle className="text-lg sm:text-xl">Verification</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Verify your email account.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        {!error && !success && <LoadingAnimate text="Loading..." />}

        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
      </CardContent>
      <CardFooter className="w-full text-center flex justify-center items-center">
        <Link
          href={"/auth/login"}
          className={buttonVariants({
            variant: "default",
          })}
        >
          Go to Login
        </Link>
      </CardFooter>
    </Card>
  );
}
