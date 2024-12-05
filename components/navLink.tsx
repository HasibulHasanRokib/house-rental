"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

export default function NavLink() {
  const pathName = usePathname();
  return (
    <>
      {navLinks.map((link) => {
        const isActive =
          pathName === link.href ||
          (link.href !== "/" && pathName.startsWith(link.href));
        return (
          <Link
            className={isActive ? "font-bold text-primary" : "text-gray-700"}
            key={link.name}
            href={link.href}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
