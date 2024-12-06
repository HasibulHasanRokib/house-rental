import { auth } from "@/auth";
import db from "@/lib/db";
import EditProfileForm from "@/components/profile/EditProfileForm";

const EditProfile = async () => {
  const session = await auth();
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      username: true,
      address: true,
      phoneNo: true,
      gender: true,
      image: true,
      id: true,
    },
  });

  return (
    <div>
      <div className="border-b pb-2">
        <h3 className="text-2xl font-semibold leading-7 ">Edit account</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 ">
          Personal details update
        </p>
      </div>
      {/* <EditProfileForm user={user} /> */}
    </div>
  );
};

export default EditProfile;
