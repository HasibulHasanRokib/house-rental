import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import db from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import ImageSlider from "@/components/property/imageSlider";
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
} from "lucide-react";
import { FaSwimmingPool } from "react-icons/fa";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SocialMedia } from "@/components/property/social-media-lists";
import defaultImage from "@/public/images/noavatar.jpg";
import Map from "@/public/images/map.png";
import { auth } from "@/auth";
import { Property } from "@prisma/client";
import Link from "next/link";
import { RelatedPropertyCard } from "@/components/property/relatedPropertyCard";

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
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        <div className="grid grid-cols-6 gap-4">
          <div className="space-y-4 col-span-4">
            {/* Images */}
            <ImageSlider images={property.imagesUrl} />
            {/* Header */}
            <div className="bg-white py-6 px-4 flex justify-between  items-center">
              <article className="space-y-2">
                <h2 className="font-semibold text-3xl font-sans">
                  {property.propertyTitle}
                </h2>
                <span className="flex items-center space-x-2">
                  <FaLocationDot className="text-primary" />
                  <p className="text-muted-foreground">
                    {property.address},{property.city},{property.country}
                  </p>
                </span>
              </article>
              <div className="flex flex-col items-end space-y-2">
                <p className="font-semibold text-primary text-2xl font-sans">
                  {formatMoney(property.price)}
                </p>
                <p className="font-semibold text-muted-foreground font-sans">
                  Per Month
                </p>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="grid grid-cols-2 gap-2 p-4">
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
            {/* Other */}
            <div className="flex flex-col space-y-3 bg-white p-4">
              {/* description */}
              <div className="space-y-2">
                <h5 className="font-semibold text-xl">Description</h5>
                <p className="text-sm text-justify text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
                  molestias quos officiis aperiam doloribus deleniti totam,
                  rerum, accusamus vel reprehenderit consectetur magni sapiente
                  eos provident? Ratione, dolores veniam nihil illum
                  voluptatibus voluptatum officia, error velit ducimus placeat
                  voluptatem veritatis quibusdam odio facere. Nesciunt, sed!
                  Voluptates eveniet doloremque iure est. Beatae autem ex saepe
                  omnis tempora deleniti voluptas repudiandae est laborum qui at
                  inventore voluptates possimus, repellendus architecto,
                  doloribus cumque exercitationem, facilis impedit. Ex quo
                  perferendis omnis velit repellat quidem aliquam est cupiditate
                  corporis soluta magnam aspernatur sed laboriosam quae ea
                  blanditiis ipsa incidunt, temporibus exercitationem libero aut
                  tempora eius. Nostrum laboriosam inventore earum culpa laborum
                  libero odio, mollitia, consequatur quod est veniam molestias
                  incidunt reprehenderit aliquid sint doloribus omnis dolorem
                  pariatur excepturi quam! Modi velit rem architecto eveniet
                  tempore a, quas iste quia veniam fugiat cumque vero iusto
                  eaque magni magnam porro repellendus soluta sequi numquam
                  corporis esse excepturi non blanditiis! Praesentium recusandae
                  repellat dolore rerum maxime aliquam consectetur. Excepturi
                  animi nihil aliquam dolorum, molestiae culpa quidem. Accusamus
                  nisi iste, at, odit tempore vitae culpa error consequatur
                  dolores minima consequuntur ipsum doloribus ullam
                  reprehenderit enim totam vel delectus unde. Accusantium
                  dolorum earum id molestiae odit accusamus rem non illo nihil.
                </p>
              </div>
              {/* Condition */}
              <div className="space-y-2">
                <h5 className="font-semibold text-xl">Condition</h5>
                <div className="grid grid-cols-4 gap-2 p-4">
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
              {/* Amenities */}
              <div>
                <h5 className="font-semibold text-xl">Amenities</h5>
                <div className="grid grid-cols-4 gap-4 p-4">
                  {property.hasAlarm ? (
                    <span className="flex items-center space-x-2">
                      <AlarmSmoke size={30} className="text-primary" />
                      <p className="text-muted-foreground">Alarm</p>
                    </span>
                  ) : null}
                  {property.hasParking ? (
                    <span className="flex items-center space-x-2">
                      <SquareParking size={30} className="text-primary" />
                      <p className="text-muted-foreground">Parking</p>
                    </span>
                  ) : null}
                  {property.hasLaundryRoom ? (
                    <span className="flex items-center space-x-2">
                      <MdOutlineLocalLaundryService
                        size={30}
                        className="text-primary"
                      />
                      <p className="text-muted-foreground">Laundry Room </p>
                    </span>
                  ) : null}
                  {property.hasSwimmingPool ? (
                    <span className="flex items-center space-x-2">
                      <FaSwimmingPool size={30} className="text-primary" />
                      <p className="text-muted-foreground">Swimming Pool </p>
                    </span>
                  ) : null}
                  {property.hasWoodenCeiling ? (
                    <span className="flex items-center space-x-2">
                      <Frame className="text-primary" />
                      <p className="text-muted-foreground">Wooden Ceiling </p>
                    </span>
                  ) : null}
                  {property.hasCentralHeating ? (
                    <span className="flex items-center space-x-2">
                      <Heater className="text-primary" />
                      <p className="text-muted-foreground">Central Heating</p>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-2">
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
                {session?.user.role === "tenant" ? (
                  <Button>Rent now</Button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <SocialMedia
              facebook="https://facebook.com"
              twitter="https://twitter.com"
              instagram="https://instagram.com"
              github="https://github.com"
              youtube="https://youtube.com"
            />
            <div className="bg-white p-4 mt-2">
              <h2 className="text-2xl font-semibold mb-4 font-sans">Map</h2>
              <Image
                src={Map}
                alt="map"
                width={500}
                height={500}
                className=" object-cover border rounded-sm"
              />
            </div>
          </div>
        </div>
        {/* relatedProperties */}
        {relatedProperties.length === 0 ? (
          ""
        ) : (
          <div className="space-y-6">
            <h2 className="font-sans  my-4 font-semibold text-2xl ">
              Related properties
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {relatedProperties.map((property: Property) => {
                return (
                  <Link href={`/properties/${property.slug}`} key={property.id}>
                    <RelatedPropertyCard property={property} />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
