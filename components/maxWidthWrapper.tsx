import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function MaxWidthWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-7xl mx-auto p-4", className)}>{children}</div>
  );
}
