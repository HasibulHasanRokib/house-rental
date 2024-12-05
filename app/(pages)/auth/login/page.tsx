import LogInForm from "@/components/auth/LogInForm";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import React from "react";

export default function Login() {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col space-y-8 justify-center items-center py-4 min-h-[80vh]">
        <div className="mb-5">
          <h2 className="font-semibold text-4xl">
            Login in to House<span className="text-primary">Rental</span>
          </h2>
        </div>
        <div className="w-full">
          <LogInForm />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
