"use client";

import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product";
import { products, type Product } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";

function filterProducts(
  allProducts: Product[],
  params: URLSearchParams
): Product[] {
  let filtered = [...allProducts];

  // Category filter
  const categorySlug = params.get("category");
  if (categorySlug) {
    const cat = categories.find((c) => c.slug === categorySlug);
    if (cat) {
      filtered = filtered.filter((p) => p.collection_id === cat.id);
    }
  }

  // Price filter
  const priceRange = params.get("price");
  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    filtered = filtered.filter((p) => {
      const lowestPrice = Math.min(...p.variants.map((v) => v.price));
      return lowestPrice >= min && lowestPrice <= max;
    });
  }

  // Caffeine filter
  const caffeine = params.get("caffeine");
  if (caffeine) {
    filtered = filtered.filter((p) => p.metadata.caffeine_level === caffeine);
  }

  // Sort
  const sort = params.get("sort");
  if (sort === "price-asc") {
    filtered.sort(
      (a, b) =>
        Math.min(...a.variants.map((v) => v.price)) -
        Math.min(...b.variants.map((v) => v.price))
    );
  } else if (sort === "price-desc") {
    filtered.sort(
      (a, b) =>
        Math.min(...b.variants.map((v) => v.price)) -
        Math.min(...a.variants.map((v) => v.price))
    );
  } else if (sort === "name-asc") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "name-desc") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  return filtered;
}

export default function ShopProductGrid() {
  const searchParams = useSearchParams();
  const filtered = filterProducts(products, searchParams);

  return <ProductGrid products={filtered} />;
}
