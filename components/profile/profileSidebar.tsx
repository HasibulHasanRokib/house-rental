import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import ProfileNavItems from "./profileNavItems";

export default async function ProfileSidebar() {
  const session = await auth();
  const isOwner = session?.user.role === "owner";

  return (
    <>
      <div className="flex w-64 flex-col justify-between border-r p-6 ">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Avatar>
              <AvatarImage src={session?.user.image || ""} alt="@shadcn" />
              <AvatarFallback>
                {session?.user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{session?.user.name}</p>
              <p className="text-xs text-gray-400">
                As a{" "}
                <span className="text-gray-800 font-semibold capitalize">
                  {session?.user.role}
                </span>
              </p>
            </div>
          </div>
          <ProfileNavItems isOwner={isOwner} />
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </form>
      </div>
    </>
  );
}
