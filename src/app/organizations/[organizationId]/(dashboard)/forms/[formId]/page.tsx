import { headers } from "next/headers";
import { redirect } from "next/navigation";

import FormIdView from "@dentist/module/forms/ui/views/form-id-view";
import { auth } from "@dentist/utils/auth";

const FormIdPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <FormIdView />;
};
 
export default FormIdPage;
