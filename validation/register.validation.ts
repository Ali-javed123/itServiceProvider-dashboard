import { z } from "zod";

const requiredString = (message: string) =>
  z.preprocess(
    (value) => (value === undefined || value === null ? "" : value),
    z.string().trim().min(1, message)
  );

export const registerSchema = z.object({
  name: requiredString("Name is required").refine(
    (value) => value.length >= 3,
    "Name must be at least 3 characters"
  ),

  email: requiredString("Email is required").refine(
    (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "Please enter a valid email address"
  ),

  password: requiredString("Password is required")
    .refine(
      (value) => value.length >= 8,
      "Password must be at least 8 characters"
    )
    .refine(
      (value) => /[A-Z]/.test(value),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (value) => /[0-9]/.test(value),
      "Password must contain at least one number"
    ),

  age: requiredString("Age is required")
    .refine(
      (value) => !isNaN(Number(value)),
      "Age must be a valid number"
    )
    .refine(
      (value) => Number.isInteger(Number(value)),
      "Age must be a whole number"
    )
    .refine(
      (value) => Number(value) >= 18,
      "You must be at least 18 years old"
    ),

  gender: z.preprocess(
    (value) => (value === undefined || value === null ? "" : value),
    z
      .enum(["male", "female"])
      .or(z.literal(""))
      .refine(
        (value) => value !== "",
        "Please select your gender"
      )
  ),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: "male" | "female";
  image?: string;
}