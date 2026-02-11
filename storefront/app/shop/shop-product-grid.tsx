"use client";

import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product";
import { type Product } from "@/lib/data/products";
import { type Category } from "@/lib/data/categories";

interface Props {
  products: Product[];
  categories: Category[];
}

function filterProducts(
  allProducts: Product[],
  allCategories: Category[],
  params: URLSearchParams
): Product[] {
  let filtered = [...allProducts];

  // Category filter
  const categorySlug = params.get("category");
  if (categorySlug) {
    const cat = allCategories.find((c) => c.slug === categorySlug);
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

export default function ShopProductGrid({ products, categories }: Props) {
  const searchParams = useSearchParams();
  const filtered = filterProducts(products, categories, searchParams);

  return <ProductGrid products={filtered} />;
}
