"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/lib/data/categories";

const priceRanges = [
  { label: "Under $15", value: "0-1500" },
  { label: "$15 - $25", value: "1500-2500" },
  { label: "$25 - $50", value: "2500-5000" },
  { label: "Over $50", value: "5000-99999" },
];

const caffeineFilters = [
  { label: "Caffeine Free", value: "none" },
  { label: "Low Caffeine", value: "low" },
  { label: "Medium Caffeine", value: "medium" },
  { label: "High Caffeine", value: "high" },
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "";
  const activePrice = searchParams.get("price") || "";
  const activeCaffeine = searchParams.get("caffeine") || "";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-display text-lg font-semibold text-primary-700">
          Categories
        </h3>
        <ul className="mt-3 space-y-2">
          <li>
            <button
              onClick={() => updateFilter("category", "")}
              className={`text-sm transition-colors ${
                !activeCategory
                  ? "font-medium text-gold-500"
                  : "text-neutral-500 hover:text-primary-700"
              }`}
            >
              All Teas
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => updateFilter("category", cat.slug)}
                className={`text-sm transition-colors ${
                  activeCategory === cat.slug
                    ? "font-medium text-gold-500"
                    : "text-neutral-500 hover:text-primary-700"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-display text-lg font-semibold text-primary-700">
          Price Range
        </h3>
        <ul className="mt-3 space-y-2">
          <li>
            <button
              onClick={() => updateFilter("price", "")}
              className={`text-sm transition-colors ${
                !activePrice
                  ? "font-medium text-gold-500"
                  : "text-neutral-500 hover:text-primary-700"
              }`}
            >
              All Prices
            </button>
          </li>
          {priceRanges.map((range) => (
            <li key={range.value}>
              <button
                onClick={() => updateFilter("price", range.value)}
                className={`text-sm transition-colors ${
                  activePrice === range.value
                    ? "font-medium text-gold-500"
                    : "text-neutral-500 hover:text-primary-700"
                }`}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Caffeine Level */}
      <div>
        <h3 className="font-display text-lg font-semibold text-primary-700">
          Caffeine Level
        </h3>
        <ul className="mt-3 space-y-2">
          <li>
            <button
              onClick={() => updateFilter("caffeine", "")}
              className={`text-sm transition-colors ${
                !activeCaffeine
                  ? "font-medium text-gold-500"
                  : "text-neutral-500 hover:text-primary-700"
              }`}
            >
              Any
            </button>
          </li>
          {caffeineFilters.map((level) => (
            <li key={level.value}>
              <button
                onClick={() => updateFilter("caffeine", level.value)}
                className={`text-sm transition-colors ${
                  activeCaffeine === level.value
                    ? "font-medium text-gold-500"
                    : "text-neutral-500 hover:text-primary-700"
                }`}
              >
                {level.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
