import type { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ className = "", ...props }: Props) => (
  <label
    className={`text-sm font-medium text-slate-700 ${className}`}
    {...props}
  />
);
