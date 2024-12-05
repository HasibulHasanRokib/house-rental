"use client";

import {
  logInSchema,
  registerSchema,
  TLoginSchema,
  TRegisterSchema,
} from "@/lib/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { registerAction } from "@/actions/auth/registerAction";
import FormError from "../errorMessage";
import FormSuccess from "../successMessage";
import Link from "next/link";
import { loginAction } from "@/actions/auth/loginAction";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const submit = (values: TLoginSchema) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      await loginAction(values).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="ex@emaple.com" {...field} />
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
                  <Input type="password" placeholder="****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button className="rounded-lg py-5 w-full" disabled={isPending}>
            {isPending ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
      <div>
        <h5 className="text-sm">
          Don`t have any account.
          <Link href={"/auth/signup"} className="underline font-semibold">
            Signup
          </Link>
        </h5>
      </div>
    </div>
  );
}
