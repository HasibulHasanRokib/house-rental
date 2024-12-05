import MaxWidthWrapper from "@/components/maxWidthWrapper";
import db from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

const getProperty = cache(async (slug: string) => {
  const property = await db.property.findUnique({
    where: { slug },
  });

  if (!property) notFound();

  return property;
});

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const property = await getProperty(slug);
  return {
    title: property.propertyTitle,
  };
}
const PropertyDetails = () => {
  return (
    <>
      <div className="flex h-52 flex-col space-y-3 justify-center items-center">
        <h3 className="text-4xl font-bold">Property Details</h3>
        <p className="text-muted-foreground">Find your favorite properties</p>
      </div>

      <MaxWidthWrapper>
        <section className=" grid grid-cols-3 gap-4 ">
          Hello1
          <div className="grid col-span-2 space-y-2">
            <div className="flex flex-col space-y-3">hello 2</div>
          </div>
        </section>
      </MaxWidthWrapper>
    </>
  );
};

export default PropertyDetails;
