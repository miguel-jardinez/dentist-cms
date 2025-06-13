import { headers } from "next/headers";
import { redirect } from "next/navigation";

import NotificationsView from "@dentist/module/notifications/ui/views/notifications-view";
import { auth } from "@dentist/utils/auth";
  
const NotificationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <NotificationsView />;
};

export default NotificationsPage;
