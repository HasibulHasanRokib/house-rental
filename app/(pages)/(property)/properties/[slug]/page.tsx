import MaxWidthWrapper from "@/components/maxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { formatMoney, relativeData } from "@/lib/utils";
import {
  BadgeDollarSign,
  CalendarDays,
  Check,
  CircleCheck,
  House,
  MapPin,
  PencilRuler,
} from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import ImageSlider from "../../_components/imageSlider";

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
const PropertyDetails = async ({ params: { slug } }: PageProps) => {
  const property = await getProperty(slug);

  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-4">
          <Card className="p-4 space-y-4">
            <div className="space-y-3">
              <h2 className="font-bold text-3xl">{property.propertyTitle}</h2>
              <div>
                <ul className="flex  space-x-10 items-center ">
                  <li className="flex items-center space-x-2">
                    <House size={20} />
                    <p className="text-primary text-sm">{property.type}</p>
                  </li>
                  <li className="flex items-center space-x-2">
                    <MapPin size={20} />
                    <p className="text-primary text-sm">{property.city}</p>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CalendarDays size={20} />
                    <p className="text-primary text-sm">
                      {relativeData(property.createdAt)}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <ImageSlider images={property.imagesUrl} />
          </Card>
          <Card>
            <div className="grid grid-cols-3 gap-2 p-2">
              <div className="p-2 flex items-center gap-2">
                <CircleCheck className="text-primary" />
                <h5 className="font-semibold">Status:</h5>
                <p className="text-sm text-muted-foreground">
                  {property.status}
                </p>
              </div>
              <div className="p-2 flex items-center gap-2">
                <PencilRuler className="text-primary" />
                <h5 className="font-semibold">Builtup Area</h5>
                <p className="text-sm text-muted-foreground">
                  {property.area} Sqpt
                </p>
              </div>
              <div className="p-2 flex items-center gap-2">
                <BadgeDollarSign className="text-primary" />
                <h5 className="font-semibold">
                  {property.status === "rent" ? "Monthly rent" : "Price"}
                </h5>
                <p className="text-sm text-muted-foreground">
                  {formatMoney(property.price)}
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{property.details}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 grid grid-cols-2">
              {property.hasAlarm ? (
                <p className="flex items-center gap-1 text-muted-foreground">
                  <Check className="text-primary" size={20} />
                  Alarm
                </p>
              ) : (
                ""
              )}
              {property.hasCentralHeating ? (
                <p className="flex items-center gap-1 text-muted-foreground">
                  <Check className="text-primary" size={20} />
                  Central Heating
                </p>
              ) : (
                ""
              )}
              {property.hasLaundryRoom ? (
                <p className="flex items-center gap-1 text-muted-foreground">
                  <Check className="text-primary" size={20} />
                  Laundry Room
                </p>
              ) : (
                ""
              )}
              {property.hasParking ? (
                <p className="flex items-center gap-1 text-muted-foreground">
                  <Check className="text-primary" size={20} />
                  Parking
                </p>
              ) : (
                ""
              )}
              {property.hasSwimmingPool ? (
                <p className="flex items-center gap-1 text-muted-foreground">
                  <Check className="text-primary" size={20} />
                  Swimming Pool
                </p>
              ) : (
                ""
              )}
              {property.hasWoodenCeiling ? (
                <p className="flex items-center gap-1 text-muted-foreground">
                  <Check className="text-primary" size={20} />
                  Wooden Ceiling
                </p>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        </div>
        <div className="  w-full">Section 2</div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PropertyDetails;
