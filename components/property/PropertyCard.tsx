import { Card, CardContent, CardFooter } from "../ui/card";
import { Bath, Bed, Calendar, Maximize2, MapPin, User } from "lucide-react";
import { formatMoney, relativeData } from "@/lib/utils";
import { Property } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="w-full overflow-hidden grid grid-cols-1 md:grid-cols-2">
      <div>
        <div className="relative">
          <img
            src={property.imagesUrl[0]}
            alt="Modern living room"
            className="w-full h-[200px] md:h-[250px] object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="capitalize">
              {property.type}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-md">
            <span className="text-lg md:text-2xl font-bold">
              {formatMoney(property.price)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <CardContent className="flex-grow p-4 md:p-6">
          <h2 className="text-xl md:text-2xl truncate font-semibold text-primary mb-2">
            {property.propertyTitle}
          </h2>
          <div className="flex items-center text-muted-foreground mb-4 md:mb-6">
            <MapPin className="w-4 h-4 mr-2" />
            <span>
              {property.address}, {property.city}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
        <CardFooter className="py-4 px-4 md:px-6 border-t flex justify-between items-center">
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
