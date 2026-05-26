import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({
  className = "",
  role = "status",
  "aria-label": ariaLabel = "Učitavanje",
  ...props
}: Props) => (
  <div
    role={role}
    aria-label={ariaLabel}
    className={`animate-pulse rounded-md bg-slate-200 ${className}`}
    {...props}
  />
);
