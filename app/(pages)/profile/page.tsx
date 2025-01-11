import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth } from "@/auth";
import db from "@/lib/db";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ErrorMessage from "@/components/ErrorMessage";

export default async function Page() {
  const session = await auth();

  const user = await db.user.findUnique({
    where: { id: session?.user.id },
  });

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">My Profile</CardTitle>
        <CardDescription>
          This is how others will see you on the site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user && user.completed ? (
          ""
        ) : (
          <ErrorMessage message="Complete profile required" />
        )}
        {user && <EditProfileForm user={user} />}
      </CardContent>
    </>
  );
}
