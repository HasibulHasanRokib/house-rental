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
import { useState } from "react";
import { Input } from "../ui/input";
import { registerAction } from "@/actions/auth/registerAction";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import ImageOne from "@/public/images/properties-1.jpg";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import { useMutation } from "@tanstack/react-query";

export default function SignUpForm() {
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

  const { mutate, isPending, data, isSuccess } = useMutation({
    mutationFn: registerAction,
    onSuccess: (res) => {
      if (res.success) {
        form.reset();
      }
    },
  });

  const submit = (values: TRegisterSchema) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="relative hidden bg-gray-500 md:block p-2">
            <Image
              src={ImageOne}
              alt="Image"
              fill
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale "
            />
          </div>
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(submit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    <span className="text-balance text-gray-700">
                      Register as an{" "}
                    </span>
                    <span className="font-bold text-primary">
                      {title ? "Owner" : "Tenant"}
                    </span>
                  </h1>
                </div>
                <FormField
                  control={form.control}
                  name="userRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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
                            <label>
                              I own a house, available for rent or sale.
                            </label>
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
                          <Input placeholder="John " {...field} />
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
                          <Input placeholder="Deo" {...field} />
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
                        <Input
                          type="email"
                          placeholder="ex@emaple.com"
                          {...field}
                        />
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

                <Button disabled={isPending} type="submit" className="w-full">
                  {isPending ? "Loading..." : "Login"}
                </Button>
                {data?.error && <ErrorMessage message={data.error} />}
                {isSuccess && data?.success && (
                  <SuccessMessage message={data.success} />
                )}

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="hover:underline underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
