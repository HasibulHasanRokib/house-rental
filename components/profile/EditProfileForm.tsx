"use client";
import { updateProfileAction } from "@/actions/auth/updateProfileAction";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { editProfileSchema, TEditProfileSchema } from "@/lib/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import LoadingAnimate from "../LoadingAnimate";
import { useRouter } from "next/navigation";

interface EditFormProps {
  user: {
    address: string | null;
    username: string;
    occupation: string | null;
    phoneNo: string | null;
    gender: string | null;
    id: string;
  } | null;
}
export default function EditProfileForm({ user }: EditFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter();

  const form = useForm<TEditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: user?.username,
      address: user?.address || "",
      occupation: user?.occupation || "",
      phone: user?.phoneNo || "",
      id: user?.id,
      gender: user?.gender as "Male" | "Female" | undefined,
    },
  });

  const [isPending, startTransition] = useTransition();
  const submit = (values: TEditProfileSchema) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      await updateProfileAction(values).then((data) => {
        if (data.success) {
          setSuccess(data?.success);
          router.push("/profile");
        }
        setError(data?.error);
      });
    });
  };

  return (
    <div className="py-4">
      <Form {...form}>
        <form className="space-y-4 " onSubmit={form.handleSubmit(submit)}>
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
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex  space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
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
          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}
          <Button disabled={isPending} type="submit">
            {isPending ? <LoadingAnimate text="Updating" /> : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
