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

async function Page() {
  const session = await auth();
  const pendingProperties = await db.property.count({
    where: { userId: session?.user.id, status: "pending" },
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

  const newPaymentInfo = await db.rent.findMany({
    where: {
      AND: [
        {
          property: {
            userId: session?.user.id,
          },
        },
      ],
    },
    include: {
      user: {
        select: {
          email: true,
          username: true,
        },
      },
    },

    orderBy: { createdAt: "desc" },
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
        gte: new Date(new Date().getDate()),
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
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
  });

  return (
    <div className="p-6 space-y-8">
      <div className="border-b py-3 space-y-2">
        <h2 className="font-semibold text-xl">Overview</h2>
        <p className="text-sm text-muted-foreground">
          This is how you will see you all activity on the site.
        </p>
      </div>
      <div className="grid gap-4  lg:grid-cols-3">
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
                Sales
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold">
                  +{formatMoney(Number(totalSalesThisMonth._sum.amount))}
                </span>
                <span className="text-sm text-muted-foreground">
                  +total earn this month
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
                Sales
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold">
                  +{formatMoney(Number(totalSalesToday._sum.amount))}
                </span>
                <span className="text-sm text-muted-foreground">
                  +total earn today
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
                <span className="text-2xl font-bold">
                  +{totalProperties - totalBooked}
                </span>
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
                <span className="text-2xl font-bold">+{pendingProperties}</span>
                <span className="text-sm text-muted-foreground">
                  +total pending properties
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>My tenants list</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="min-w-full">
            <TableCaption>My tenants list</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">#</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead className="hidden md:table-cell">
                  Phone no.
                </TableHead>
                <TableHead className="hidden md:table-cell">Property</TableHead>
                <TableHead className="hidden md:table-cell">
                  Start Date
                </TableHead>
                <TableHead className="hidden md:table-cell">End Date</TableHead>
                <TableHead>Paid amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant, index) => (
                <TableRow key={tenant.id}>
                  <TableCell className="hidden md:table-cell">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <span className="capitalize">{tenant.user.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {tenant.user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {tenant.user.phoneNo}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {tenant.property?.propertyTitle}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {tenant?.startDate?.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
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
      </Card>
    </div>
  );
}

export default Page;
