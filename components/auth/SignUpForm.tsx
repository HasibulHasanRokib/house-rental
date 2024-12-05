"use client";

import { registerSchema, TRegisterSchema } from "@/lib/auth/validation";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

export default function SignUpForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [title, setTitle] = useState<boolean>(false);

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userRole: "tenant",
    },
  });

  const [isPending, startTransition] = useTransition();
  const submit = (values: TRegisterSchema) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      registerAction(values).then((data) => {
        setSuccess(data?.success);
        setError(data.error);
        form.reset();
      });
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div>
        <h2 className="font-bold text-4xl my-10 text-center">
          Sign Up as an {title ? "Owner" : "Tenant"}
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <FormField
            control={form.control}
            name="userRole"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2"
                  >
                    <FormItem className="border p-4 space-x-2 rounded-md has-[:checked]:bg-slate-50">
                      <FormControl>
                        <RadioGroupItem
                          value="tenant"
                          onClick={() => setTitle(false)}
                        />
                      </FormControl>
                      <label>I am a tenant, looking for property</label>
                    </FormItem>
                    <FormItem className="border p-4 space-x-2 rounded-md has-[:checked]:bg-slate-50">
                      <FormControl>
                        <RadioGroupItem
                          value="owner"
                          onClick={() => setTitle(true)}
                        />
                      </FormControl>
                      <label>I own a house, available for rent or sale.</label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon dev" {...field} />
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
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon dev" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
            {isPending ? "Loading..." : "Create my account"}
          </Button>
        </form>
      </Form>
      <div className="">
        <h5 className="text-sm">
          Already have an account.
          <Link href={"/auth/login"} className="underline font-semibold">
            Login
          </Link>
        </h5>
      </div>
    </div>
  );
}
