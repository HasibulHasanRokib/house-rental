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
import ImageSection from "@/components/property/ImageSection";
import SocialMediaLists from "@/components/property/SocialMediaLists";
import RelatedPropertyCard from "@/components/property/RelatedPropertyCard";
import ErrorMessage from "@/components/ErrorMessage";

interface PageProps {
  params: {
    slug: string;
  };
}

const getProperty = cache(async (slug: string) => {
  const property = await db.property.findUnique({
    where: { slug },
    include: {
      User: true,
    },
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

  const user = await db.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    select: {
      role: true,
      completed: true,
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
            <div className="bg-white py-6 px-4 flex max-md:flex-col justify-between md:items-center items-start max-md:space-y-4">
              <article className="space-y-2 ">
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
              <div className="flex flex-col md:items-end space-y-2">
                <p className="font-semibold text-primary text-2xl">
                  {formatMoney(property.price)}
                </p>
                <p className="font-semibold text-muted-foreground">Per Month</p>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4">
                <div className="flex items-center space-x-2">
                  <strong>Status:</strong>
                  <span className="capitalize">
                    {property.status === "accepted" ? (
                      <p className="text-primary">Verified</p>
                    ) : property.status === "pending" ? (
                      <p className="text-blue-600">Pending</p>
                    ) : property.status === "booked" ? (
                      <p className="text-primary">Booked</p>
                    ) : (
                      <p className="text-destructive">Rejected</p>
                    )}
                  </span>
                </div>
                <span className="flex items-center space-x-2">
                  <strong>Type:</strong>
                  <p className="capitalize">{property.type}</p>
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-3 bg-white p-4">
              <div className="space-y-2">
                <h5 className="font-semibold text-xl">Description</h5>
                <p className="text-sm text-justify text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Veniam, nobis ipsam suscipit ipsum, nisi optio atque autem ea
                  quidem est illum odio provident iste voluptas neque ad nulla,
                  perspiciatis earum magni fugit laborum magnam. Aliquid
                  deserunt deleniti tempore magnam asperiores facilis animi
                  voluptates, ipsa officiis ratione repellendus possimus hic aut
                  omnis in enim eaque sint dicta. Aspernatur laboriosam soluta
                  doloremque iure omnis maiores magnam fugiat debitis accusamus,
                  aperiam doloribus ut natus quibusdam quaerat aliquid
                  reprehenderit. Laborum iusto possimus soluta consequuntur, et,
                  quis voluptatem quaerat ad rem quod nobis ex aut? At dolores
                  vel, nobis numquam accusamus corporis quo recusandae fugiat
                  ullam labore, perspiciatis veniam veritatis provident?
                  Necessitatibus in explicabo quia repellendus. Blanditiis, eum.
                  Et, perspiciatis. Sed exercitationem totam fugiat molestiae.
                  At temporibus consectetur voluptatem provident dignissimos
                  laborum velit ipsa, rerum dolor, obcaecati expedita eius,
                  nulla perspiciatis eveniet commodi ea deserunt dolore cum eos
                  quam libero alias non labore. Placeat, nulla!
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
                      src={property.User?.image || defaultImage}
                      alt={`${property.User?.username}'s profile picture`}
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
                <Button variant="outline" disabled>
                  Contact with owner
                </Button>
                {session &&
                  user?.role === "tenant" &&
                  (user.completed === false ? (
                    <ErrorMessage message="Please complete your information to proceed!" />
                  ) : (
                    <Link
                      href={`/property/preview?id=${property.id}`}
                      className={buttonVariants({
                        variant: "default",
                      })}
                    >
                      Continue
                      <ArrowRight />
                    </Link>
                  ))}
              </div>
            </div>
            <SocialMediaLists
              facebook="https://facebook.com"
              twitter="https://twitter.com"
              instagram="https://instagram.com"
              github="https://github.com"
              youtube="https://youtube.com"
            />
          </div>
        </div>
        {relatedProperties.length > 0 && (
          <div className="bg-white my-6">
            <h2 className="text-2xl font-semibold py-6 px-4">
              Related Properties
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              {relatedProperties.map((related) => (
                <Link href={`/properties/${property.slug}`} key={related.id}>
                  <RelatedPropertyCard property={related} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
