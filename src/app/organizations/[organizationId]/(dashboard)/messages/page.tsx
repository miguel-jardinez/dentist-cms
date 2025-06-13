import { headers } from "next/headers";
import { redirect } from "next/navigation";

import MessagesView from "@dentist/module/messages/ui/views/messages-view";
import { auth } from "@dentist/utils/auth";

const MessagesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <MessagesView />;
};

export default MessagesPage;
