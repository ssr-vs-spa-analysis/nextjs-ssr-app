import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement>;

export const Badge = ({ className = "", ...props }: Props) => (
  <span
    className={`inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700 ${className}`}
    {...props}
  />
);
