import MaxWidthWrapper from "./maxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import NavLink from "./navLink";
import { auth } from "@/auth";
import { SignOut } from "./auth/SignOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all ">
      <MaxWidthWrapper className="flex h-20 items-center justify-between">
        <div>
          <Link href={"/"}>
            <p className="font-bold text-xl text-gray-700">
              Home<span className="text-primary">Rental</span>
            </p>
          </Link>
        </div>

        <div className="flex gap-10 items-center">
          <NavLink />
        </div>

        {session?.user ? (
          <ul className="flex items-center space-x-3">
            <li>
              <SignOut />
            </li>
            <li>
              <Link href={"/profile"}>
                <Avatar>
                  <AvatarImage src={session?.user?.image || ""} alt="avatar" />
                  <AvatarFallback className="bg-primary text-white">
                    {session.user.name?.toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center space-x-3">
            <li>
              <Link href={"/auth/signup"}>Sign up</Link>
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
          </ul>
        )}
      </MaxWidthWrapper>
    </nav>
  );
}
