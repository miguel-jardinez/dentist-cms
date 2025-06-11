import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createTRPCContext } from "@dentist/trpc/init";
import { appRouter } from "@dentist/trpc/routers/_app";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext
  });
export { handler as GET, handler as POST };
