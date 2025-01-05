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
    <Card className="w-[550px] flex justify-center items-center flex-col mt-10">
      <CardHeader className="text-center">
        <CardTitle>Verification</CardTitle>
        <CardDescription>Verify your email account.</CardDescription>
      </CardHeader>
      <CardContent>
        {!error && !success && <LoadingAnimate text="Loading..." />}

        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
      </CardContent>
      <CardFooter>
        <Link
          href={"/auth/login"}
          className={buttonVariants({
            variant: "default",
          })}
        >
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
