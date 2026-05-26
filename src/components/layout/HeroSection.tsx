export const HeroSection = () => (
  <section
    className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-6 py-12 text-white shadow-lg ring-1 ring-white/10 sm:px-10 sm:py-14"
    aria-labelledby="hero-heading"
  >
    <div
      className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
      aria-hidden="true"
    />
    <div
      className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl"
      aria-hidden="true"
    />
    <div
      className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%20h40v1H0z%22%20fill%3D%22%23fff%22%20fill-opacity%3D%220.03%22%2F%3E%3C%2Fsvg%3E')]"
      aria-hidden="true"
    />
    <div className="relative max-w-2xl">
      <h1
        id="hero-heading"
        className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
      >
        eProdavnica
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
        Proizvodi za sve
      </p>
    </div>
  </section>
);
