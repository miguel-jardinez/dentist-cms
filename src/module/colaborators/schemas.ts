import { z } from "zod";

export const collaboratorSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "member"]),
  organizationId: z.string()
});

export type CollaboratorSchemaType = z.infer<typeof collaboratorSchema>;
