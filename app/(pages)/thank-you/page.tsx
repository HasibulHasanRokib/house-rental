import React, { Suspense } from "react";
import ThankYou from "./ThankYou";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "tenant") {
    return notFound();
  }

  return (
    <Suspense>
      <ThankYou />
    </Suspense>
  );
};

export default Page;
