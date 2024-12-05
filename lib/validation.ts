import { z } from "zod";
import { propertyStatus, propertyTypes } from "./types";

//filter validation
export const propertyFilterSchema = z.object({
  q: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  city: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  hasWoodenCeiling: z.coerce.boolean().optional(),
  hasParking: z.coerce.boolean().optional(),
  hasCentralHeating: z.coerce.boolean().optional(),
  hasAlarm: z.coerce.boolean().optional(),
  hasSwimmingPool: z.coerce.boolean().optional(),
  hasLaundryRoom: z.coerce.boolean().optional(),
});

export type PropertyFilterValue = z.infer<typeof propertyFilterSchema>;

//adding property validation

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

export const AddingPropertySchema = z.object({
  propertyTitle: requiredString.max(100),
  status: requiredString.refine((data) =>
    propertyStatus.map((item) => item.value.includes(data))
  ),
  type: requiredString.refine((data) =>
    propertyTypes.map((item) => item.value.includes(data))
  ),
  area: numericRequiredString.max(4, "Number can't be longer than 4 digits "),
  rooms: numericRequiredString,
  price: numericRequiredString.max(9, "Number can't be longer than 9 digits "),
  bathrooms: numericRequiredString,
  bedrooms: numericRequiredString,
  address: requiredString.max(100),
  city: requiredString.max(100),
  state: requiredString.max(100),
  country: requiredString.max(100),
  details: requiredString.max(5000),
  buildingAge: numericRequiredString.max(100).optional(),
  imagesUrl: z.array(z.string()),
  hasParking: z.boolean().default(false).optional(),
  hasSwimmingPool: z.boolean().default(false).optional(),
  hasLaundryRoom: z.boolean().default(false).optional(),
  hasWoodenCeiling: z.boolean().default(false).optional(),
  hasCentralHeating: z.boolean().default(false).optional(),
  hasAlarm: z.boolean().default(false).optional(),
  contactName: requiredString.max(100),
  contactEmail: z.string().email().min(1, "Required"),
  contactPhone: requiredString.regex(/^\d+$/, "Must be a number"),
});

export type TAddingPropertySchema = z.infer<typeof AddingPropertySchema>;
