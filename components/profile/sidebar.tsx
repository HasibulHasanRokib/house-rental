import { auth, signOut } from "@/auth";
import Image from "next/image";
import React from "react";
import DefaultImage from "@/public/images/default.png";
import SidebarLink from "./sidebarLink";

const Sidebar = async () => {
  const session = await auth();

  return (
    <>
      <div className="bg-white  border rounded-md ">
        <div className="border-b py-1 px-3">
          <h2 className="font-semibold">My Dashboard</h2>
        </div>
        <div className="py-2 flex flex-col items-center space-y-1 ">
          <Image
            src={session?.user?.image || DefaultImage}
            alt="Image"
            width={144}
            height={144}
            className="w-36 h-36 object-cover border rounded-full"
          />
          <h3 className="capitalize font-bold">{session?.user.name}</h3>
          <p className="text-sm capitalize">As {session?.user.role}</p>
        </div>
        <SidebarLink />
        <div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              className="w-full text-start p-2 text-sm border-y"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
