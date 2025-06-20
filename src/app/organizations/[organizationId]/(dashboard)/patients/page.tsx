import { headers } from "next/headers";
import { redirect } from "next/navigation";

import PatientsView from "@dentist/module/patients/patients-view";
import { auth } from "@dentist/utils/auth";

const PatientsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <PatientsView />;
};
 
export default PatientsPage;
