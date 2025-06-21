import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { Resend } from "resend";

import { db } from "@dentist/db";
import * as schema from "@dentist/db/schema";
import { SendInvite } from "@dentist/module/emails/ui/templates/send-invitation";

const RESEND_CLIENT = new Resend(process.env.RESEND_DENTIST_CMS);
 
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
    organization({
      async sendInvitationEmail(data) {
        // const inviteLink = `http://localhost:3000/organizations/welcome-invite?invitationId=${data.invitationId}`;

        await RESEND_CLIENT.emails.send({
          from: "Dentist CMS <onboarding@resend.dev>",
          to: data.email,
          subject: "You've been invited to join Dentist CMS",
          react: await SendInvite({ invitationId: data.id })
        });
      }
    })
  ]
});
