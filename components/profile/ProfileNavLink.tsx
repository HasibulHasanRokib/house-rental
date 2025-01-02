"use client";

import {
  User,
  Edit,
  Mail,
  Users,
  Home,
  CirclePlus,
  PieChart,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Edit, label: "Edit profile", href: "/profile/edit-profile" },
];
const ownerNavItems = [
  { icon: PieChart, label: "Overview", href: "/profile/overview" },
  { icon: Home, label: "My properties", href: "/profile/my-properties" },
  { icon: CirclePlus, label: "Add property", href: "/profile/add-property" },
];

export default function ProfileNavLink({ isOwner }: { isOwner: boolean }) {
  const pathName = usePathname();

  const combinedNavItems = [...navItems, ...(isOwner ? ownerNavItems : [])];

  return (
    <nav>
      {combinedNavItems.map((item) => {
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
              <span>{item.label}</span>
            </Button>
          </Link>
        );
      })}
      {!isOwner && (
        <Link href="/profile/my-booking">
          <Button
            variant="ghost"
            className={`w-full justify-start mb-2 ${
              pathName === "/profile/my-booking"
                ? "bg-accent text-accent-foreground"
                : ""
            }`}
          >
            <Home className="mr-2 h-4 w-4" />
            <span>My Booking</span>
          </Button>
        </Link>
      )}
    </nav>
  );
}
