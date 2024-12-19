import db from "@/lib/db";
import PropertyListItem from "./propertyListItem";
import Link from "next/link";
import { PropertyFilterValue } from "@/lib/validation";
import { Prisma, Property } from "@prisma/client";

interface PropertyResultProps {
  filterValue: PropertyFilterValue;
}

export default async function PropertyResult({
  filterValue: {
    q,
    status,
    type,
    city,
    bedrooms,
    bathrooms,
    hasWoodenCeiling,
    hasParking,
    hasCentralHeating,
    hasAlarm,
    hasSwimmingPool,
    hasLaundryRoom,
  },
}: PropertyResultProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.PropertyWhereInput = searchString
    ? {
        OR: [
          { propertyTitle: { search: searchString } },
          { city: { search: searchString } },
          { address: { search: searchString } },
          { state: { search: searchString } },
          { status: { search: searchString } },
          { type: { search: searchString } },
        ],
      }
    : {};

  const parsedBedrooms = bedrooms
    ? parseInt(bedrooms as unknown as string, 5)
    : undefined;
  const parsedBathrooms = bathrooms
    ? parseInt(bathrooms as unknown as string, 5)
    : undefined;

  const where: Prisma.PropertyWhereInput = {
    AND: [
      searchFilter,
      status ? { status } : undefined,
      type ? { type } : undefined,
      city ? { city } : undefined,
      parsedBedrooms !== undefined ? { bedrooms: parsedBedrooms } : undefined,
      parsedBathrooms !== undefined
        ? { bathrooms: parsedBathrooms }
        : undefined,
      hasWoodenCeiling ? { hasWoodenCeiling } : undefined,
      hasParking ? { hasParking } : undefined,
      hasCentralHeating ? { hasCentralHeating } : undefined,
      hasAlarm ? { hasAlarm } : undefined,
      hasSwimmingPool ? { hasSwimmingPool } : undefined,
      hasLaundryRoom ? { hasLaundryRoom } : undefined,
    ].filter(Boolean) as Prisma.PropertyWhereInput[],
  };

  const properties = await db.property.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      {properties.map((property: Property) => {
        return (
          <Link href={`/properties/${property.slug}`} key={property.id}>
            <PropertyListItem property={property} />
          </Link>
        );
      })}
      {properties.length === 0 ? (
        <div className="text-center">
          <h2>No data found!</h2>
        </div>
      ) : null}
    </>
  );
}
