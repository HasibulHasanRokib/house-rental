import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { formatMoney, relativeData } from "@/lib/utils";
import { CreditCard, DollarSign, Home, HousePlus } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

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
    <div className="p-6 space-y-8">
      <div className="border-b py-3 space-y-2">
        <h2 className="font-semibold text-xl">My booking</h2>
        <p className="text-sm text-muted-foreground">
          This is how you will see your all activity on the site.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My booked property list</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="min-w-full">
            <TableCaption>My property list</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">#</TableHead>
                <TableHead>Owner info</TableHead>
                <TableHead className="hidden md:table-cell">
                  Phone no.
                </TableHead>
                <TableHead className="hidden md:table-cell">Property</TableHead>
                <TableHead className="hidden md:table-cell">
                  Start Date
                </TableHead>
                <TableHead className="hidden md:table-cell">End Date</TableHead>
                <TableHead className="hidden md:table-cell">
                  Payment id
                </TableHead>

                <TableHead>Paid amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookedList.map((data, index) => (
                <TableRow key={data.id}>
                  <TableCell className="hidden md:table-cell">
                    {index + 1}
                  </TableCell>
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
                  <TableCell className="hidden md:table-cell">
                    {data.property?.User?.phoneNo}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {data.property?.propertyTitle}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {data?.startDate?.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {data?.endDate?.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell truncate hover:underline">
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
      </Card>
    </div>
  );
}

export default Page;
