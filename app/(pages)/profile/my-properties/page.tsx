import db from "@/lib/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Property } from "@prisma/client";
import { auth } from "@/auth";

async function getData(): Promise<Property[]> {
  const session = await auth();

  const properties = await db.property.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: { createdAt: "desc" },
  });
  return properties;
}
export default async function Page() {
  const data = await getData();
  return (
    <div className="p-4">
      <div className="">
        <h2>My Property lists</h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
