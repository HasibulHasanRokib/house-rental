import db from "@/lib/db";
import Link from "next/link";
import { PropertyFilterValue } from "@/lib/validation";
import { Prisma, Property } from "@prisma/client";
import PropertyCard from "./PropertyCard";
import Pagination from "./PaginationControl";

interface PropertyResultProps {
  filterValues: PropertyFilterValue;
  page?: number;
}

export default async function PropertyResult({
  filterValues,
  page = 1,
}: PropertyResultProps) {
  const {
    q,

    type,
    city,
    bedrooms,
    country,
    bathrooms,
    hasWoodenCeiling,
    hasParking,
    hasCentralHeating,
    hasAlarm,
    hasSwimmingPool,
    hasLaundryRoom,
  } = filterValues;
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
          { country: { search: searchString } },
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
    status: "accepted",
    AND: [
      searchFilter,
      type ? { type } : undefined,
      city ? { city } : undefined,
      country ? { country } : undefined,
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

  const perPage = 5;

  const propertiesPromise = await db.property.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const totalPropertiesPromise = db.property.count({ where });
  const [properties, totalPropertiesResult] = await Promise.all([
    propertiesPromise,
    totalPropertiesPromise,
  ]);
  const totalPages = Math.ceil(totalPropertiesResult / perPage);
  return (
    <>
      {properties.map((property: Property) => {
        return (
          <Link href={`/properties/${property.slug}`} key={property.id}>
            <PropertyCard property={property} />
          </Link>
        );
      })}
      {properties.length === 0 ? (
        <div className="text-center">
          <h2>No data found!</h2>
        </div>
      ) : null}

      {properties.length > 5 ? (
        <Pagination
          currentPage={page}
          filterValues={filterValues}
          totalPage={totalPages}
        />
      ) : (
        ""
      )}
    </>
  );
}
