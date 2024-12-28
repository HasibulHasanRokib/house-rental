import { UpdatePropertyForm } from "@/components/property/UpdatePropertyForm";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

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
    <div className="p-4">
      <UpdatePropertyForm defaultValues={property} />
    </div>
  );
}
