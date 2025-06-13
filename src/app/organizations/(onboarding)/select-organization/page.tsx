import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SelectOrganizationView from "@dentist/module/organization/ui/views/select-organization";
import { auth } from "@dentist/utils/auth";

const SelectOrganizationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session) {
    redirect("/auth/sign-in");
  }

  const organizations = await auth.api.listOrganizations({ headers: await headers() });

  return <SelectOrganizationView organizations={organizations} />;
};
 
export default SelectOrganizationPage;
