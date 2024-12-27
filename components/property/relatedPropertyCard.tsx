import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { Bath, BedDouble, MapPin, Square } from "lucide-react";
import { Property } from "@prisma/client";
import { formatMoney } from "@/lib/utils";

export function RelatedPropertyCard({ property }: { property: Property }) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative">
        <Image
          src={property.imagesUrl[0]}
          alt="Modern house with glass walls"
          width={400}
          height={250}
          className="w-full object-cover max-h-[250px]"
        />
      </div>
      <CardHeader>
        <h3 className="text-lg sm:text-xl font-semibold text-primary truncate font-sans">
          {property.propertyTitle}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {property.address}, {property.city}
          </span>
        </div>
        <div className="px-3 text-primary text-sm sm:text-base">
          {formatMoney(property.price)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-muted-foreground text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Square className="h-4 w-4 shrink-0" />
            <span>{property.area} sq ft</span>
          </div>
          <div className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 shrink-0" />
            <span>{property.bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 shrink-0" />
            <span>{property.bathrooms} Bath</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
