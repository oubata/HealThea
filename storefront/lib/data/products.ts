import { medusaFetch, getRegion } from "@/lib/medusa";
import { getProductThumbnail, getProductImages } from "./fallbacks";

// --- Types (kept compatible with existing UI components) ---

export interface ProductVariant {
  id: string;
  title: string;
  price: number; // cents CAD
  inventory_quantity: number;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  thumbnail: string;
  images: string[];
  variants: ProductVariant[];
  collection_id: string; // first category id (for backwards compat)
  category_ids: string[]; // all category ids
  tags: string[];
  metadata: {
    origin_country: string;
    health_benefits: string;
    brewing_temp: string;
    steep_time: string;
    caffeine_level: "none" | "low" | "medium" | "high";
  };
}

// --- Medusa API response types ---

interface MedusaCalculatedPrice {
  calculated_amount: number;
  currency_code: string;
}

interface MedusaVariant {
  id: string;
  title: string;
  sku: string | null;
  calculated_price?: MedusaCalculatedPrice;
  inventory_quantity?: number;
}

interface MedusaCategory {
  id: string;
  name: string;
  handle: string;
}

interface MedusaImage {
  url: string;
}

interface MedusaTag {
  value: string;
}

interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  images: MedusaImage[];
  variants: MedusaVariant[];
  categories: MedusaCategory[];
  tags: MedusaTag[];
  metadata: Record<string, unknown> | null;
}

// --- Mappers ---

function mapProduct(p: MedusaProduct): Product {
  const meta = (p.metadata ?? {}) as Record<string, string>;
  return {
    id: p.id,
    title: p.title,
    handle: p.handle,
    description: p.description ?? "",
    thumbnail: getProductThumbnail(p.handle, p.thumbnail),
    images: getProductImages(
      p.handle,
      p.images?.map((img) => img.url) ?? []
    ),
    variants: p.variants.map((v) => ({
      id: v.id,
      title: v.title,
      price: v.calculated_price?.calculated_amount ?? 0,
      inventory_quantity: v.inventory_quantity ?? 100,
    })),
    collection_id: p.categories?.[0]?.id ?? "",
    category_ids: p.categories?.map((c) => c.id) ?? [],
    tags: p.tags?.map((t) => t.value) ?? [],
    metadata: {
      origin_country: meta.origin_country ?? "",
      health_benefits: meta.health_benefits ?? "",
      brewing_temp: meta.brewing_temp ?? "",
      steep_time: meta.steep_time ?? "",
      caffeine_level: (meta.caffeine_level ?? "medium") as
        | "none"
        | "low"
        | "medium"
        | "high",
    },
  };
}

// --- Data fetching ---

export async function getProducts(): Promise<Product[]> {
  try {
    const region = await getRegion();
    const data = await medusaFetch<{ products: MedusaProduct[] }>(
      `/store/products?region_id=${region.id}&fields=*variants.calculated_price,*categories,*images,*tags&limit=100`,
      { next: { revalidate: 60 } }
    );
    return data.products.map(mapProduct);
  } catch (e) {
    console.error("Failed to fetch products:", e);
    return [];
  }
}

export async function getProductByHandle(
  handle: string
): Promise<Product | undefined> {
  try {
    const region = await getRegion();
    const data = await medusaFetch<{ products: MedusaProduct[] }>(
      `/store/products?handle=${handle}&region_id=${region.id}&fields=*variants.calculated_price,*categories,*images,*tags&limit=1`,
      { next: { revalidate: 60 } }
    );
    if (data.products.length === 0) return undefined;
    return mapProduct(data.products[0]);
  } catch (e) {
    console.error(`Failed to fetch product ${handle}:`, e);
    return undefined;
  }
}

export async function getProductsByCategory(
  categoryId: string
): Promise<Product[]> {
  try {
    const region = await getRegion();
    const data = await medusaFetch<{ products: MedusaProduct[] }>(
      `/store/products?category_id[]=${categoryId}&region_id=${region.id}&fields=*variants.calculated_price,*categories,*images,*tags&limit=100`,
      { next: { revalidate: 60 } }
    );
    return data.products.map(mapProduct);
  } catch (e) {
    console.error(`Failed to fetch products for category ${categoryId}:`, e);
    return [];
  }
}

// --- Utilities ---

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
