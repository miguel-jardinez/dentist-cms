import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AppointmentsView from "@dentist/module/appointments/ui/views/appointments-view";
import { auth } from "@dentist/utils/auth";

const AppointmentsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <AppointmentsView />;
};
 
export default AppointmentsPage;
