"use client";

import Link from "next/link";

import { Button } from "@dentist/components/ui/button";

const LandingView = () => (
  <>
    <div className="mx-auto container">
      <Button asChild>
        <Link href="/auth/sign-in">Sign in</Link>
      </Button>
    </div>
  </>
);
 
export default LandingView;
