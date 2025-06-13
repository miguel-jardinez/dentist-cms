import { headers } from "next/headers";
import { redirect } from "next/navigation";

import InventoryView from "@dentist/module/inventory/ui/views/inventory-view";
import { auth } from "@dentist/utils/auth";

const InventoryPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <InventoryView />;
};

export default InventoryPage;
