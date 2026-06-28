import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerEmailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
});

export type RegisterEmailFormData = z.infer<typeof registerEmailSchema>;

export const registerOtpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain digits only"),
});

export type RegisterOtpFormData = z.infer<typeof registerOtpSchema>;

export const registerProfileSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterProfileFormData = z.infer<typeof registerProfileSchema>;
