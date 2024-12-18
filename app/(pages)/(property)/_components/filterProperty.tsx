import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, SearchCheck } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import db from "@/lib/db";
import { options } from "@/lib/types";
import { propertyFilterSchema, PropertyFilterValue } from "@/lib/validation";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "../../../../components/ui/button";
import Link from "next/link";

async function filterProperty(formData: FormData) {
  "use server";
  const value = Object.fromEntries(formData.entries());
  const {
    q,
    status,
    type,
    city,
    bedrooms,
    bathrooms,
    hasWoodenCeiling,
    hasParking,
    hasCentralHeating,
    hasAlarm,
    hasSwimmingPool,
    hasLaundryRoom,
  } = propertyFilterSchema.parse(value);
  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(status && { status }),
    ...(type && { type }),
    ...(city && { city }),
    ...(bedrooms && { bedrooms }),
    ...(bathrooms && { bathrooms }),
    ...(hasWoodenCeiling && { hasWoodenCeiling: "true" }),
    ...(hasParking && { hasParking: "true" }),
    ...(hasCentralHeating && { hasCentralHeating: "true" }),
    ...(hasAlarm && { hasAlarm: "true" }),
    ...(hasSwimmingPool && { hasSwimmingPool: "true" }),
    ...(hasLaundryRoom && { hasLaundryRoom: "true" }),
  });
  redirect(`/properties?${searchParams.toString()}`);
}

interface FilterPropertyProps {
  defaultValues: PropertyFilterValue;
}

const FilterProperty = async ({ defaultValues }: FilterPropertyProps) => {
  const locations = (await db.property
    .findMany({
      select: { city: true },
      distinct: ["city"],
    })
    .then((cites) =>
      cites.map(({ city }) => city).filter(Boolean)
    )) as string[];

  return (
    <aside className="sticky top-0 h-fit w-full">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <SearchCheck className="text-primary" />
            <p className="font-normal">Advance search</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={filterProperty} className="my-3 space-y-3">
            {/* Search */}
            <Input
              name="q"
              id="q"
              placeholder="Search here..."
              defaultValue={defaultValues.q}
            />

            {/* Property status */}
            <Select name="status" defaultValue={defaultValues.status}>
              <SelectTrigger>
                <SelectValue placeholder="Property status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup id="status">
                  <SelectLabel>Property status</SelectLabel>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/*  Property type */}
            <Select name="type" defaultValue={defaultValues.type}>
              <SelectTrigger>
                <SelectValue placeholder="Property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup id="type">
                  <SelectLabel>Property type</SelectLabel>
                  <SelectItem value="houses">Houses</SelectItem>
                  <SelectItem value="apartment">Apartments</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* City*/}
            <Select name="city" defaultValue={defaultValues.city}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup id="city">
                  <SelectLabel>Location</SelectLabel>
                  {locations.map((item) => (
                    <SelectItem className="capitalize" value={item} key={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Bedrooms */}
            <Select name="bedrooms" defaultValue={defaultValues.bedrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup id="bedrooms">
                  <SelectLabel>Bedrooms</SelectLabel>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* Bathrooms*/}
            <Select name="bathrooms" defaultValue={defaultValues.bathrooms}>
              <SelectTrigger>
                <SelectValue placeholder="Bathrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup id="bathrooms">
                  <SelectLabel>Bathrooms</SelectLabel>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <SelectItem key={item} value={item.toString()}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* More options */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="flex items-center gap-3">
                    <CirclePlus size={15} className="text-primary" />
                    <p className="text-primary">Show more options</p>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  {options.map((item) => {
                    return (
                      <div key={item.name} className="space-x-3">
                        <input
                          type="radio"
                          name={item.name}
                          className=" accent-emerald-600 "
                          defaultChecked={
                            defaultValues[
                              item.name as keyof PropertyFilterValue
                            ] === true
                          }
                        />
                        <label className="text-balance">{item.label}</label>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button type="submit" className="w-full">
              Search property
            </Button>
          </form>
          <Link
            href={"/properties"}
            className={buttonVariants({
              variant: "outline",
              className: "w-full",
            })}
          >
            Clear filters
          </Link>
        </CardContent>
      </Card>
    </aside>
  );
};

export default FilterProperty;
