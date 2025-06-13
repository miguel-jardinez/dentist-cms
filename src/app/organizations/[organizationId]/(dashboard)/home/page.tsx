import { headers } from "next/headers";
import { redirect } from "next/navigation";

import HomeView from "@dentist/module/home/ui/views/home-view";
import { auth } from "@dentist/utils/auth";

const HomePage = async () => {
  const session = auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <HomeView />;
};
 
export default HomePage;
