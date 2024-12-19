import { User, Edit, LogOut, Mail, Users, Home } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

const navItems = [
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Edit, label: "Edit profile", href: "/profile/edit-profile" },
  { icon: Home, label: "Properties", href: "/all-properties" },
  { icon: Users, label: "Tenants", href: "/all-properties" },
  { icon: Mail, label: "Message", href: "/all-properties" },
];
export default async function ProfileSidebar() {
  const session = await auth();

  return (
    <>
      <div className="flex w-64 flex-col justify-between border-r p-4 ">
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
              <p className="text-xs text-gray-400">{session?.user.email}</p>
            </div>
          </div>
          <nav>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="w-full justify-start mb-2">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
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
