"use client";
import { Status } from "@prisma/client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { ChangePropertyStatus } from "@/app/admin/properties/action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

const LABEL_MAP: Record<keyof typeof Status, string> = {
  accepted: "Verified",
  booked: "Booked",
  pending: "Awaiting",
  rejected: "Rejected",
};

const StatusDropdown = ({
  id,
  propertyStatus,
}: {
  id: string;
  propertyStatus: Status;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationKey: ["change-property-status"],
    mutationFn: ChangePropertyStatus,
    onSuccess: (data) => {
      if (!data.success) {
        toast({
          variant: "destructive",
          description: data.error as string,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          variant: "default",
          description: data.success,
        });
        router.refresh();
      }
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className=" flex justify-between items-center"
          variant={"outline"}
        >
          {LABEL_MAP[propertyStatus]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(Status).map((status) => (
          <DropdownMenuItem
            key={status}
            className={cn(
              "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100"
            )}
            onClick={() => mutate({ id, newStatus: status })}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4 text-primary",
                propertyStatus === status ? "opacity-100" : "opacity-0"
              )}
            />
            {LABEL_MAP[status as Status]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdown;
