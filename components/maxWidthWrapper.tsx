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
    <div
      className={cn(
        "mx-auto p-4 sm:p-6 md:p-8 lg:p-12 max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
