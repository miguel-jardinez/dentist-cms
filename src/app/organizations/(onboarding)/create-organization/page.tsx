import { headers } from "next/headers";
import { redirect } from "next/navigation";

import CreateOrganizationView from "@dentist/module/organization/ui/views/create-organization-view";
import { auth } from "@dentist/utils/auth";

const CreateOrganizationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <CreateOrganizationView userId={session.session.userId} />
    </>
  );
};
 
export default CreateOrganizationPage;
