import { headers } from "next/headers";
import { redirect } from "next/navigation";

import RolesView from "@dentist/module/roles/ui/views/roles-view";
import { auth } from "@dentist/utils/auth";

const RolesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <RolesView />;
};

export default RolesPage;
