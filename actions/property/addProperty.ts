"use server";

import { AddingPropertySchema, TAddingPropertySchema } from "@/lib/validation";

export async function addingProperty(values: TAddingPropertySchema) {
  try {
    const validation = AddingPropertySchema.safeParse(values);
    if (!validation.success) {
      return { error: "Invalid values! Please check your inputs!" };
    }
    const result = validation.data;
    console.log(result);
    return { success: "Adding property successful." };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
}
