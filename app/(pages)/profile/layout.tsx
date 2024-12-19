import MaxWidthWrapper from "@/components/maxWidthWrapper";
import ProfileSidebar from "@/components/profile/profileSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <div className="flex  border">
        <ProfileSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </MaxWidthWrapper>
  );
}
