"use client";

import { CreditCard, Users, Home, PieChart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: PieChart, label: "Overview", href: "/admin" },
  { icon: Users, label: "Owners ", href: "/admin/users/owners" },
  { icon: Users, label: "Tenants ", href: "/admin/users/tenants" },
  { icon: Home, label: "Properties", href: "/admin/properties" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
];

export default function AdminNavLink() {
  const pathName = usePathname();

  return (
    <nav>
      {navItems.map((item) => {
        const isActive =
          pathName === item.href ||
          (item.href !== "/admin" && pathName.startsWith(item.href));

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
    </nav>
  );
}
