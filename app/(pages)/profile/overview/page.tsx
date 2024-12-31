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
import {
  Activity,
  CreditCard,
  DollarSign,
  Home,
  HousePlus,
  Users,
} from "lucide-react";
import React from "react";

async function Page() {
  const session = await auth();

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
  const tenantsList = await db.rent.findMany({
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
    distinct: ["userId"],
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
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Tenant information</CardTitle>
            <CardDescription>View tenant details</CardDescription>
          </CardHeader>
          <CardContent>
            {tenantsList.map((data, index) => {
              return (
                <div
                  key={data.id}
                  className="flex flex-col md:flex-row md:justify-between gap-2 items-center p-2 bg-slate-50 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src="https://ui.shadcn.com/avatars/02.png"
                      className="w-12 h-12 object-cover rounded-full"
                      alt=""
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {data.user.username}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {data.user.email}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Badge variant={"secondary"} className="p-2">
                      Join at {data.createdAt.toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              );
            })}
            {newPaymentInfo.length === 0 ? (
              <div className="text-center">
                <h2>No data found!</h2>
              </div>
            ) : null}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Payment</CardTitle>
            <CardDescription>
              Your {totalBooked} home rent this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            {newPaymentInfo.map((data) => {
              return (
                <div
                  key={data.id}
                  className="flex flex-col md:flex-row md:justify-between gap-2 items-center py-5 hover:bg-slate-50 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src="https://ui.shadcn.com/avatars/02.png"
                      className="w-12 h-12 object-cover rounded-full"
                      alt=""
                    />

                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {data.user.username}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {data.user.email}
                      </span>
                    </div>
                  </div>

                  <div>{formatMoney(data.amount)}</div>
                </div>
              );
            })}
            {newPaymentInfo.length === 0 ? (
              <div className="text-center">
                <h2>No data found!</h2>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
