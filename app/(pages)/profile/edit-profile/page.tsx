import { auth } from "@/auth";
import EditForm from "./EditForm";
import db from "@/lib/db";

export default async function page() {
  const session = await auth();
  const user = await db.user.findUnique({
    where: { id: session?.user.id },
    select: {
      address: true,
      username: true,
      occupation: true,
      phoneNo: true,
      gender: true,
      id: true,
    },
  });
  return (
    <div className="p-6">
      <h2>Update Personal Information</h2>
      <EditForm user={user} />
    </div>
  );
}
