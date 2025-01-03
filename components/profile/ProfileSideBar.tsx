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

export default async function ProfileSideBar() {
  const session = await auth();
  const isOwner = session?.user.role === "owner";

  return (
    <Card className="max-w-xs flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{session?.user.name}</CardTitle>
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