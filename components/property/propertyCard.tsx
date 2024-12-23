import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Property1 from "@/public/images/properties-1.jpg";
import {
  Bath,
  Bed,
  Calendar,
  CalendarDays,
  MapPin,
  Maximize2,
  User,
} from "lucide-react";

import { formatMoney, relativeData } from "@/lib/utils";
import { Property } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="w-full overflow-hidden grid grid-cols-2">
      <div>
        <div className="relative">
          <img
            src={property.imagesUrl[0]}
            alt="Modern living room"
            className="w-full h-[250px] object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="capitalize">
              {property.type}
            </Badge>
          </div>

          <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-md">
            <span className="text-2xl font-bold">
              {formatMoney(property.price)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <CardContent className="flex-grow p-6">
          <h2 className="text-2xl truncate font-semibold text-primary mb-2">
            {property.propertyTitle}
          </h2>

          <div className="flex items-center text-muted-foreground mb-6">
            <MapPin className="w-4 h-4 mr-2" />
            <span>
              {property.address},{property.city}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-primary" />
              <span>{property.area} sq ft</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-primary" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-primary" />
              <span>{property.bathrooms} Baths</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="py-4 px-6 border-t flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span>{property.contactName}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{relativeData(property.createdAt)}</span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PropertyCard;
