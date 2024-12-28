import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { auth } from "@/auth";
import { SignOut } from "./auth/SignOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavLink from "./NavLink";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import MaxWidthWrapper from "./MaxWithWrapper";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper className="flex h-16 sm:h-20 items-center justify-between px-4 sm:px-8 lg:px-16">
        {/* Logo */}
        <div>
          <Link href={"/"}>
            <p className="font-bold text-lg sm:text-xl text-gray-700">
              Home<span className="text-primary">Rental</span>
            </p>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 lg:gap-10 items-center">
          <NavLink />
        </div>

        {/* User Actions */}
        <ul className="flex items-center space-x-4">
          {session?.user ? (
            <div className="flex items-center space-x-4">
              <li>
                <SignOut />
              </li>
              <li>
                <Link href={"/profile"}>
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt="avatar"
                    />
                    <AvatarFallback>
                      {session.user.name?.toUpperCase().slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </li>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <li>
                <Link href={"/auth/signup"} className="text-sm sm:text-base">
                  Sign up
                </Link>
              </li>
              <li>
                <Link
                  className={buttonVariants({
                    variant: "default",
                  })}
                  href={"/auth/login"}
                >
                  Log In
                </Link>
              </li>
            </div>
          )}
          <li>
            <div className="md:hidden flex gap-6 lg:gap-10 items-center">
              <Sheet>
                <SheetTrigger>
                  <AlignJustify />
                </SheetTrigger>
                <SheetContent>
                  <div className="flex justify-center items-center mt-20">
                    <div className="grid grid-rows-4 items-center gap-10">
                      <NavLink />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </li>
        </ul>
      </MaxWidthWrapper>
    </nav>
  );
}
