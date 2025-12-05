// lib/zod.ts
import * as z from "zod"

export const signInSchema = z.object({
  login: z.string().min(1, "Email or phone number is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const loginSchema = z.object({
  login: z.string().min(1, "Email or phone number is required"),
  password: z.string().min(1, "Password is required"),
})

// Phone number validation (Uganda format)
export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine((phone) => /^(\+256|256|0)[7]\d{8}$/.test(phone), {
    message:
      "Please enter a valid Uganda phone number (e.g., +256712345678, 0712345678)",
  })

// National ID validation (Uganda format)
export const nationalIdSchema = z
  .string()
  .min(1, "National ID is required")
  .regex(/^[A-Z0-9]{13,14}$/, "Please enter a valid National ID")

// U-Retire registration validation schema
export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: phoneSchema,
    nationalId: nationalIdSchema,
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    role: z.enum([
      "CIVIL_SERVANT",
      "HR_OFFICER",
      "PSPF_OFFICER",
      "MINISTRY_ADMIN",
    ]),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type LoginInput = z.infer<typeof loginSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type RegisterInput = z.infer<typeof registerSchema>
