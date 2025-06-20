import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import FormView from "@dentist/module/forms/ui/views/form-view";
import { getQueryClient, trpc } from "@dentist/trpc/server";
import { auth } from "@dentist/utils/auth";
import FormListHeader from "@dentist/module/forms/ui/components/form-list-header";

const FormsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.forms.getMany.queryOptions());
  
  return (
    <>
      <FormListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <FormView />
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default FormsPage;
