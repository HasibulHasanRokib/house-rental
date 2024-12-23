"use client";

import {
  User,
  Edit,
  LogOut,
  Mail,
  Users,
  Home,
  CirclePlus,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Edit, label: "Edit profile", href: "/profile/edit-profile" },
  { icon: Mail, label: "Message", href: "/profile/message" },
];
const ownerNavItems = [
  { icon: Home, label: "My properties", href: "/profile/my-properties" },
  { icon: CirclePlus, label: "Add property", href: "/profile/add-property" },
  { icon: Users, label: "My tenants", href: "/profile/my-tenants" },
];

export default function ProfileNavItems({ isOwner }: { isOwner: boolean }) {
  const pathName = usePathname();
  return (
    <nav>
      {[...navItems, ...(isOwner ? ownerNavItems : [])].map((item) => {
        const isActive =
          pathName === item.href ||
          (item.href !== "/profile" && pathName.startsWith(item.href));
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={`w-full justify-start mb-2 ${
                isActive ? "bg-accent text-accent-foreground" : ""
              }`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
