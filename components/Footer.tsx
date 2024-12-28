import Link from "next/link";
import MaxWidthWrapper from "./MaxWithWrapper";

export default function Footer() {
  return (
    <footer className="bg-white border-y ">
      <MaxWidthWrapper className="px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row justify-between items-center  sm:py-0">
          {/* Copyright */}
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-2 sm:space-y-0">
            <Link
              href={"#"}
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms
            </Link>
            <Link
              href={"#"}
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href={"#"}
              className="text-sm text-muted-foreground hover:underline"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
