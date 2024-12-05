import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  propertyImages: f({ image: { maxFileSize: "2MB", maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.user.id };
    })
    .onUploadComplete(async ({ file }) => {}),
  profileImage: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.user.id };
    })
    .onUploadComplete(async ({ file }) => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
