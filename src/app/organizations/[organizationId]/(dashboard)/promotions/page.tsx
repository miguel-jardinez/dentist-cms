import { headers } from "next/headers";
import { redirect } from "next/navigation";

import PromotionsView from "@dentist/module/promotions/ui/views/promotions-view";
import { auth } from "@dentist/utils/auth";

const PromotionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <PromotionsView />;
};

export default PromotionsPage;
