import { Suspense } from "react";
import { Container } from "@/components/ui";
import { ProductFilters, ProductSort } from "@/components/product";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import ShopProductGrid from "./shop-product-grid";

export const metadata = {
  title: "Shop All Teas",
  description:
    "Browse our complete collection of premium healthy teas from around the world. Green, black, white, organic, herbal, oolong, matcha, and chai.",
};

export default function ShopPage() {
  return (
    <>
      {/* Page Header */}
      <div className="border-b border-cream-100 bg-white">
        <Container className="py-8">
          <h1 className="font-display text-3xl font-bold text-primary-700 lg:text-4xl">
            Shop All Teas
          </h1>
          <p className="mt-2 text-neutral-500">
            {products.length} premium teas from {categories.length} categories
          </p>
        </Container>
      </div>

      <Container className="py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Sidebar Filters */}
          <div className="mb-8 lg:mb-0">
            <Suspense>
              <ProductFilters />
            </Suspense>
          </div>

          {/* Main Content */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <Suspense>
                <ProductSort />
              </Suspense>
            </div>
            <Suspense>
              <ShopProductGrid />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}
