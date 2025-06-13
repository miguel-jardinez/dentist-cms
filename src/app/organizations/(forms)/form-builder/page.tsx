import { headers } from "next/headers";
import { redirect } from "next/navigation";

import FormBuilderView from "@dentist/module/forms/ui/views/form-builder-view";
import { auth } from "@dentist/utils/auth";

const FormBuilder = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <FormBuilderView />;
};

export default FormBuilder;
