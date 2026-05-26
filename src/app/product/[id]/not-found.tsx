import Link from "next/link";

const ProductDetailNotFound = () => (
  <div
    className="mx-auto max-w-2xl px-4 py-16 text-center"
    aria-labelledby="product-not-found-heading"
  >
    <p className="text-6xl font-bold text-slate-300" aria-hidden="true">
      404
    </p>
    <h1
      id="product-not-found-heading"
      className="mt-4 text-2xl font-semibold text-slate-900"
    >
      Proizvod nije pronađen
    </h1>
    <p className="mt-2 text-slate-600">
      Ovaj proizvod ne postoji ili je link nevažeći.
    </p>
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <Link
        href="/"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        Vrati se na početnu
      </Link>
      <Link
        href="/search"
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
      >
        Pregledaj proizvode
      </Link>
    </div>
  </div>
);

export default ProductDetailNotFound;
