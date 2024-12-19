import LogInForm from "@/components/auth/LogInForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <LogInForm />
      </div>
    </div>
  );
}
