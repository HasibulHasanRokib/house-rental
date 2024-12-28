import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth } from "@/auth";
import db from "@/lib/db";

export default async function Page() {
  const session = await auth();
  const user = await db.user.findUnique({
    where: { id: session?.user.id },
  });

  return (
    <div className="p-6">
      <div>
        <h2>Personal Information</h2>
        <div>
          <div className="mt-6 space-y-2">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input disabled value={user?.username} />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input disabled value={user?.email} />
            </div>

            <div className="grid gap-2">
              <Label>Address</Label>
              <Input disabled value={user?.address || ""} />
            </div>
            <div className="grid gap-2">
              <Label>Gender</Label>
              <Input disabled value={user?.gender || ""} />
            </div>
            <div className="grid gap-2">
              <Label>Occupation</Label>
              <Input disabled value={user?.occupation || ""} />
            </div>
            <div className="grid gap-2">
              <Label>Contact number</Label>
              <Input disabled value={user?.phoneNo || ""} />
            </div>
            <div className="grid gap-2">
              <Label>Join at</Label>
              <Input disabled value={user?.createdAt.toDateString()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
