import Link from "next/link";

import { Button } from "@dentist/components/ui/button";

export default function Home() {
  return (
    <Button asChild>
      <Link href="/auth/sign-in">Sign in</Link>
    </Button>
  );
}
