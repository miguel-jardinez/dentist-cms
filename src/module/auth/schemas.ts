import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "email or password wrong" }).max(128)
});

export const signUpSchema = z.object({
  name: z.string().min(3).max(128),
  lastName: z.string().min(3).max(128),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  repeatPassword: z.string().min(8).max(128)
}).refine((data) => data.password === data.repeatPassword, { message: "Password do not match" });

export const createNewPassworSchema = z.object({
  password: z.string().min(8).max(128),
  repeatPassword: z.string().min(8).max(128),
  token: z.string().min(3)
}).refine((data) => data.password === data.repeatPassword, { message: "Passwords do not match" });

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type CreateNewPasswordSchemaType = z.infer<typeof createNewPassworSchema>;
