import Link from "next/link";

const NotFound = () => (
  <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
    Traženi sadržaj nije pronađen.{" "}
    <Link href="/" className="font-semibold underline">
      Vrati se na početnu
    </Link>
  </div>
);

export default NotFound;
