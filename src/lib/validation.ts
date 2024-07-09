/* eslint-disable @typescript-eslint/no-redeclare */
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

export const NewItemSchema = z.object({
  itemName: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name is too short" })
    .max(50, { message: "Name is too long" })
    .default(""),
  nafdacNumber: z
    .string({ required_error: "NAFDAC Number is required" })
    .min(4, { message: "NAFDAC Number is too short" })
    .max(50, { message: "NAFDAC Number is too long" })
    .default(""),
  image: z
    .object(
      {
        uri: z.string(),
        name: z.string(),
        type: z.string(),
        size: z.number(),
      },
      { required_error: "Image is required", invalid_type_error: "Invalid image" }
    )
    // not more than 5MB
    .refine((data) => data.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    }),
  minStockLevel: z.coerce
    .number({
      required_error: "Required",
      invalid_type_error: "Must be a number",
    })
    .positive("Must be a positive number")
    .default(0),
  price: z.coerce
    .number({ required_error: "Price is required", invalid_type_error: "Must be a number" })
    .positive("Must be a positive number")
    .min(1)
    .default(0),
  quantity: z.coerce
    .number({ required_error: "Required" })
    .positive("Must be a positive number")
    .min(1)
    .default(0),
  expDate: z.coerce
    .date({ required_error: "Required" })
    .min(new Date(), { message: "Date is in the past" })
    .default(new Date()),
  manufactureDate: z.coerce
    .date({ required_error: "Required" })
    .default(new Date(new Date().setDate(new Date().getDate() + 1))),
});

export type NewItemSchema = z.infer<typeof NewItemSchema>;

export const CreateReviewSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(4, { message: "Title is too short" })
    .max(50, { message: "Title is too long" }),
  desc: z
    .string({ required_error: "Description is required" })
    .min(4, { message: "Description is too short" })
    .max(50, { message: "Description is too long" }),
});

export type CreateReviewSchema = z.infer<typeof CreateReviewSchema>;

export const NewReportSchema = z.object({
  product: z.object({
    id: z.string(),
    name: z.string(),
  }),
  masNumber: z.string().max(11, {
    message: "Maximum mas number length is 11 characters",
  }),
  comment: z.string().max(200, {
    message: "Maximum comment length is 200 characters",
  }),
});

export type NewReportSchema = z.infer<typeof NewReportSchema>;
