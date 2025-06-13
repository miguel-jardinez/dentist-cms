"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { toast } from "sonner";

import { Button } from "@dentist/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@dentist/components/ui/form";
import { Input } from "@dentist/components/ui/input";
import { authClient } from "@dentist/utils/auth-client";

import { createOrganizationSchema, CreateOrganizationSchemaType } from "../../schemas";

type CreateOrganizationFormProps = {
  userId: string;
};

const CreateOrganizationForm = ({ userId } : CreateOrganizationFormProps) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<CreateOrganizationSchemaType>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      slug: ""
    }
  });

  const onCreateOrg = useCallback(async (data: CreateOrganizationSchemaType) => {
    await authClient.organization.create({
      name: data.name,
      slug: data.slug,
      userId
    }, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: ({ data }) => {
        setLoading(false);
        router.push(`${data.id}`);
      },
      onError: ({ error }) => {
        setLoading(false);
        toast.error("Something wrong try again!", { description: error.message });
      }
    });
  }, [userId, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreateOrg)} className="space-y-3">
        <FormField 
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name of organization" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          name="slug"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={e => field.onChange(slugify(e.target.value, { replacement: "-", lower: true }))}
                  placeholder="my-new-organization"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            Create Org
          </Button>
        </div>
      </form>
    </Form>
  );
};
 
export default CreateOrganizationForm;
