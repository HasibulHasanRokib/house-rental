"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import { Property } from "@prisma/client";
import Image from "next/image";
import { DeletePropertyBtn } from "@/components/property/DeletePropertyBtn";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Property>[] = [
  {
    header: "Image",
    cell: ({ row }) => {
      const property = row.original;

      return (
        <img
          src={property.imagesUrl[0]}
          alt="image"
          height={80}
          className="rounded-sm w-20 h-16 object-cover"
        />
      );
    },
  },
  {
    header: "Property title",
    cell: ({ row }) => {
      const property = row.original;

      return (
        <div>
          <p className="truncate">{property.propertyTitle}</p>
          <p className="capitalize text-xs text-muted-foreground">
            {property.type}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "area",
    header: "Area(sqrt)",
  },
  {
    accessorKey: "rooms",
    header: "Rooms",
  },
  {
    accessorKey: "bedrooms",
    header: "Bed",
  },
  {
    accessorKey: "bathrooms",
    header: "Bath",
  },

  {
    accessorKey: "price",
    header: "Price",
  },

  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Create at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const property = row.original;

      return <p>{property.createdAt.toLocaleDateString()}</p>;
    },
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const property = row.original;

      return (
        <Badge
          variant={
            property.status === "pending"
              ? "secondary"
              : property.status === "accepted"
                ? "outline"
                : property.status === "rejected"
                  ? "destructive"
                  : "default"
          }
        >
          {property.status.toUpperCase()}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const property = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/properties/${property.slug}`}>
                View property details
              </Link>
            </DropdownMenuItem>

            {property.status !== "booked" && (
              <>
                <DropdownMenuItem>
                  <Link href={`/profile/update-property/${property.id}`}>
                    Edit property details
                  </Link>
                </DropdownMenuItem>
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <p className="flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent hover:bg-accent">
                        Delete property details
                      </p>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your property and remove property data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                          <DeletePropertyBtn property={property} />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
