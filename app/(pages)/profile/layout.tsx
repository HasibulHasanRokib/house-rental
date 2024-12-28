import ProfileSidebar from "@/components/profile/profileSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <div className="flex  border">
        <ProfileSidebar />
        <main className="flex-1 min-h-[80vh]">{children}</main>
      </div>
    </MaxWidthWrapper>
  );
}
