import MaxWidthWrapper from "@/components/maxWidthWrapper";
import Sidebar from "@/components/profile/sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper>
      <div className="grid grid-cols-4 gap-5 my-5 min-h-[70vh]">
        <Sidebar />
        <div className="col-span-3 border rounded-md bg-white p-5">
          {children}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default layout;
