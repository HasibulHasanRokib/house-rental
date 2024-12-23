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
        <h3 className="text-2xl font-semibold text-primary truncate">
          {property.propertyTitle}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="truncate">
            {property.address},{property.city}
          </span>
        </div>
        <div className="px-3 text-primary">{formatMoney(property.price)}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-muted-foreground">
          <div className="flex items-center gap-2">
            <Square className="h-4 w-4" />
            <span>{property.area} sq ft</span>
          </div>
          <div className="flex items-center gap-2">
            <BedDouble className="h-4 w-4" />
            <span>{property.bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} Bath</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
