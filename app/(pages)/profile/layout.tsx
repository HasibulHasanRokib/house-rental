import MaxWidthWrapper from "@/components/MaxWithWrapper";
import ProfileSideBar from "@/components/profile/ProfileSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper>
      <div className="flex  border">
        <ProfileSideBar />
        <main className="flex-1 min-h-[80vh]">{children}</main>
      </div>
    </MaxWidthWrapper>
  );
}
