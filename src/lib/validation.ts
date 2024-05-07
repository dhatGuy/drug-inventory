import { z } from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(4, { message: "Name is too short" })
      .max(50, { message: "Name is too long" }),
    email: z.string().email({ message: "Must be a valid email" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password is too short" })
      .max(50, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password is too short" })
    .max(50, { message: "Password is too long" }),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
