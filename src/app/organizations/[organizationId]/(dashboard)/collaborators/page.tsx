import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ColaboratorsView from "@dentist/module/colaborators/ui/views/colaborators-view";
import { auth } from "@dentist/utils/auth";

const ColaboratorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <ColaboratorsView />;
};
 
export default ColaboratorsPage;
