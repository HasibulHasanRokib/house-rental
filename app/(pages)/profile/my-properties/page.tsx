import db from "@/lib/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Property } from "@prisma/client";

async function getData(): Promise<Property[]> {
  const properties = await db.property.findMany();
  return properties;
}
export default async function MyProperties() {
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
