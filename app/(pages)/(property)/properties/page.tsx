"use cache";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import FilterProperty from "@/app/(pages)/(property)/_components/filterProperty";
import PropertyResult from "@/app/(pages)/(property)/_components/propertyResult";
import { PropertyFilterValue } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
    status?: string;
    type?: string;
    city?: string;
    bedrooms?: string;
    bathrooms?: string;
    hasWoodenCeiling?: string;
    hasParking?: string;
    hasCentralHeating?: string;
    hasAlarm?: string;
    hasSwimmingPool?: string;
    hasLaundryRoom?: string;
  };
}

export default async function Properties({ searchParams }: PageProps) {
  const {
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
  } = await searchParams;

  const filterValue: PropertyFilterValue = {
    q,
    status,
    type,
    city,
    bedrooms,
    bathrooms,
    hasWoodenCeiling: hasWoodenCeiling === "true",
    hasParking: hasParking === "true",
    hasCentralHeating: hasCentralHeating === "true",
    hasAlarm: hasAlarm === "true",
    hasSwimmingPool: hasSwimmingPool === "true",
    hasLaundryRoom: hasLaundryRoom === "true",
  };

  return (
    <>
      <div className="flex h-52 flex-col space-y-3 justify-center items-center">
        <h3 className="text-4xl font-bold">Properties Listing</h3>
        <p className="text-muted-foreground">Find your favorite properties</p>
      </div>

      <MaxWidthWrapper>
        <section className=" grid grid-cols-3 gap-4 ">
          <FilterProperty defaultValues={filterValue} />
          <div className="grid col-span-2 space-y-2">
            <div className="flex flex-col space-y-3">
              <PropertyResult filterValue={filterValue} />
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </>
  );
}
