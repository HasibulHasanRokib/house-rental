import MaxWidthWrapper from "@/components/maxWidthWrapper";
import AddPropertyForm from "@/app/(pages)/(property)/_components/addPropertyForm";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function AddProperty() {
  const session = await auth();
  if (session?.user.role !== "owner") return notFound();
  return (
    <>
      <MaxWidthWrapper className="my-8">
        <AddPropertyForm />
      </MaxWidthWrapper>
    </>
  );
}
