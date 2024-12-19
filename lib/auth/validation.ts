import { z } from "zod";

export const registerSchema = z.object({
  userRole: z.enum(["tenant", "owner"], {
    required_error: "You need to select a type.",
  }),
  firstName: z
    .string()

    .min(3, "First name is required.")
    .max(20, "Maximum length 20."),
  lastName: z
    .string()
    .min(3, "Last name is required.")
    .max(20, "Maximum length 20."),
  email: z.string().email(),
  password: z
    .string()
    .min(4, "Password must have 4 characters.")
    .max(8, "Maximum length 8."),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;

export const logInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(4, "Password must have 4 characters.")
    .max(8, "Maximum length 8."),
});

export type TLoginSchema = z.infer<typeof logInSchema>;

export const editProfileSchema = z.object({
  username: z.string().min(1, "Required").max(100),
  address: z.string().min(1, "Required").max(200),
  gender: z.enum(["Male", "Female"], {
    required_error: "You need to select a type.",
  }),
  phone: z.string().regex(/^\d+$/, "Must be a number").max(11),
  image: z.string().optional(),
  occupation: z.string().min(1, "Required"),
  id: z.string(),
});

export type TEditProfileSchema = z.infer<typeof editProfileSchema>;
