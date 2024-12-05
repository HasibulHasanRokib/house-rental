import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import { FaBath, FaBed } from "react-icons/fa";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { formatMoney, relativeData } from "@/lib/utils";
import { Property } from "@prisma/client";
interface PropertyCardTwoProps {
  property: Property;
}
const PropertyListItem = ({ property }: PropertyCardTwoProps) => {
  return (
    <Card className="grid grid-cols-2 p-2 gap-2">
      <div>
        <Image
          src={property.imagesUrl[0]}
          alt="image"
          className="h-full w-full object-cover rounded-md border"
          width={500}
          height={500}
        />
      </div>
      <div>
        <CardHeader>
          <CardTitle className="space-y-2">
            <p className="font-semibold text-lg">{property.propertyTitle}</p>
            <div className="flex items-center gap-1">
              <MapPin className="text-primary" size={20} />
              <p className="text-sm text-muted-foreground">
                {property.address},{property.city},{property.state}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
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
          <div className="flex items-center gap-1.5 ">
            <CalendarDays className="text-primary " />
            <p className="text-muted-foreground text-sm">
              {relativeData(property.createdAt)}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default PropertyListItem;
