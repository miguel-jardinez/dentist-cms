"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import InputPassword from "@dentist/components/input-password";
import { Button } from "@dentist/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@dentist/components/ui/form";
import { Input } from "@dentist/components/ui/input";
import { authClient } from "@dentist/utils/auth-client";

import { signUpSchema, SignUpSchemaType } from "../../schemas";

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: ""
    }
  });

  const onSubmit = useCallback((data: SignUpSchemaType) => {
    authClient.signUp.email({
      name: `${data.name} ${data.lastName}`,
      email: data.email,
      password: data.password
    }, {
      onRequest: () => {
        setIsLoading(true);
      },
      onSuccess: () => {
        setIsLoading(false);
        router.push("/dashboard");
      },
      onError: ({ error }) => {
        toast.error("Something wrong please try again", { description: error.message });
        setIsLoading(false);
      }
    });
  }, [router]);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField 
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Last Name" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword {...field} placeholder="*************" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <InputPassword {...field} placeholder="*************" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
 
export default SignUpForm;
