import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import ProfileNavLink from "./ProfileNavLink";
import UserAvatar from "../UserAvatar";

export default async function ProfileSideBar() {
  const session = await auth();
  const isOwner = session?.user.role === "owner";

  return (
    <>
      <div className="flex w-12 md:w-64 flex-col justify-between border-r md:p-6 ">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            {/* <UserAvatar name={session?.user.name} /> */}
            <div className="hidden md:block">
              <p className="font-medium capitalize">{session?.user.name}</p>
              <p className="text-xs text-gray-400">
                As a{" "}
                <span className="text-gray-800 font-semibold capitalize">
                  {session?.user.role}
                </span>
              </p>
            </div>
          </div>
          <ProfileNavLink isOwner={isOwner} />
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button
            variant="ghost"
            className="w-full justify-start hidden md:flex"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="hidden md:block">Sign out</span>
          </Button>
        </form>
      </div>
    </>
  );
}
