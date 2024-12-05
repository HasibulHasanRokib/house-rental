"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { UploadButton } from "@/lib/uploadthing";
import DefaultImage from "@/public/images/default.png";
import Image from "next/image";
import { editProfileSchema, TEditProfileSchema } from "@/lib/auth/validation";
import { updateProfileAction } from "@/actions/auth/updateProfileAction";
import FormSuccess from "../successMessage";
import FormError from "../errorMessage";

interface Props {
  user: {
    username: string | null;
    address: string | null;
    image: string | null;
    phoneNo: string | null;
    gender: string | null;
    id: string | undefined;
  } | null;
}

export default function EditProfileForm({ user }: Props) {
  const [file, setFile] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<TEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username || "",
      phone: user?.phoneNo || "",
      address: user?.address || "",
      id: user?.id,
    },
  });
  const submit = (values: TEditProfileSchema) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      await updateProfileAction(values).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  };
  return (
    <div className="py-4">
      <div className="flex items-center gap-3 my-6 justify-center">
        <Image
          className="w-20 h-20 object-cover rounded-full border-2"
          src={file || user?.image || ""}
          alt="image"
          width={80}
          height={80}
        />
        <UploadButton
          endpoint="profileImage"
          onClientUploadComplete={(res) => {
            setFile(res[0].url);
            form.setValue("image", res[0].url);
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-3"
                  >
                    <FormItem className="space-x-2">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <label>Male</label>
                    </FormItem>
                    <FormItem className="space-x-2">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <label>Female</label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}
          <Button disabled={isPending} type="submit">
            {isPending ? "Loading..." : "update"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
