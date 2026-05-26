"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SEARCH_PRICE_INPUT_MIN,
  SEARCH_BRAND_OPTIONS,
  SEARCH_CATEGORY_OPTIONS
} from "@/constants/search-filters";

const PRICE_INPUT_MIN = SEARCH_PRICE_INPUT_MIN;
const SUGGESTED_PRICE_RANGES: ReadonlyArray<{
  label: string;
  value: [number | null, number | null];
}> = [
  { label: "0 - 50,000", value: [0, 50000] },
  { label: "50,001 - 100,000", value: [50001, 100000] },
  { label: "100,001 - 150,000", value: [100001, 150000] },
  { label: "150,001 - 200,000", value: [150001, 200000] },
  { label: "200,001+", value: [200001, null] }
];

type Props = {
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: [number | null, number | null];
  onCategoryToggle: (value: string, checked: boolean) => void;
  onBrandToggle: (brand: string) => void;
  onPriceRangeChange: (value: [number | null, number | null]) => void;
};

export const SearchFiltersPanel = ({
  selectedCategories,
  selectedBrands,
  priceRange,
  onCategoryToggle,
  onBrandToggle,
  onPriceRangeChange
}: Props) => {
  const [minPrice, maxPrice] = priceRange;

  const [minPriceInput, setMinPriceInput] = useState(
    minPrice === null ? "" : String(minPrice)
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    maxPrice === null ? "" : String(maxPrice)
  );
  const [priceError, setPriceError] = useState<string | null>(null);

  useEffect(() => {
    setMinPriceInput((current) => {
      const next = minPrice === null ? "" : String(minPrice);
      return next === current ? current : next;
    });
    setMaxPriceInput((current) => {
      const next = maxPrice === null ? "" : String(maxPrice);
      return next === current ? current : next;
    });

    setPriceError(null);
  }, [minPrice, maxPrice]);

  const normalizePriceRange = (nextMinRaw: string, nextMaxRaw: string) => {
    const parsedMin = nextMinRaw.trim() === "" ? null : Number(nextMinRaw);
    const parsedMax = nextMaxRaw.trim() === "" ? null : Number(nextMaxRaw);

    const safeMin =
      parsedMin === null
        ? null
        : Number.isNaN(parsedMin)
          ? minPrice
          : Math.max(PRICE_INPUT_MIN, parsedMin);
    const safeMax =
      parsedMax === null
        ? null
        : Number.isNaN(parsedMax)
          ? maxPrice
          : parsedMax > 0
            ? parsedMax
            : null;

    return [safeMin, safeMax] as [number | null, number | null];
  };

  const applyPriceInputs = () => {
    const [nextMin, nextMax] = normalizePriceRange(
      minPriceInput,
      maxPriceInput
    );

    if (nextMin !== null && nextMax !== null && nextMax < nextMin) {
      setPriceError("Maksimalna cena mora biti veća ili jednaka minimalnoj.");
      return;
    }

    setPriceError(null);
    onPriceRangeChange([nextMin, nextMax]);
  };

  const handleResetPriceRange = () => {
    setPriceError(null);
    onPriceRangeChange([null, null]);
  };

  return (
    <Card className="h-fit space-y-6 p-4 lg:sticky lg:top-4 lg:self-start">
      <div className="space-y-3">
        <Label>Kategorije</Label>

        <div className="space-y-2">
          {SEARCH_CATEGORY_OPTIONS.map((category) => {
            const isChecked = selectedCategories.includes(category);
            return (
              <label
                key={category}
                className="flex items-center gap-2 rounded-md border border-slate-200 p-2"
              >
                <Checkbox
                  checked={isChecked}
                  onChange={(event) =>
                    onCategoryToggle(category, event.target.checked)
                  }
                  aria-label={`Filter kategorije ${category}`}
                />
                <span className="text-sm text-slate-700">{category}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Brendovi</Label>

        <div className="grid grid-cols-2 gap-2">
          {SEARCH_BRAND_OPTIONS.map((brand) => {
            const isSelected = selectedBrands.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                aria-pressed={isSelected}
                aria-label={`Filter brenda ${brand}`}
                onClick={() => onBrandToggle(brand)}
                className={`rounded-md border px-2 py-1 text-left text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Raspon cene (RSD)</Label>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Predloženi opsezi
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PRICE_RANGES.map((range) => (
              <button
                key={range.label}
                type="button"
                className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
                onClick={() => {
                  setPriceError(null);
                  onPriceRangeChange(range.value);
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="price-min">Min cena</Label>
            <Input
              id="price-min"
              type="number"
              min={PRICE_INPUT_MIN}
              step={1}
              value={minPriceInput}
              onChange={(event) => setMinPriceInput(event.target.value)}
              onBlur={applyPriceInputs}
              onKeyDown={(event) => event.key === "Enter" && applyPriceInputs()}
              aria-label="Minimalna cena"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="price-max">Max cena</Label>
            <Input
              id="price-max"
              type="number"
              min={1}
              step={1}
              value={maxPriceInput}
              onChange={(event) => setMaxPriceInput(event.target.value)}
              onBlur={applyPriceInputs}
              onKeyDown={(event) => event.key === "Enter" && applyPriceInputs()}
              aria-label="Maksimalna cena"
            />
          </div>
        </div>

        {priceError ? (
          <p className="text-sm text-red-600" role="alert">
            {priceError}
          </p>
        ) : null}

        <Button
          type="button"
          onClick={handleResetPriceRange}
          className="w-full bg-blue-600 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          Resetuj raspon
        </Button>
      </div>
    </Card>
  );
};
