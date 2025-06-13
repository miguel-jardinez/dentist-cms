import { headers } from "next/headers";
import { redirect } from "next/navigation";

import OrganizationView from "@dentist/module/organization/ui/views/organization-view";
import { auth } from "@dentist/utils/auth";

const Organizations = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <OrganizationView userId={session.session.userId} />
    </>
  );
};
 
export default Organizations;
