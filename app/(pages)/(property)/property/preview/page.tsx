import db from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import PropertyPreview from "./PropertyPreview";
import { auth } from "@/auth";
import { getUserById } from "@/lib/auth/user";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { id } = searchParams;
  if (!id || typeof id !== "string") return notFound();

  const property = await db.property.findUnique({
    where: { id },
  });

  const session = await auth();
  const user = await getUserById(session?.user.id as string);

  if (!property || !user) return notFound();
  return <PropertyPreview property={property} user={user} />;
}