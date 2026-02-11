"use client";

import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { label: "Featured", value: "" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
];

export default function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSort = searchParams.get("sort") || "";

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-neutral-500">
        Sort by:
      </label>
      <select
        id="sort"
        value={activeSort}
        onChange={(e) => handleSort(e.target.value)}
        className="rounded border border-cream-100 bg-white px-3 py-1.5 text-sm text-neutral-900 outline-none focus:border-gold-500"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
