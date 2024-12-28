<<<<<<< HEAD
=======
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
>>>>>>> 87812bbd3cba602eefb135e54ac5b95d2e2b9e64
import Image from "next/image";
import Image1 from "@/public/images/img-1.jpg";
import { Card, CardTitle } from "@/components/ui/card";

import { PiBuildingApartment } from "react-icons/pi";
import { GiHouse, GiMechanicGarage } from "react-icons/gi";
import { TbCoinTaka } from "react-icons/tb";

import db from "@/lib/db";
import Link from "next/link";
import MaxWidthWrapper from "@/components/maxWithWrapper";

export default async function Page() {
  const cities = await db.property.findMany({
    select: { city: true },
    distinct: ["city"],
  });

  return (
    <main className="flex flex-col space-y-20">
      {/* Hero section */}
      <section className="h-[80vh] bg-cover bg-center bg-no-repeat bg-gradient-bg bg-fixed flex justify-center items-center">
        <div className="space-y-6 text-white text-center px-4 sm:px-8 lg:px-16">
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl">
            Find Your Amazing Home
          </h1>
          <p className="text-white/60 text-sm sm:text-base lg:text-lg">
            Allow us to guide you through the innovative{" "}
            <br className="hidden sm:block" />
            stress-free approach to finding your dream Properties.
          </p>
        </div>
      </section>

      {/* Featured Properties */}
      <section>
        <MaxWidthWrapper className="flex flex-col space-y-10 px-4 sm:px-8 lg:px-16">
          <div>
            <p className="text-primary text-base sm:text-lg">
              Best Rent Properties
            </p>
            <h3 className="font-semibold text-2xl sm:text-3xl">
              Featured <span className="text-primary">Properties</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cities.map(({ city }) => {
              return (
                <Link
                  href={`/properties?city=${city}`}
                  key={city}
                  className="hover:underline underline-offset-4 hover:text-primary text-sm sm:text-base"
                >
                  {city}
                </Link>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section>

      {/* What are you looking for? */}
      <section className="bg-white py-6">
        <MaxWidthWrapper className="flex flex-col space-y-10 px-4 sm:px-8 lg:px-16">
          <div>
            <h3 className="font-semibold text-2xl sm:text-3xl">
              What are you <span className="text-primary">looking for?</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Image
                className="border rounded-md border-primary w-full"
                src={Image1}
                alt="image1"
              />
            </div>
            <div className="flex flex-col justify-between space-y-4">
              <Card className="flex items-center hover:bg-slate-100 p-6 gap-6">
                <PiBuildingApartment size={50} className="text-primary" />
                <div className="space-y-2">
                  <CardTitle>Apartments</CardTitle>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus tincidunt aliquam.
                  </p>
                </div>
              </Card>
              <Card className="flex items-center p-6 hover:bg-slate-100 gap-6">
                <GiHouse size={50} className="text-primary" />
                <div className="space-y-2">
                  <CardTitle>Houses</CardTitle>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus tincidunt aliquam.
                  </p>
                </div>
              </Card>
              <Card className="flex hover:bg-slate-100 items-center p-6 gap-6">
                <GiMechanicGarage size={50} className="text-primary" />
                <div className="space-y-2">
                  <CardTitle>Garages</CardTitle>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec luctus tincidunt aliquam.
                  </p>
                </div>
              </Card>
              <Card className="flex hover:bg-slate-100 items-center p-6 gap-6">
                <TbCoinTaka size={50} className="text-primary" />
                <div className="space-y-2">
                  <CardTitle>Commercial</CardTitle>
                  <p className="text-muted-foreground text-sm sm:text-base">
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
