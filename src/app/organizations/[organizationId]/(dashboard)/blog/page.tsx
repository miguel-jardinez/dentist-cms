import { headers } from "next/headers";
import { redirect } from "next/navigation";

import BlogView from "@dentist/module/blog/ui/views/blog-view";
import { auth } from "@dentist/utils/auth";

const BlogPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <BlogView />;
};

export default BlogPage;
