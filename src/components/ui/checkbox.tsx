import type { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = ({ className = "", ...props }: Props) => (
  <input
    type="checkbox"
    className={`h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 ${className}`}
    {...props}
  />
);
