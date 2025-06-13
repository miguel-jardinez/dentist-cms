import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ImagesView from "@dentist/module/images/ui/views/images-view";
import { auth } from "@dentist/utils/auth";

const ImagesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <ImagesView />;
};

export default ImagesPage;
