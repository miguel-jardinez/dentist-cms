import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  hello: baseProcedure.query(() => ({
    greeting: "hello Miguel"
  }))
});

export type AppRouter = typeof appRouter;
