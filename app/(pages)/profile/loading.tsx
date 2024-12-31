import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full md:mt-48 flex justify-center">
      <div className="flex flex-col items-center gap-1">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <h3>Loading...</h3>
      </div>
    </div>
  );
}
