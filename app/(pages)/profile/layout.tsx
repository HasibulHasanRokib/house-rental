import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/MaxWithWrapper";
import ProfileSideBar from "@/components/profile/ProfileSideBar";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return notFound();
  }
  return (
    <section className="flex flex-col min-h-screen max-w-[85rem] mx-auto px-4 py-8">
      <div className="flex  border">
        <ProfileSideBar />
        <main className="flex-1 md:min-h-[80vh]">{children}</main>
      </div>
    </section>
  );
}
