import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { formatMoney } from "@/lib/utils";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Booking Property",
  description: "Generated by create next app",
};

async function Page() {
  const session = await auth();
  const bookedList = await db.rent.findMany({
    where: {
      userId: session?.user.id,
      property: {
        status: "booked",
      },
    },
    include: {
      user: true,
      property: {
        include: {
          User: true,
        },
      },
    },
  });

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">My booked property list</CardTitle>
        <CardDescription>
          This is how you will see your all activity on the site.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="min-w-full">
          <TableCaption>My property list</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Owner info</TableHead>
              <TableHead>Phone no.</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Payment id</TableHead>

              <TableHead>Paid amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookedList.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <span className="capitalize">
                      {data.property?.User?.username}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {data.property?.User?.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{data.property?.User?.phoneNo}</TableCell>
                <TableCell>{data.property?.propertyTitle}</TableCell>
                <TableCell>{data?.startDate?.toLocaleDateString()}</TableCell>
                <TableCell>{data?.endDate?.toLocaleDateString()}</TableCell>
                <TableCell className=" truncate hover:underline">
                  <Link href={`/thank-you?paymentId=${data.id}`}>
                    {data.id.slice(0, 6)}...
                  </Link>
                </TableCell>

                <TableCell>{formatMoney(data.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
}

export default Page;