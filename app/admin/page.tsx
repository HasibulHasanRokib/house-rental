import PagePath from "@/components/PagePath";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const items = [{ name: "Admin", href: "/admin" }];

export default function Page() {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Overview</CardTitle>
        <CardDescription>
          <PagePath items={items} />
        </CardDescription>
      </CardHeader>
    </>
  );
}
