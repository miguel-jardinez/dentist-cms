import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SettingsView from "@dentist/module/settings/ui/views/settings-view";
import { auth } from "@dentist/utils/auth";

const SettingsPage = async () => {
  const session = await  auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <SettingsView />;
};
 
export default SettingsPage;
