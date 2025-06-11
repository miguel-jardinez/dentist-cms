"use client";

import { useCallback } from "react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@dentist/components/ui/button";
import { authClient } from "@dentist/utils/auth-client";

const DashboardView = () => {
  const onSignOut = useCallback(() => {
    authClient.signOut({}, {
      onSuccess: () => {
        redirect("/auth/sign-in");
      },
      onError: ({ error }) => {
        toast.error("Error to sign out", { description: error.message });
      }
    });
  }, []);

  return (
    <div>
      <Button onClick={onSignOut}>Sign out</Button>
    </div>
  );
};
 
export default DashboardView;
