import { headers } from "next/headers";
import { redirect } from "next/navigation";

import ReviewsView from "@dentist/module/reviews/ui/views/reviews-view";
import { auth } from "@dentist/utils/auth";

const ReviewsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <ReviewsView />;
};
 
export default ReviewsPage;
