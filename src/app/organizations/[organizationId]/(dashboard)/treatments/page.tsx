import { headers } from "next/headers";
import { redirect } from "next/navigation";

import TreatmentsView from "@dentist/module/treatments/ui/views/treatments-view";
import { auth } from "@dentist/utils/auth";

const TreatmentsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <TreatmentsView />;
};
 
export default TreatmentsPage;
