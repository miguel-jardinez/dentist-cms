import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { adminClient } from "better-auth/client/plugins";
import { admin, organization } from "better-auth/plugins";

import { db } from "@dentist/db";
import * as schema from "@dentist/db/schema";
 
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema
    }
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128
  },
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string 
    } 
  },
  plugins: [
    organization(),
    admin(),
    adminClient()
  ]
});
