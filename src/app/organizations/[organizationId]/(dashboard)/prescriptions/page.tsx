import { headers } from "next/headers";
import { redirect } from "next/navigation";

import PrescriptionsView from "@dentist/module/prescriptions/ui/views/prescriptions-view";
import { auth } from "@dentist/utils/auth";

const PrescriptionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <PrescriptionsView />;
};

export default PrescriptionsPage;
