import { z } from "zod";

/**
 * Login Form Schema
 */
export const loginSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register Form Schema
 */
export const registerSchema = z
  .object({
    email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa")
      .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất một chữ số"),
    confirmPassword: z.string(),
    fullName: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
