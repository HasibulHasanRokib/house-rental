import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import db from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { formatMoney } from "@/lib/utils";
import {
  Bed,
  Bath,
  House,
  Grid2x2,
  AlarmSmoke,
  SquareParking,
  Frame,
  Heater,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { FaSwimmingPool } from "react-icons/fa";

import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";

import defaultImage from "@/public/images/noavatar.jpg";
import Map from "@/public/images/map.png";
import { auth } from "@/auth";
import Link from "next/link";

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

const Page = async ({ params: { slug } }: PageProps) => {
  const property = await getProperty(slug);
  const session = await auth();

  const user = await db.user.findUnique({
    where: {
      id: property.userId,
    },
  });

  const relatedProperties = await db.property.findMany({
    where: {
      city: property.city,
      slug: { not: slug },
    },
    take: 4,
  });

  return (
    <div className="bg-muted">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className="space-y-4 lg:col-span-4">
            <ImageSection images={property.imagesUrl} />
            <div className="bg-white py-6 px-4 flex justify-between items-center">
              <article className="space-y-2">
                <h2 className="font-semibold text-3xl">
                  {property.propertyTitle}
                </h2>
                <span className="flex items-center space-x-2">
                  <FaLocationDot className="text-primary" />
                  <p className="text-muted-foreground">
                    {property.address}, {property.city}, {property.country}
                  </p>
                </span>
              </article>
              <div className="flex flex-col items-end space-y-2">
                <p className="font-semibold text-primary text-2xl">
                  {formatMoney(property.price)}
                </p>
                <p className="font-semibold text-muted-foreground">Per Month</p>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4">
                <span className="flex items-center space-x-2">
                  <strong className="text-primary">Status:</strong>
                  <p className="capitalize">{property.status}</p>
                </span>
                <span className="flex items-center space-x-2">
                  <strong className="text-primary">Type:</strong>
                  <p className="capitalize">{property.type}</p>
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-3 bg-white p-4">
              <div className="space-y-2">
                <h5 className="font-semibold text-xl">Description</h5>
                <p className="text-sm text-justify text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit...
                </p>
              </div>
              <div className="space-y-2">
                <h5 className="font-semibold text-xl">Condition</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4">
                  <span className="flex items-center space-x-2">
                    <Grid2x2 className="text-primary" />
                    <p>{property.area} sq ft</p>
                  </span>
                  <span className="flex items-center space-x-2">
                    <House className="text-primary" />
                    <p>{property.rooms} Rooms</p>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Bed className="text-primary" />
                    <p>{property.rooms} Bedrooms</p>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Bath className="text-primary" />
                    <p>{property.rooms} Bathrooms</p>
                  </span>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-xl">Amenities</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                  {property.hasAlarm && (
                    <span className="flex items-center space-x-2">
                      <AlarmSmoke size={30} className="text-primary" />
                      <p className="text-muted-foreground">Alarm</p>
                    </span>
                  )}
                  {property.hasParking && (
                    <span className="flex items-center space-x-2">
                      <SquareParking size={30} className="text-primary" />
                      <p className="text-muted-foreground">Parking</p>
                    </span>
                  )}
                  {property.hasLaundryRoom && (
                    <span className="flex items-center space-x-2">
                      <MdOutlineLocalLaundryService
                        size={30}
                        className="text-primary"
                      />
                      <p className="text-muted-foreground">Laundry Room</p>
                    </span>
                  )}
                  {property.hasSwimmingPool && (
                    <span className="flex items-center space-x-2">
                      <FaSwimmingPool size={30} className="text-primary" />
                      <p className="text-muted-foreground">Swimming Pool</p>
                    </span>
                  )}
                  {property.hasWoodenCeiling && (
                    <span className="flex items-center space-x-2">
                      <Frame className="text-primary" />
                      <p className="text-muted-foreground">Wooden Ceiling</p>
                    </span>
                  )}
                  {property.hasCentralHeating && (
                    <span className="flex items-center space-x-2">
                      <Heater className="text-primary" />
                      <p className="text-muted-foreground">Central Heating</p>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="w-full bg-white overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src={user?.image || defaultImage}
                      alt={`${user?.username}'s profile picture`}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-2">
                    {property?.contactName}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{property?.contactEmail}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{property?.contactPhone}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-6 pt-0 space-y-3">
                <Button variant="outline">Contact with owner</Button>
                {session?.user.role === "tenant" && (
                  <Link
                    href={`/property/preview?id=${property.id}`}
                    className={buttonVariants({
                      variant: "default",
                    })}
                  >
                    Continue
                    <ArrowRight />
                  </Link>
                )}
              </div>
            </div>
            <SocialMediaLists
              facebook="https://facebook.com"
              twitter="https://twitter.com"
              instagram="https://instagram.com"
              github="https://github.com"
              youtube="https://youtube.com"
            />
            <div className="bg-white p-4 mt-2">
              <h2 className="text-2xl font-semibold mb-4">Map</h2>
              <Image
                src={Map}
                alt="map"
                width={500}
                height={500}
                className="object-cover border rounded-sm w-full"
              />
            </div>
          </div>
        </div>
        {relatedProperties.length > 0 && (
          <div className="bg-white my-6">
            <h2 className="text-2xl font-semibold py-6 px-4">
              Related Properties
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {relatedProperties.map((related) => (
                <RelatedPropertyCard key={related.id} property={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
