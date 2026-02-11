import { medusaFetch } from "@/lib/medusa";
import { CATEGORY_IMAGES } from "./fallbacks";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

// --- Medusa API response types ---

interface MedusaCategory {
  id: string;
  name: string;
  handle: string;
  description: string | null;
  metadata: Record<string, unknown> | null;
}

// --- Mapper ---

function mapCategory(c: MedusaCategory): Category {
  return {
    id: c.id,
    name: c.name,
    slug: c.handle,
    description: c.description ?? "",
    image:
      CATEGORY_IMAGES[c.name] ||
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80",
  };
}

// --- Data fetching ---

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await medusaFetch<{
      product_categories: MedusaCategory[];
    }>("/store/product-categories?limit=100", {
      next: { revalidate: 60 },
    });
    return data.product_categories.map(mapCategory);
  } catch (e) {
    console.error("Failed to fetch categories:", e);
    return [];
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  try {
    const data = await medusaFetch<{
      product_categories: MedusaCategory[];
    }>(`/store/product-categories?handle=${slug}&limit=1`, {
      next: { revalidate: 60 },
    });
    if (data.product_categories.length === 0) return undefined;
    return mapCategory(data.product_categories[0]);
  } catch (e) {
    console.error(`Failed to fetch category ${slug}:`, e);
    return undefined;
  }
}
