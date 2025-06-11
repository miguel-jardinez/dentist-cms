import { headers } from "next/headers";
import { redirect } from "next/navigation";

import DashboardView from "@dentist/module/dashboard/ui/view/dashboard-view";
import { auth } from "@dentist/utils/auth";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      {JSON.stringify(session, null, 2)}
      <DashboardView />
    </div>
  );
};
 
export default DashboardPage;
