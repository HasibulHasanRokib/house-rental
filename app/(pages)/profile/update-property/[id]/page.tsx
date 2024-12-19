import { UpdatePropertyForm } from "@/components/property/updatePropertyForm";
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
    select: {
      id: true,
      propertyTitle: true,
      status: true,
      type: true,
      area: true,
      rooms: true,
      price: true,
      bathrooms: true,
      imagesUrl: true,
      address: true,
      city: true,
      country: true,
      details: true,
      buildingAge: true,
      bedrooms: true,
      hasParking: true,
      hasSwimmingPool: true,
      hasLaundryRoom: true,
      hasWoodenCeiling: true,
      hasCentralHeating: true,
      hasAlarm: true,
      contactName: true,
      contactEmail: true,
      contactPhone: true,
    },
  });

  if (!property) notFound();

  return property;
});

export default async function UpdatePropertyPage({
  params: { id },
}: PageProps) {
  const property = await getProperty(id);
  return (
    <div className="p-4">
      <UpdatePropertyForm defaultValues={property} />
    </div>
  );
}
