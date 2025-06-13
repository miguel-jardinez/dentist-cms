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

import { signInSchema, SignInSchemaType } from "../../schemas";

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = useCallback((data: SignInSchemaType) => {
    authClient.signIn.email({
      email: data.email,
      password: data.password
    }, {
      onRequest: () => {
        setIsLoading(true);
      },
      onSuccess: () => {
        setIsLoading(false);
        router.push("/organizations");
      },
      onError: ({ error }) => {
        setIsLoading(false);
        toast.error("Something wrong, please try again!", { description: error.message });
      }
    });
  }, [router]);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email..." type="email" />
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

        <Button disabled={isLoading} type="submit">
          Sign in
        </Button>
      </form>
    </Form>
  );
};
 
export default SignInForm;
