"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddingPropertySchema, TAddingPropertySchema } from "@/lib/validation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { propertyStatus, propertyTypes } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback, useEffect, useState, useTransition } from "react";
import { addingProperty } from "@/actions/property/addProperty";
import { X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import FormError from "@/components/errorMessage";
import FormSuccess from "@/components/successMessage";

interface UpdatePropertyFormProps {
  defaultValues: {
    id: string;
    propertyTitle: string;
    status: string;
    type: string;
    area: number;
    rooms: number;
    price: number;
    bathrooms: number;
    imagesUrl: string[];
    address: string;
    city: string;
    country: string;
    details: string;
    buildingAge: number | null;
    bedrooms: number;
    hasParking: boolean;
    hasSwimmingPool: boolean;
    hasLaundryRoom: boolean;
    hasWoodenCeiling: boolean;
    hasCentralHeating: boolean;
    hasAlarm: boolean;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  };
}

export function UpdatePropertyForm({ defaultValues }: UpdatePropertyFormProps) {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(AddingPropertySchema),
    defaultValues,
  });

  const { startUpload, isUploading } = useUploadThing("propertyImages", {
    onClientUploadComplete: (data) => {
      console.log("Upload complete:", data);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
  });

  const submit = async (values: TAddingPropertySchema) => {
    console.log(values);
  };

  const removeFile = (name: string) => {};

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          {/* Overview */}
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">Update property details </h2>
            <FormField
              control={form.control}
              name="propertyTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property title</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyStatus.map((data) => (
                            <SelectItem key={data.value} value={data.value}>
                              {data.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue="">
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((data) => (
                            <SelectItem key={data.value} value={data.value}>
                              {data.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">
              Property Details <span className="text-sm">(required)</span>
            </h2>

            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size in ft*</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex:3,200sqft" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Building Age <span className="text-sm">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total rooms</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue=""
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((data) => (
                            <SelectItem key={data} value={data.toString()}>
                              {data}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue=""
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((data) => (
                            <SelectItem key={data} value={data.toString()}>
                              {data}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue=""
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((data) => (
                            <SelectItem key={data} value={data.toString()}>
                              {data}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Images */}
          <FormField
            control={form.control}
            name="imagesUrl"
            render={() => (
              <FormItem>
                <FormLabel>
                  <p className="text-2xl">Upload Image</p>
                </FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className="border-2 h-24 border-dotted flex justify-center items-center rounded-md p-4"
                  >
                    <input {...getInputProps()} accept="image/*" />
                    {isDragActive
                      ? "Drop the files here..."
                      : isUploading
                      ? `Uploading :${uploadProgress}%`
                      : "Drag & drop files here, or click to select"}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ul className="flex gap-2"></ul>

          {/*  Select Amenities */}
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">
              Select Amenities <span className="text-sm">(optional)</span>
            </h2>
            <div className="grid grid-cols-3 gap-4 py-4">
              <FormField
                control={form.control}
                name="hasAlarm"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Alarm</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasCentralHeating"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Central Heating</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasParking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Parking</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasLaundryRoom"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Laundry Room</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasSwimmingPool"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Swimming Pool</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasWoodenCeiling"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Wooden Ceiling</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Address & Location */}
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">
              Address & Location <span className="text-sm">(required)</span>
            </h2>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Owner Information */}
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">
              Owner Information <span className="text-sm">(required)</span>
            </h2>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhon dev" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ex@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button type="submit" disabled={isPending || isUploading}>
            {isUploading ? "Uploading..." : "Submit"}
          </Button>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </form>
      </Form>
    </div>
  );
}
