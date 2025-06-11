import { headers } from "next/headers";

import LandingView from "@dentist/module/landing/ui/views/landing-view";
import { auth } from "@dentist/utils/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <>
      {JSON.stringify(session, null, 2)}
      Hola mundo
      <LandingView />
    </>
  );
}
