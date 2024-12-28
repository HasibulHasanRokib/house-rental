import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function AddProperty() {
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
