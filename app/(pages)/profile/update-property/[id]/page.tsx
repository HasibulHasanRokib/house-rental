import { UpdatePropertyForm } from "@/components/property/UpdatePropertyForm";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Metadata } from "next";
interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Update Property",
  description: "Generated by create next app",
};

const getProperty = cache(async (id: string) => {
  const property = await db.property.findUnique({
    where: { id },
  });

  if (!property) notFound();

  return property;
});

export default async function Page({ params: { id } }: PageProps) {
  const property = await getProperty(id);
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Edit your Property details</CardTitle>
        <CardDescription>
          This is how others will see you on the site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdatePropertyForm defaultValues={property} />
      </CardContent>
    </>
  );
}
