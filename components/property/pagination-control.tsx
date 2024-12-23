import { PropertyFilterValue } from "@/lib/validation";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  filterValues: PropertyFilterValue;
}
export function Pagination({
  currentPage,
  totalPage,
  filterValues: {
    q,
    status,
    type,
    city,
    bedrooms,
    country,
    bathrooms,
    hasWoodenCeiling,
    hasParking,
    hasCentralHeating,
    hasAlarm,
    hasSwimmingPool,
    hasLaundryRoom,
  },
}: PaginationProps) {
  function generateLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(status && { status }),
      ...(type && { type }),
      ...(city && { city }),
      ...(bedrooms && { bedrooms }),
      ...(bathrooms && { bathrooms }),
      ...(hasWoodenCeiling && { hasWoodenCeiling: "true" }),
      ...(hasParking && { hasParking: "true" }),
      ...(hasCentralHeating && { hasCentralHeating: "true" }),
      ...(hasAlarm && { hasAlarm: "true" }),
      ...(hasSwimmingPool && { hasSwimmingPool: "true" }),
      ...(hasLaundryRoom && { hasLaundryRoom: "true" }),
      page: page.toString(),
      total_page: totalPage.toString(),
    });
    return `/properties?${searchParams.toString()}`;
  }
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Link
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs",
          currentPage === 1 && "pointer-events-none opacity-50"
        )}
        href={generateLink(currentPage - 1)}
      >
        Previous
      </Link>
      <p className="text-muted-foreground text-sm">
        Page {currentPage} of {totalPage}
      </p>
      <Link
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs",
          currentPage === totalPage && "pointer-events-none opacity-50"
        )}
        href={generateLink(currentPage + 1)}
      >
        Next
      </Link>
    </div>
  );
}
