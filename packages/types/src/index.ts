import z from "zod";

const emailSchema = z.email("Please enter a valid email address").nonempty("Email is required");

export const SignupType = z.object({
  firstName: z.string().nonempty("First name is required").min(3, "First name must be at least 3 characters long").max(20, "First name cannot exceed 20 characters"),
  lastName: z.string().nonempty("Last name is required").min(4, "Last name must be at least 4 characters long").max(20, "Last name cannot exceed 20 characters"),
  email: emailSchema,
  password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long"),
});

export const SigninType = z.object({
  email: emailSchema,
  password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long"),
});
