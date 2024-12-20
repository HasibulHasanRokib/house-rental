"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface PaginationControlProps {
  totalPage: number;
}

export function PaginationControl({ totalPage }: PaginationControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("per_page") || 5;
  return (
    <div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            router.push(
              `/properties?page=${Number(page) - 1}&per_page=${perPage}`
            )
          }
          disabled={Number(page) === 1}
        >
          Previous
        </Button>
        <p className="text-muted-foreground text-sm">
          Page {page} of {totalPage}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            router.push(
              `/properties?page=${Number(page) + 1}&per_page=${perPage}`
            )
          }
          disabled={Number(page) === totalPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
