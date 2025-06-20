import { formRouter } from "@dentist/module/forms/server/form-procedures";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  forms: formRouter
});

export type AppRouter = typeof appRouter;
