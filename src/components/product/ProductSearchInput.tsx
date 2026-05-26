"use client";

import type { ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const PLACEHOLDER = "Pretraži proizvode...";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  cardClassName?: string;
  inputClassName?: string;
  id?: string;
  name?: string;
  autoFocus?: boolean;
  disabled?: boolean;
};

export const ProductSearchInput = ({
  value,
  onChange,
  onSubmit,
  cardClassName = "",
  inputClassName = "",
  id = "product-search",
  name,
  autoFocus,
  disabled
}: Props) => {
  return (
    <Card className={`p-4 ${cardClassName}`.trim()}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.();
        }}
        className="relative w-full"
      >
        <span
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current stroke-2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
        <Input
          id={id}
          name={name}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          placeholder={PLACEHOLDER}
          className={`h-11 pl-10 ${inputClassName}`.trim()}
          autoFocus={autoFocus}
          disabled={disabled}
        />
      </form>
    </Card>
  );
};
