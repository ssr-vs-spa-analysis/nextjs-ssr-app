"use client";

type Props = {
  heading: string;
  error: Error & { digest?: string };
  reset: () => void;
};

export const RouteErrorView = ({ heading, error, reset }: Props) => (
  <div
    role="alert"
    className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-md border border-red-200 bg-red-50 p-6 text-center"
  >
    <h2 className="text-lg font-semibold text-red-900">{heading}</h2>
    <p className="max-w-md text-sm text-red-800">{error.message}</p>
    <button
      type="button"
      onClick={reset}
      className="rounded-md bg-red-900 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
    >
      Pokušaj ponovo
    </button>
  </div>
);
