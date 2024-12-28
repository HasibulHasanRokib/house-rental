import { auth } from "@/auth";
import AddPropertyForm from "@/components/property/AddPropertyForm";
import { notFound } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session?.user.role !== "owner") return notFound();
  return (
    <>
      <div className="p-4">
        <AddPropertyForm />
      </div>
    </>
  );
}
