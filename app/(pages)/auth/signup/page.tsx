import SignUpForm from "@/components/auth/SignUpForm";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import React from "react";

export default function SignUp() {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col space-y-8 justify-center items-center py-4 min-h-[80vh]">
        <SignUpForm />
      </div>
    </MaxWidthWrapper>
  );
}
