import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@dentist/components/ui/card";

const AddMembersView = () => (
  <Card className="min-w-2xl">
    <CardHeader>
      <CardTitle>Add a new member on your organization</CardTitle>
      <CardDescription>All member will be tied to this organization</CardDescription>
    </CardHeader>

    <CardContent>
      Form
    </CardContent>

    <CardFooter>
      <CardAction>
        Skip
      </CardAction>
    </CardFooter>
  </Card>
);
 
export default AddMembersView;
