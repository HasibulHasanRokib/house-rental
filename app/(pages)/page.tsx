import MaxWidthWrapper from "@/components/maxWidthWrapper";
import Image from "next/image";
import Image1 from "@/public/images/img-1.jpg";
import { Card, CardTitle } from "@/components/ui/card";

import { PiBuildingApartment } from "react-icons/pi";
import { GiHouse, GiMechanicGarage } from "react-icons/gi";
import { TbCoinTaka } from "react-icons/tb";
import { buttonVariants } from "@/components/ui/button";
import db from "@/lib/db";
import Link from "next/link";
import { Property } from "@prisma/client";
import PropertyCard from "@/app/(pages)/(property)/_components/propertyCard";

export default async function Home() {
  const properties = await db.property.findMany();

  return (
    <main className="flex flex-col space-y-20">
      {/* Hero section */}
      <section className="h-[80vh] bg-cover bg-center bg-no-repeat bg-gradient-bg bg-fixed flex justify-center items-center">
        <div className="space-y-6 text-white text-center">
          <h1 className="font-bold text-5xl text-center">
            Find Your Amazing Home
          </h1>
          <p className="text-white/60">
            Allow us to guide you through the innovative <br /> stress free
            approach in finding your dream Properties.
          </p>
        </div>
      </section>

      {/* Featured Properties */}
      <section>
        <MaxWidthWrapper className="flex flex-col space-y-10">
          <div>
            <p className="text-primary text-lg">Best Rent Properties</p>
            <h3 className="font-semibold text-3xl">
              Featured <span className="text-primary">Properties</span>
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {properties.map((property: Property) => {
              return (
                <Link href={`/properties/${property.slug}`} key={property.id}>
                  <PropertyCard property={property} />
                </Link>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Link
              href={"/properties"}
              className={buttonVariants({
                variant: "default",
              })}
            >
              Show more
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* What are you looking for? */}
      <section>
        <MaxWidthWrapper className="flex flex-col space-y-10">
          <div>
            <h3 className="font-semibold text-3xl ">
              What are you <span className="text-primary">looking for ?</span>
            </h3>
          </div>
          <div className=" grid grid-cols-2">
            <div>
              <Image
                className="border rounded-md border-primary"
                src={Image1}
                alt="image1"
              />
            </div>
            <div className="flex flex-col justify-between">
              <Card className="flex items-center hover:bg-slate-100 p-6 gap-6">
                <PiBuildingApartment size={50} className="text-primary" />
                <div className="space-y-2">
                  <CardTitle>Apartments</CardTitle>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus tincidunt aliquam.
                  </p>
                </div>
              </Card>
              <Card className="flex items-center p-6 hover:bg-slate-100 gap-6">
                <GiHouse size={50} className="text-primary" />
                <div className="space-y-2">
                  <CardTitle>Houses</CardTitle>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus tincidunt aliquam.
                  </p>
                </div>
              </Card>
              <Card className="flex hover:bg-slate-100 items-center p-6 gap-6">
                <GiMechanicGarage size={50} className="text-primary" />
                <div className="space-y-2">
                  <CardTitle>Garages</CardTitle>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus tincidunt aliquam.
                  </p>
                </div>
              </Card>
              <Card className="flex hover:bg-slate-100 items-center p-6 gap-6">
                <TbCoinTaka size={50} className="text-primary" />
                <div className="space-y-2">
                  <CardTitle>Commercial</CardTitle>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus tincidunt aliquam.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </main>
  );
}
