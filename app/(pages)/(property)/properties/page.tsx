import MaxWidthWrapper from "@/components/maxWidthWrapper";
import FilterProperty from "@/components/property/filterProperty";
import PropertyResult from "@/components/property/propertyResult";
import { PropertyFilterValue } from "@/lib/validation";
import { Suspense } from "react";

interface PageProps {
  searchParams: {
    q?: string;
    status?: string;
    type?: string;
    city?: string;
    country?: string;
    bedrooms?: string;
    bathrooms?: string;
    hasWoodenCeiling?: string;
    hasParking?: string;
    hasCentralHeating?: string;
    hasAlarm?: string;
    hasSwimmingPool?: string;
    hasLaundryRoom?: string;
    page?: string;
  };
}

export default async function Properties({ searchParams }: PageProps) {
  const {
    q,
    status,
    type,
    city,
    country,
    bedrooms,
    bathrooms,
    hasWoodenCeiling,
    hasParking,
    hasCentralHeating,
    hasAlarm,
    hasSwimmingPool,
    hasLaundryRoom,
    page,
  } = searchParams;

  const filterValues: PropertyFilterValue = {
    q,
    status,
    type,
    city,
    bedrooms,
    country,
    bathrooms,
    hasWoodenCeiling: hasWoodenCeiling === "true",
    hasParking: hasParking === "true",
    hasCentralHeating: hasCentralHeating === "true",
    hasAlarm: hasAlarm === "true",
    hasSwimmingPool: hasSwimmingPool === "true",
    hasLaundryRoom: hasLaundryRoom === "true",
  };

  return (
    <div className=" space-y-8 my-10 relative">
      <div className="flex flex-col space-y-3 justify-center items-center">
        <h3 className="text-4xl font-bold">Properties Listing</h3>
        <p className="text-muted-foreground">Find your favorite properties</p>
      </div>

      <MaxWidthWrapper>
        <section className=" grid grid-cols-3 gap-4 relative">
          <FilterProperty />
          <div className="grid col-span-2 space-y-2">
            <div className="flex flex-col space-y-3">
              <Suspense fallback={<div>Loading...</div>}>
                <PropertyResult
                  filterValues={filterValues}
                  page={page ? parseInt(page) : undefined}
                />
              </Suspense>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
