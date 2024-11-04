import { z, ZodString } from "zod";

export const usernameSchema: ZodString = z
  .string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  })
  .min(3, {
    message: "Username must be at least 3 characters",
  })
  .max(20, {
    message: "Username must be at most 20 characters",
  });
export const emailSchema: ZodString = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .email({
    message: "Invalid email",
  });
export const passwordSchema: ZodString = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(8, {
    message: "Password must be at least 8 characters",
  })
  .max(100, {
    message: "Password must be at most 100 characters",
  });
