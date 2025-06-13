import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@dentist/utils/auth";

type DashboardPageProps = {
  searchParams: Promise<{ [k: string] : string }>
};

const DashboardPage = async ({ searchParams } : DashboardPageProps) => {
  const params = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const organizations = await auth.api.listOrganizations({ headers: await headers() });
  const shouldCreateOrg = organizations.length === 0 && !params.orgId;
  const shouldSelectOrg = organizations.length > 0 && !params.orgId;
  const shouldGoDashboard = organizations.length > 0 && params.orgId;

  if (shouldCreateOrg) {
    redirect("/organizations/create-organization");
  }

  if (shouldSelectOrg) {
    redirect("/organizations/select-organization");
  }

  if (shouldGoDashboard) {
    redirect(`/organization/${params.orgId}/home`);
  }
};
 
export default DashboardPage;
