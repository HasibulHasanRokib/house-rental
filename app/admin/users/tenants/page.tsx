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
import UserAvatar from "@/components/UserAvatar";

const items = [
  { name: "Admin", href: "/admin" },
  { name: "Tenants", href: "/admin/users/tenants" },
];

export default async function Page() {
  const tenants = await db.user.findMany({
    where: {
      role: "tenant",
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
      image: true,
      _count: {
        select: {
          Rent: true,
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
        <CardTitle className="text-2xl">Tenants section</CardTitle>
        <CardDescription>
          <PagePath items={items} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Card className="print:border-none print:shadow-none">
          <CardContent>
            <Table className="min-w-full">
              <TableCaption>
                {" "}
                {tenants.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    No tenants data found!
                  </p>
                ) : (
                  "Tenants list"
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
                  <TableHead>Booked property</TableHead>
                  <TableHead>Join at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      {" "}
                      <UserAvatar name={data.username} image={data.image} />
                    </TableCell>
                    <TableCell>{data.username}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.gender}</TableCell>
                    <TableCell>{data.occupation}</TableCell>
                    <TableCell>{data.address}</TableCell>
                    <TableCell>{data.phoneNo}</TableCell>
                    <TableCell>{data._count.Rent}</TableCell>
                    <TableCell>{data.createdAt.toDateString()}</TableCell>
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
