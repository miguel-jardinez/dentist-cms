"use client";

import Link from "next/link";

import { Button } from "@dentist/components/ui/button";

import SignInForm from "../components/sign-in-form";

const SignInView = () => (
  <>
    <div className="mx-auto container">
      <SignInForm />
      <div>Sign In view</div>

      <Button asChild>
        <Link href="/">Home</Link>
      </Button>

      <Button asChild>
        <Link href="sign-up">Sign up</Link>
      </Button>

      <Button asChild>
        <Link href="forget-password">Forget password</Link>
      </Button>

      <Button asChild>
        <Link href="change-password">Change password</Link>
      </Button>

      <Button asChild>
        <Link href="confirm-email">Confirm email</Link>
      </Button>

      <Button asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </div>
  </>
);
 
export default SignInView;
