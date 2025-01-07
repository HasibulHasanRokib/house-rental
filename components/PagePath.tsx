import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  items: { name: string; href: string }[];
}

const PagePath = ({ items }: Props) => {
  return (
    <Breadcrumb className="flex items-center space-x-2 print:hidden">
      {items.map((item) => (
        <BreadcrumbList key={item.href}>
          <BreadcrumbItem>
            <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      ))}
    </Breadcrumb>
  );
};

export default PagePath;
