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
import { propertyTypes } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback, useState, useTransition } from "react";
import { addingPropertyAction } from "@/actions/property/addPropertyAction";
import { X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import LoadingAnimate from "../LoadingAnimate";
import { User } from "@prisma/client";

interface Props {
  user: {
    username: string;
    email: string;
    phoneNo: string | null;
  };
}
type FileWithPreview = File & { preview: string };

export default function AddPropertyForm({ user }: Props) {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<TAddingPropertySchema>({
    resolver: zodResolver(AddingPropertySchema),
    defaultValues: {
      hasAlarm: false,
      hasCentralHeating: false,
      hasLaundryRoom: false,
      hasParking: false,
      hasSwimmingPool: false,
      hasWoodenCeiling: false,
      imagesUrl: [],
      propertyTitle: "",
      address: "",
      city: "",
      country: "",
      contactEmail: user.email,
      contactName: user.username,
      contactPhone: user.phoneNo!,
      details: "",
    },
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
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
  });

  const submit = async (values: TAddingPropertySchema) => {
    setError("");
    setSuccess("");
    try {
      if (!files.length) {
        setError("Please upload at least one image.");
        return;
      }

      const uploadData = await startUpload(files);
      if (!uploadData) {
        setError("Image upload failed. Please try again.");
        return;
      }

      const imageUrls = uploadData.map((item) => item.url);
      form.setValue("imagesUrl", imageUrls);

      const updateValues = { ...values, imagesUrl: imageUrls };

      startTransition(async () => {
        await addingPropertyAction(updateValues).then((data) => {
          if (data.success) {
            setFiles([]);
            form.reset();
            setSuccess(data?.success);
            router.push("/profile/my-properties");
          }

          setError(data?.error);
        });
      });
    } catch (err) {
      setError("Submission failed. Please try again.");
    }
  };

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          {/* Overview */}

          <FormField
            control={form.control}
            name="propertyTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Property title<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your property title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Type<span className="text-red-500">*</span>
                  </FormLabel>
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
            <FormField
              control={form.control}
              name="buildingAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Building Age</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your building age"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d,]/g, "");
                        field.onChange(
                          parseFloat(value.replace(/,/g, "")) || ""
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Property Details */}
          <div className="space-y-3">
            <h2 className="font-semibold text-2xl">Property Details</h2>

            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Size in ft<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex:3,200"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^\d,]/g, "");
                          field.onChange(
                            parseFloat(value.replace(/,/g, "")) || ""
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Total rooms<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
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
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bedrooms<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
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
                    <FormLabel>
                      Bathrooms<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
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
                  <FormLabel>
                    Description<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your text" {...field} />
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
                  <p className="text-2xl">
                    Upload Image<span className="text-red-500">*</span>
                  </p>
                </FormLabel>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className="border-2 h-24 border-dotted flex justify-center items-center rounded-md p-4 bg-slate-50"
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
          <ul className="flex gap-2">
            {files &&
              files.map((file) => (
                <li key={file.name} className="relative">
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={150}
                    height={150}
                    className=" object-cover rounded-md max-h-[150px] w-full"
                    onLoad={() => URL.revokeObjectURL(file.preview)}
                  />
                  <div className="absolute top-0 right-0 p-2">
                    <button
                      type="button"
                      className=" flex justify-center items-center p-1 rounded-full h-7 w-7 bg-white border"
                      onClick={() => removeFile(file.name)}
                    >
                      <X />
                    </button>
                  </div>
                </li>
              ))}
          </ul>

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
            <h2 className="font-semibold text-2xl">Address & Location</h2>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Address<span className="text-red-500">*</span>
                  </FormLabel>
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
                    <FormLabel>
                      City<span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Country<span className="text-red-500">*</span>
                    </FormLabel>
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
            <h2 className="font-semibold text-2xl">Owner Information</h2>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Contact Name<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John dev" {...field} />
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
                    <FormLabel>
                      Contact Email<span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Contact Phone<span className="text-red-500">*</span>
                    </FormLabel>
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
                <FormLabel>
                  Price<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d,]/g, "");
                      field.onChange(parseFloat(value.replace(/,/g, "")) || "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button type="submit" disabled={isPending || isUploading}>
            {isUploading ? <LoadingAnimate text="Adding" /> : "Submit"}
          </Button>
          {error && <ErrorMessage message={error} />}
          {success && <SuccessMessage message={success} />}
        </form>
      </Form>
    </>
  );
}
