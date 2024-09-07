"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(8, { message: "Invalid email" })
    .max(50)
    .includes("@", { message: "Invalid email" }),
  password: z.string().min(8, { message: "Password is too short" }).max(50),
});

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.error) setError(res?.error);
    else router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-[-10px]">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage children={error} />
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
                <Input
                  {...field}
                  className="auth-input-width"
                  type="password"
                />
              </FormControl>
              <FormMessage children={error} />
            </FormItem>
          )}
        />
        <Button type="submit" className="auth-input-width">
          Submit
        </Button>
      </form>
    </Form>
  );
}
