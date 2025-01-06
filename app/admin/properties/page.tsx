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
import StatusDropdown from "@/components/admin/StatusDropdown";

const items = [
  { name: "Admin", href: "/admin" },
  { name: "Properties", href: "/admin/properties" },
];

export default async function Page() {
  const properties = await db.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Properties section</CardTitle>
        <CardDescription>
          <PagePath items={items} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="min-w-full">
          <TableCaption>property list</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Area (sqft)</TableHead>
              <TableHead>Rooms</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={data.imagesUrl[0]}
                    alt="image"
                    className="w-10 h-10 rounded-sm object-cover"
                  />
                </TableCell>
                <TableCell className="flex flex-col  truncate">
                  <a
                    href={`/properties/${data.slug}`}
                    className="hover:underline hover:text-blue-500"
                    target="_blank"
                  >
                    {data.propertyTitle}
                  </a>
                  <span className="text-xs text-muted-foreground capitalize">
                    {data.type}
                  </span>
                </TableCell>
                <TableCell>{data.area}</TableCell>
                <TableCell>{data.rooms}</TableCell>
                <TableCell>{data.city}</TableCell>
                <TableCell>{data.price}</TableCell>
                <TableCell>{data.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <StatusDropdown id={data.id} propertyStatus={data.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {properties.length === 0 ? (
          <p className="text-center text-muted-foreground">No property found</p>
        ) : (
          ""
        )}
      </CardContent>
    </>
  );
}
