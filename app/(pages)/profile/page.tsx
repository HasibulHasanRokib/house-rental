import { auth } from "@/auth";
import db from "@/lib/db";

export default async function Profile() {
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <div className=" flex flex-col  space-y-8">
      <div className="border-b pb-2">
        <h3 className="text-2xl font-semibold leading-7 text-gray-900 ">
          My account
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details
        </p>
      </div>
      <div className=" flex flex-col space-y-5">
        <div className="grid grid-cols-3 gap-4 ">
          <dt className="">Full name</dt>
          <dd className="capitalize">: {user?.username}</dd>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          <dt className="">Email</dt>
          <dd className="">: {user?.email}</dd>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          <dt className="">Address</dt>
          <dd className="">: Dhaka</dd>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          <dt className="">Gender</dt>
          <dd className="">: Male</dd>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          <dt className="">Phone</dt>
          <dd className="">: 01839027207</dd>
        </div>
      </div>
    </div>
  );
}
