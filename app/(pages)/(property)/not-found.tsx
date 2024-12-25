import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center min-h-[50vh] text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Not Found</h2>
          <p className="mb-4">Could not find requested resource</p>
          <Link href="/properties" className="text-blue-500 underline">
            Return
          </Link>
        </div>
      </div>
    </>
  );
}
