import { headers } from "next/headers";
import Link from "next/link";

import { Button } from "@dentist/components/ui/button";
import MarketingPage from "@dentist/module/landing/ui/views/landing-view";
import { auth } from "@dentist/utils/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <>
      {
        session?.session.userId ? (
          <Button asChild>
            <Link href="/organizations">
              Go dashboard
            </Link>
          </Button>) : (
          <Button asChild>
            <Link href="/auth/sign-in">
              Sign in
            </Link>
          </Button>
        )
      }
      <MarketingPage />
    </>
  );
}
