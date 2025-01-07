import PagePath from "@/components/PagePath";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import PrintButton from "@/components/PrintButton";

const items = [
  { name: "Admin", href: "/admin" },
  { name: "Owners", href: "/admin/users/owners" },
];

export default async function Page() {
  const owners = await db.user.findMany({
    where: {
      role: "owner",
    },
    select: {
      id: true,
      username: true,
      email: true,
      gender: true,
      occupation: true,
      address: true,
      phoneNo: true,
      createdAt: true,
      _count: {
        select: {
          properties: {
            where: {
              status: "accepted",
            },
          },
        },
      },
      properties: {
        select: {
          _count: true,
        },
        where: {
          status: "booked",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Owners section</CardTitle>
        <CardDescription>
          <PagePath items={items} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Card className="print:border-none print:shadow-none">
          <CardContent>
            <Table className="min-w-full">
              <TableCaption>
                {owners.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    No owners data found!
                  </p>
                ) : (
                  "Owners list"
                )}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Occupation</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone no.</TableHead>
                  <TableHead>Total property</TableHead>
                  <TableHead>Booked property</TableHead>
                  <TableHead>Join at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {owners.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.username}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.gender}</TableCell>
                    <TableCell>{data.occupation}</TableCell>
                    <TableCell>{data.address}</TableCell>
                    <TableCell>{data.phoneNo}</TableCell>
                    <TableCell>{data._count.properties}</TableCell>
                    <TableCell>{data.properties.length}</TableCell>
                    <TableCell>{data.createdAt.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
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
