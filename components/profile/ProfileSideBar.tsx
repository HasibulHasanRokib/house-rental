import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import ProfileNavLink from "./ProfileNavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import db from "@/lib/db";

export default async function ProfileSideBar() {
  const session = await auth();
  const isOwner = session?.user.role === "owner";
  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
    select: {
      image: true,
      username: true,
    },
  });

  return (
    <Card className="max-w-xs flex flex-col print:hidden">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            {user?.image && <AvatarImage src={user?.image} />}
            <AvatarFallback>
              {user?.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="capitalize">{session?.user.name}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              As an <span className="capitalize">{session?.user.role}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ProfileNavLink isOwner={isOwner} />
      </CardContent>
      <CardFooter className="flex justify-center items-center w-full">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant={"ghost"}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
