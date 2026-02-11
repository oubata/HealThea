// Temporary fallback data for images only.
// Product metadata and category descriptions now live in Medusa.
// These image fallbacks will be removed once real product photography
// is uploaded to Medusa (owner-supplied imagery).

export const CATEGORY_IMAGES: Record<string, string> = {
  "Green Tea":
    "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=1200&q=80",
  "Black Tea":
    "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=1200&q=80",
  "White Tea":
    "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=1200&q=80",
  "Organic Tea":
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80",
  "Herbal Tea":
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&q=80",
  "Oolong Tea":
    "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=1200&q=80",
  Matcha:
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&q=80",
  Chai: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=1200&q=80",
};

export const PRODUCT_IMAGES: Record<string, { thumbnail: string; images: string[] }> = {
  "japanese-sencha-green-tea": {
    thumbnail:
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80",
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    ],
  },
  "chinese-gunpowder-green-tea": {
    thumbnail:
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80",
    ],
  },
  "darjeeling-first-flush-black-tea": {
    thumbnail:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    ],
  },
  "earl-grey-supreme": {
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    ],
  },
  "silver-needle-white-tea": {
    thumbnail:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&q=80",
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
    ],
  },
  "organic-chamomile-bliss": {
    thumbnail:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    ],
  },
  "tieguanyin-iron-goddess-oolong": {
    thumbnail:
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
    ],
  },
  "ceremonial-grade-matcha": {
    thumbnail:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80",
    ],
  },
  "traditional-masala-chai": {
    thumbnail:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80",
    ],
  },
  "organic-rooibos-red-bush": {
    thumbnail:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    ],
  },
};

const DEFAULT_TEA_IMAGE =
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80";

export function getProductThumbnail(handle: string, medusaThumbnail: string | null): string {
  if (medusaThumbnail) return medusaThumbnail;
  return PRODUCT_IMAGES[handle]?.thumbnail ?? DEFAULT_TEA_IMAGE;
}

export function getProductImages(handle: string, medusaImages: string[]): string[] {
  if (medusaImages.length > 0) return medusaImages;
  return PRODUCT_IMAGES[handle]?.images ?? [DEFAULT_TEA_IMAGE];
}
