import { z } from "zod";

export const getOneSchema = z.object({
  id: z.string()
});

export const createSchema = z.object({
  title: z.string(),
  description: z.string()
});
