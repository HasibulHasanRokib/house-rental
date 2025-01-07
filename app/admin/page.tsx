import Chart from "@/components/admin/Chart";
import PieChartDummy from "@/components/admin/PieChart";
import PagePath from "@/components/PagePath";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { formatMoney } from "@/lib/utils";
import { CreditCard, DollarSign, Home, HousePlus } from "lucide-react";

const items = [{ name: "Admin", href: "/admin" }];

export default async function Page() {
  // Fixed date for today's start
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // Fixed date for 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const pendingProperties = await db.property.count({
    where: { status: "pending" },
  });

  const totalSum = await db.rent.aggregate({
    where: {
      isPaid: true,
    },
    _sum: {
      amount: true,
    },
  });

  const totalProperties = await db.property.count({
    where: { status: "accepted" },
  });

  const totalBooked = await db.property.count({
    where: { status: "booked" },
  });

  const totalSalesToday = await db.rent.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      isPaid: true,
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
      isPaid: true,
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
  });

  const weeklySales = await db.rent.groupBy({
    by: ["createdAt"],
    where: {
      isPaid: true,
      createdAt: {
        gte: thirtyDaysAgo, // Ensures we only consider recent data
      },
    },
    _sum: {
      amount: true,
    },
  });

  const salesByDay = Array(7).fill(0);
  weeklySales.forEach(({ createdAt, _sum: { amount } }) => {
    const dayIndex = new Date(createdAt).getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
    salesByDay[dayIndex] += Number(amount || 0);
  });

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Overview</CardTitle>
        <CardDescription>
          <PagePath items={items} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Total Balance
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold">
                    {formatMoney(Number(totalSum._sum.amount || 0))}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    +Total balance from booked properties
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
                  Transition (month)
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold">
                    +{formatMoney(Number(totalSalesThisMonth._sum.amount || 0))}
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
                  Transition (today)
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold">
                    +{formatMoney(Number(totalSalesToday._sum.amount || 0))}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    +total transition today
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
        <div className="grid grid-cols-2 space-x-4">
          <Chart salesByDay={salesByDay} />
          <PieChartDummy />
        </div>
      </CardContent>
    </>
  );
}
