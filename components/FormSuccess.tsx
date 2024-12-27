import { CircleCheckBig } from "lucide-react";

export default function FormSuccess({
  message,
}: {
  message: string | undefined;
}) {
  return (
    <>
      {message && (
        <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
          <CircleCheckBig />
          {message}
        </div>
      )}
    </>
  );
}
