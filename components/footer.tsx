import MaxWidthWrapper from "./maxWidthWrapper";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" bg-white border-y ">
      <MaxWidthWrapper>
        <div className="flex h-20 justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>
          <div className="flex items-center space-x-8">
            <Link href={"#"} className="text-sm text-muted-foreground">
              Terms
            </Link>
            <Link href={"#"} className="text-sm text-muted-foreground">
              Privacy Policy
            </Link>
            <Link href={"#"} className="text-sm text-muted-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
