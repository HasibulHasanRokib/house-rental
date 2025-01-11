/* eslint-disable @next/next/no-img-element */
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
import { UploadButton } from "@/lib/uploadthing";
import { User } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

export default function EditProfileForm({ user }: { user: User }) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [newAvatar, setNewAvatar] = useState<string | null>(user.image);
  const router = useRouter();
  const { toast } = useToast();

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
          router.refresh();
        }
        setError(data?.error);
      });
    });
  };

  return (
    <div>
      <div className="flex  items-center space-x-2 my-5">
        {newAvatar && (
          <img
            src={newAvatar}
            alt="Avatar"
            className="h-16 w-16 rounded-full object-cover"
          />
        )}
        <UploadButton
          className="h-8 text-sm 
          ut-button:bg-white 
          ut-button:ut-uploading:bg-gray-700
           ut-button:ut-uploading:text-white
          ut-button:ut-readying:bg-gray-700
          ut-button:ring-slate-700
          ut-button:text-gray-800  
          ut-button:border 
          ut-button:border-slate-300
          ut-allowed-content:hidden"
          endpoint="profileImage"
          onClientUploadComplete={(res) => {
            const newImage = res[0].url;
            setNewAvatar(newImage);
            form.setValue("image", newImage);
          }}
          onUploadError={(error: Error) => {
            toast({
              title: error.message,
              description: "Uploading failed!",
            });
          }}
        />
      </div>

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
