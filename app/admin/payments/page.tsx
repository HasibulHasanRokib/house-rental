import PagePath from "@/components/PagePath";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
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

const items = [
  { name: "Admin", href: "/admin" },
  { name: "Payments", href: "/admin/payments" },
];

export default async function Page() {
  const payments = await db.rent.findMany({
    where: {
      isPaid: true,
    },
    include: {
      property: {
        include: {
          User: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Payments list section</CardTitle>
        <CardDescription>
          <PagePath items={items} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="min-w-full">
          <TableCaption>Payments list</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Start date</TableHead>
              <TableHead>End date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment id</TableHead>
              <TableHead>Payment time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {" "}
                  <a
                    href={`/properties/${data?.property?.slug}`}
                    className="hover:underline hover:text-blue-500"
                    target="_blank"
                  >
                    {data?.property?.propertyTitle}
                  </a>
                </TableCell>
                <TableCell>
                  <p>{data.property?.User?.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {data.property?.User?.email}
                  </p>
                </TableCell>
                <TableCell>
                  <p>{data.user.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {data.user.email}
                  </p>
                </TableCell>
                <TableCell>{data.startDate?.toLocaleDateString()}</TableCell>
                <TableCell>{data.endDate?.toLocaleDateString()}</TableCell>
                <TableCell>{data.amount}</TableCell>
                <TableCell>
                  <a
                    href={`/thank-you?paymentId=${data?.id}`}
                    className="hover:underline hover:text-blue-500"
                    target="_blank"
                  >
                    {data?.id.slice(0, 5)}...
                  </a>
                </TableCell>
                <TableCell>
                  <p>{data.createdAt?.toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {data.createdAt?.toLocaleTimeString()}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </>
  );
}
