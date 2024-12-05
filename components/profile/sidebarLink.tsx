"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { name: "My account", href: "/profile" },
  { name: "Edit account", href: "/profile/edit-profile" },
  { name: "My property", href: "/profile/my-property" },
] as const;

const SidebarLink = () => {
  const pathName = usePathname();
  return (
    <ul className="">
      {sidebarLinks.map((link) => {
        const isActive =
          pathName === link.href ||
          (link.href !== "/profile" && pathName.startsWith(link.href));
        return (
          <li key={link.name} className="border-y p-2 hover:bg-slate-50">
            <Link
              className={
                isActive ? " text-primary" : "text-gray-700 font-normal text-sm"
              }
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarLink;
