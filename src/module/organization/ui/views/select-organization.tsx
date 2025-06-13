"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@dentist/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@dentist/components/ui/card";

import { Organizations } from "../../types";

type SelectOrganizationViewProps = {
  organizations: Organizations
};

const SelectOrganizationView = ({ organizations }: SelectOrganizationViewProps) => {
  const router = useRouter();

  const onOrgSelect = useCallback((orgId: string) => {
    router.push(`/organizations/${orgId}`);
  }, [router]);

  return (
    <Card className="min-w-2xl">
      <CardHeader>
        <CardTitle>Organization list</CardTitle>
        <CardDescription>
          List of organizations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {organizations.map((org) => (
          <Button variant="outline" className="w-full" onClick={() => onOrgSelect(org.id)} key={org.id}>
            {org.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
 
export default SelectOrganizationView;
