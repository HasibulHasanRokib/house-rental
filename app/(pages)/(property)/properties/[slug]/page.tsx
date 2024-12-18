import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLocalLaundryService } from "react-icons/md";
import db from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import ImageSlider from "../../_components/imageSlider";
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
  CircleUserRound,
  Mail,
  Phone,
} from "lucide-react";
import { FaSwimmingPool } from "react-icons/fa";
import Image from "next/image";
import DefaultImage from "@/public/images/noavatar.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CommentSection from "../../_components/commentSection";

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

  const user = await db.user.findUnique({
    where: {
      id: property.userId,
    },
  });

  return (
    <MaxWidthWrapper>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="col-span-2 space-y-4">
          {/* Header */}
          <Card className="bg-white p-4">
            <article className="space-y-2">
              <h2 className="font-semibold text-3xl">
                {property.propertyTitle}
              </h2>
              <span className="flex items-center space-x-2">
                <FaLocationDot className="text-primary" />
                <p className="text-muted-foreground">
                  {property.address},{property.city},{property.country}
                </p>
              </span>
            </article>
          </Card>
          {/* Images */}
          <ImageSlider images={property.imagesUrl} />
          {/* Other */}
          <Card className="flex flex-col space-y-3 bg-white p-4">
            {/* description */}
            <div className="space-y-2">
              <h5 className="font-semibold text-xl">Description</h5>
              <p className="text-sm text-justify text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
                molestias quos officiis aperiam doloribus deleniti totam, rerum,
                accusamus vel reprehenderit consectetur magni sapiente eos
                provident? Ratione, dolores veniam nihil illum voluptatibus
                voluptatum officia, error velit ducimus placeat voluptatem
                veritatis quibusdam odio facere. Nesciunt, sed! Voluptates
                eveniet doloremque iure est. Beatae autem ex saepe omnis tempora
                deleniti voluptas repudiandae est laborum qui at inventore
                voluptates possimus, repellendus architecto, doloribus cumque
                exercitationem, facilis impedit. Ex quo perferendis omnis velit
                repellat quidem aliquam est cupiditate corporis soluta magnam
                aspernatur sed laboriosam quae ea blanditiis ipsa incidunt,
                temporibus exercitationem libero aut tempora eius. Nostrum
                laboriosam inventore earum culpa laborum libero odio, mollitia,
                consequatur quod est veniam molestias incidunt reprehenderit
                aliquid sint doloribus omnis dolorem pariatur excepturi quam!
                Modi velit rem architecto eveniet tempore a, quas iste quia
                veniam fugiat cumque vero iusto eaque magni magnam porro
                repellendus soluta sequi numquam corporis esse excepturi non
                blanditiis! Praesentium recusandae repellat dolore rerum maxime
                aliquam consectetur. Excepturi animi nihil aliquam dolorum,
                molestiae culpa quidem. Accusamus nisi iste, at, odit tempore
                vitae culpa error consequatur dolores minima consequuntur ipsum
                doloribus ullam reprehenderit enim totam vel delectus unde.
                Accusantium dolorum earum id molestiae odit accusamus rem non
                illo nihil.
              </p>
            </div>
            {/* Condition */}
            <div className="space-y-2">
              <h5 className="font-semibold text-xl">Condition</h5>
              <div className="flex justify-between items-center p-4">
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
            <div className="flex flex-col ">
              <h5 className="font-semibold text-xl">Amenities</h5>
              <div className="grid grid-cols-4 gap-2 p-4">
                {property.hasAlarm ? (
                  <span className="flex items-center space-x-2">
                    <AlarmSmoke className="text-primary" />
                    <p className="text-muted-foreground">Alarm</p>
                  </span>
                ) : null}
                {property.hasParking ? (
                  <span className="flex items-center space-x-2">
                    <SquareParking className="text-primary" />
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
          </Card>
          {/* Todo:Location */}
        </div>
        <div className="w-full">
          <Card>
            <CardHeader>Contact sellers</CardHeader>
            <CardContent>
              <div className="flex items-center space-x-5">
                <Image
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-full border"
                  src={user?.image || DefaultImage}
                  alt="image"
                />
                <div className="space-y-1">
                  <span className="flex items-center space-x-2">
                    <CircleUserRound className="text-primary" size={20} />
                    <p className="text-muted-foreground">{user?.username}</p>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Mail className="text-primary" size={20} />
                    <p className="text-muted-foreground">{user?.email}</p>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Phone className="text-primary" size={20} />
                    <p className="text-muted-foreground">{user?.phoneNo}</p>
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                {property.status === "rent"
                  ? "COntact for Rent"
                  : "Contact for Buy"}
              </Button>
            </CardFooter>
          </Card>
          <CommentSection />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PropertyDetails;
