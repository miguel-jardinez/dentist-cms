import { HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ReviewsView from "@dentist/module/reviews/ui/views/reviews-view";
import { getQueryClient, trpc } from "@dentist/trpc/server";
import { auth } from "@dentist/utils/auth";

const ReviewsPage = async () => {
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
      <HydrationBoundary state={queryClient}>
        <ReviewsView />
      </HydrationBoundary>
    </>
  );
};

export default ReviewsPage;
