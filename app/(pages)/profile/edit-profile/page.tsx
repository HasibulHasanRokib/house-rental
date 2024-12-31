import { auth } from "@/auth";
import EditProfileForm from "@/components/profile/EditProfileForm";
import db from "@/lib/db";

export default async function Page() {
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
      <div className="border-b py-3 space-y-2">
        <h2 className="font-semibold text-xl">Update your information</h2>
        <p className="text-sm text-muted-foreground">
          This is how you will update your information on the site.
        </p>
      </div>
      <EditProfileForm user={user} />
    </div>
  );
}
