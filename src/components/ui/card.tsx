import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className = "", ...props }: Props) => (
  <div
    className={`rounded-lg border border-slate-200 bg-white ${className}`}
    {...props}
  />
);
