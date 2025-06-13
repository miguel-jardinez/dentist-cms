"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@dentist/components/ui/card";

import CreateOrganizationForm from "../components/create-organization-form";

type OrganizationViewProps = {
  userId: string;
};

const OrganizationView = ({ userId } : OrganizationViewProps) => (
  <Card className="min-w-2xl">
    <CardHeader>
      <CardTitle>Create a new organization</CardTitle>
      <CardDescription>
        Create new organization to handle your custommers in a better way
      </CardDescription>
    </CardHeader>
    <CardContent>
      <CreateOrganizationForm userId={userId} />
    </CardContent>
  </Card>
);
 
export default OrganizationView;
