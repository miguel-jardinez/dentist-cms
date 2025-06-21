"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@dentist/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@dentist/components/ui/form";
import { Input } from "@dentist/components/ui/input";
import { collaboratorSchema, CollaboratorSchemaType } from "@dentist/module/colaborators/schemas";
import { authClient } from "@dentist/utils/auth-client";

type CollaboratorFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

const CollaboratorForm = ({ onSuccess, onCancel } : CollaboratorFormProps) => {
  const searchParams = useParams<{ organizationId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<CollaboratorSchemaType>({
    resolver: zodResolver(collaboratorSchema),
    defaultValues: {
      email: "",
      role: "member",
      organizationId: searchParams.organizationId
    }
  });

  const onSubmit = (data: CollaboratorSchemaType) => {
    authClient.organization.inviteMember({
      email: data.email,
      role: data.role,
      organizationId: data.organizationId
    }, {
      onError: () => {
        setIsLoading(false);
        toast.error("Failed to invite collaborator");
        form.reset();
      },
      onSuccess: () => {
        toast.success("Collaborator invited successfully");
        form.reset();
        onSuccess();
      },
      onRequest: () => {
        setIsLoading(true);
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" disabled={isLoading} onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Inviting..." : "Add Collaborator"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CollaboratorForm;
