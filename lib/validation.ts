import { z } from "zod";

//filter validation
export const propertyFilterSchema = z.object({
  q: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
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

export const AddingPropertySchema = z.object({
  propertyTitle: requiredString.max(100),

  type: z.enum(["houses", "apartment"], {
    required_error: "You need to select a type.",
  }),
  area: z
    .number()
    .min(100, "The number must have at least 3 digits")
    .max(10000, "The number must have at most 5 digits"),
  rooms: z
    .number()
    .min(1, "The number must have at least 1 digit")
    .max(5, "The number must not exceed 5")
    .int(),
  price: z
    .number()
    .min(1000, "The number must have at least 4 digits")
    .max(10000, "The number must have at most 5 digits"),
  bathrooms: z
    .number()
    .min(1, "The number must have at least 1 digit")
    .max(5, "The number must not exceed 5")
    .int(),
  bedrooms: z
    .number()
    .min(1, "The number must have at least 1 digit")
    .max(5, "The number must not exceed 5")
    .int(),
  address: requiredString.max(100),
  city: requiredString.max(100),
  country: requiredString.max(100),
  details: requiredString.max(5000),
  buildingAge: z.number().min(1).max(10).int().optional(),
  imagesUrl: z.array(z.string()),
  hasParking: z.boolean().default(false),
  hasSwimmingPool: z.boolean().default(false),
  hasLaundryRoom: z.boolean().default(false),
  hasWoodenCeiling: z.boolean().default(false),
  hasCentralHeating: z.boolean().default(false),
  hasAlarm: z.boolean().default(false),
  contactName: requiredString.max(100),
  contactEmail: z.string().email().min(1, "Required"),
  contactPhone: requiredString.regex(
    /^\d{11}$/,
    "Must be a valid 11-digit number"
  ),
});

export type TAddingPropertySchema = z.infer<typeof AddingPropertySchema>;
