import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <SignUpForm />
      </div>
    </div>
  );
}
