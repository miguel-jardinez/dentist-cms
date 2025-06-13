import { headers } from "next/headers";
import { redirect } from "next/navigation";

import InvoicesView from "@dentist/module/invoices/ui/views/invoices-view";
import { auth } from "@dentist/utils/auth";

const InvoicesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <InvoicesView />;
};
 
export default InvoicesPage;
