import { headers } from "next/headers";
import { redirect } from "next/navigation";

import MedicalRecordsView from "@dentist/module/medical-records/ui/views/medical-records-view";
import { auth } from "@dentist/utils/auth";

const MedicalRecorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <MedicalRecordsView />;
};

export default MedicalRecorsPage;
