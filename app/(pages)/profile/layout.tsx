import { auth } from "@/auth";
import ProfileSideBar from "@/components/profile/ProfileSideBar";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "Profile",
    template: "%s | House Rental",
  },
  description: "Generated by create next app",
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return redirect("/auth/login");
  }
  return (
    <div className="flex p-4 gap-2">
      <ProfileSideBar />
      <Card className="flex-1 min-h-svh space-y-8 min-w-max print:border-none print:shadow-none">
        {children}
      </Card>
    </div>
  );
}
