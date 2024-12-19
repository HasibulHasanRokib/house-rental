import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Property1 from "@/public/images/properties-1.jpg";
import { CalendarDays, MapPin } from "lucide-react";
import { FaBath, FaBed } from "react-icons/fa";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { formatMoney, relativeData } from "@/lib/utils";
import { Property } from "@prisma/client";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="hover:bg-slate-50">
      <CardHeader>
        <Image
          className="rounded-md"
          src={property.imagesUrl[0]}
          alt="property"
          width={550}
          height={500}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <CardTitle className="space-y-2">
          <p className="font-semibold text-lg">{property.propertyTitle}</p>
          <div className="flex items-center gap-1">
            <MapPin className="text-primary" size={20} />
            <p className="text-sm text-muted-foreground">
              {property.address},{property.city},{property.state}
            </p>
          </div>
        </CardTitle>
        <ul className="flex gap-6">
          <li className="flex items-center gap-2">
            <BsBoundingBoxCircles className="text-primary" />
            <p className="text-sm"> {property.area} sq ft</p>
          </li>
          <li className="flex items-center gap-2">
            <FaBed className="text-primary" />
            <p className="text-sm"> {property.bedrooms} Beds</p>
          </li>
          <li className="flex items-center gap-2">
            <FaBath className="text-primary" />
            <p className="text-sm"> {property.bathrooms} Baths</p>
          </li>
        </ul>
        <p className="text-sm text-primary">
          {formatMoney(property.price)} / month
        </p>
      </CardContent>

      <CardFooter className="border ">
        <div className="flex items-center gap-1.5 pt-4">
          <CalendarDays className="text-primary " />
          <p className="text-muted-foreground text-sm">
            {relativeData(property.createdAt)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
