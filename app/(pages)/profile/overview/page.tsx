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
import { Car, CreditCard, DollarSign, Home, HousePlus } from "lucide-react";
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

import { Metadata } from "next";
import PrintButton from "@/components/PrintButton";
import UserAvatar from "@/components/UserAvatar";

export const metadata: Metadata = {
  title: "Overview Property",
  description: "Generated by create next app",
};

async function Page() {
  const session = await auth();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const pendingProperties = await db.property.count({
    where: { userId: session?.user.id, status: "pending" },
  });

  const totalSum = await db.property.aggregate({
    where: {
      userId: session?.user.id,
      status: "accepted",
    },
    _sum: {
      price: true,
    },
  });

  const totalProperties = await db.property.count({
    where: { userId: session?.user.id, status: "accepted" },
  });

  const totalBooked = await db.property.count({
    where: { userId: session?.user.id, status: "booked" },
  });

  const totalSalesToday = await db.rent.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      AND: [
        {
          property: {
            userId: session?.user.id,
          },
        },
      ],
      createdAt: {
        gte: todayStart,
      },
    },
  });
  const totalSalesThisMonth = await db.rent.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      AND: [
        {
          property: {
            userId: session?.user.id,
          },
        },
      ],
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
  });

  const tenants = await db.rent.findMany({
    where: {
      AND: [
        {
          property: {
            userId: session?.user.id,
            status: "booked",
          },
        },
      ],
    },
    include: {
      user: true,
      property: true,
    },
  });

  const totalAmount = await db.rent.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      property: {
        userId: session?.user.id,
        status: "booked",
      },
    },
  });

  return (
    <>
      <CardHeader className="print:hidden">
        <CardTitle className="text-2xl">Overview</CardTitle>
        <CardDescription>
          This is how you will see you all activity on the site.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2 print:hidden">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Total Revenue
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold">
                    {formatMoney(Number(totalSum._sum.price))}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    +Total revenue from properties
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Transitions
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold">
                    +{formatMoney(Number(totalSalesThisMonth._sum.amount))}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    +total transition this month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  Transitions
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold">
                    +{formatMoney(Number(totalSalesToday._sum.amount))}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    +total transitions today
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Home className="h-4 w-4" />
                  Properties
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold">+{totalProperties}</span>
                  <span className="text-sm text-muted-foreground">
                    +total properties left
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <HousePlus className="h-4 w-4" />
                  Booked property
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold">+{totalBooked}</span>
                  <span className="text-sm text-muted-foreground">
                    +total booked properties
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <HousePlus className="h-4 w-4" />
                  Pending property
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold">
                    +{pendingProperties}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    +total pending properties
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="print:border-none print:shadow-none">
          <CardHeader>
            <CardTitle>Tenants & Payments </CardTitle>
            <CardDescription>Here same information of tenant</CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="min-w-full">
              <TableCaption>
                {" "}
                {tenants.length === 0 ? "No actions yet!" : "My tenants list"}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Phone no.</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Paid amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((tenant, index) => (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <UserAvatar
                        name={tenant.user.username}
                        image={tenant.user.image}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <span className="capitalize">
                          {tenant.user.username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {tenant.user.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{tenant.user.phoneNo}</TableCell>
                    <TableCell>{tenant.property?.propertyTitle}</TableCell>
                    <TableCell>
                      {tenant?.startDate?.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {tenant?.endDate?.toLocaleDateString()}
                    </TableCell>
                    <TableCell>{formatMoney(tenant.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6} className="text-right font-semibold">
                    Total
                  </TableCell>
                  <TableCell>
                    {formatMoney(Number(totalAmount._sum.amount))}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
          <CardFooter>
            <PrintButton />
          </CardFooter>
        </Card>
      </CardContent>
    </>
  );
}

export default Page;
