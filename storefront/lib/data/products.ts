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
  collection_id: string;
  tags: string[];
  metadata: {
    origin_country: string;
    health_benefits: string;
    brewing_temp: string;
    steep_time: string;
    caffeine_level: "none" | "low" | "medium" | "high";
  };
}

export const products: Product[] = [
  // Green Tea
  {
    id: "prod_green_1",
    title: "Japanese Sencha Green Tea",
    handle: "japanese-sencha-green-tea",
    description:
      "A classic Japanese green tea with a delicate balance of sweetness and astringency. Sencha is Japan's most popular tea, known for its vibrant green colour and refreshing grassy notes. Rich in catechins and vitamin C, this tea is perfect for daily wellness.",
    thumbnail: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80",
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    ],
    variants: [
      { id: "var_g1_50", title: "50g", price: 1499, inventory_quantity: 50 },
      { id: "var_g1_100", title: "100g", price: 2499, inventory_quantity: 30 },
      { id: "var_g1_250", title: "250g", price: 4999, inventory_quantity: 20 },
    ],
    collection_id: "col_green",
    tags: ["antioxidant", "daily", "japanese"],
    metadata: {
      origin_country: "Japan",
      health_benefits: "High in catechins, boosts metabolism, rich in vitamin C",
      brewing_temp: "70-80°C",
      steep_time: "1-2 minutes",
      caffeine_level: "medium",
    },
  },
  {
    id: "prod_green_2",
    title: "Chinese Gunpowder Green Tea",
    handle: "chinese-gunpowder-green-tea",
    description:
      "Named for its tightly rolled pellet-like leaves, Gunpowder green tea delivers a bold, slightly smoky flavour. One of the oldest teas in China, it brews a full-bodied cup with a distinctive bite. Excellent as a base for Moroccan mint tea.",
    thumbnail: "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80",
    ],
    variants: [
      { id: "var_g2_50", title: "50g", price: 1199, inventory_quantity: 40 },
      { id: "var_g2_100", title: "100g", price: 1999, inventory_quantity: 25 },
      { id: "var_g2_250", title: "250g", price: 3999, inventory_quantity: 15 },
    ],
    collection_id: "col_green",
    tags: ["bold", "smoky", "chinese"],
    metadata: {
      origin_country: "China",
      health_benefits: "Aids digestion, rich in antioxidants, supports heart health",
      brewing_temp: "75-85°C",
      steep_time: "2-3 minutes",
      caffeine_level: "medium",
    },
  },
  {
    id: "prod_green_3",
    title: "Dragonwell Longjing Green Tea",
    handle: "dragonwell-longjing-green-tea",
    description:
      "One of China's ten famous teas, Dragonwell is pan-fired to produce flat, jade-green leaves with a sweet, chestnut-like flavour. Its smooth, mellow character and lingering aftertaste make it a favourite among tea connoisseurs worldwide.",
    thumbnail: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    ],
    variants: [
      { id: "var_g3_50", title: "50g", price: 1999, inventory_quantity: 20 },
      { id: "var_g3_100", title: "100g", price: 3499, inventory_quantity: 15 },
    ],
    collection_id: "col_green",
    tags: ["premium", "chinese", "smooth"],
    metadata: {
      origin_country: "China",
      health_benefits: "Lowers cholesterol, improves focus, high in L-theanine",
      brewing_temp: "75-80°C",
      steep_time: "2-3 minutes",
      caffeine_level: "medium",
    },
  },

  // Black Tea
  {
    id: "prod_black_1",
    title: "Darjeeling First Flush Black Tea",
    handle: "darjeeling-first-flush-black-tea",
    description:
      "Known as the 'Champagne of Teas,' Darjeeling First Flush is harvested in spring from the foothills of the Himalayas. It produces a light, floral cup with muscatel notes and a bright amber liquor. A truly refined tea experience.",
    thumbnail: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    ],
    variants: [
      { id: "var_b1_50", title: "50g", price: 1899, inventory_quantity: 30 },
      { id: "var_b1_100", title: "100g", price: 3299, inventory_quantity: 20 },
      { id: "var_b1_250", title: "250g", price: 6999, inventory_quantity: 10 },
    ],
    collection_id: "col_black",
    tags: ["premium", "floral", "indian"],
    metadata: {
      origin_country: "India",
      health_benefits: "Boosts energy, supports cardiovascular health, rich in theaflavins",
      brewing_temp: "90-95°C",
      steep_time: "3-4 minutes",
      caffeine_level: "high",
    },
  },
  {
    id: "prod_black_2",
    title: "Earl Grey Supreme",
    handle: "earl-grey-supreme",
    description:
      "Our signature Earl Grey blends premium Ceylon black tea with natural bergamot oil and cornflower petals. The result is a sophisticated, citrus-forward cup with a smooth, malty base — perfect for afternoon tea.",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    ],
    variants: [
      { id: "var_b2_50", title: "50g", price: 1399, inventory_quantity: 45 },
      { id: "var_b2_100", title: "100g", price: 2399, inventory_quantity: 30 },
      { id: "var_b2_250", title: "250g", price: 4799, inventory_quantity: 20 },
    ],
    collection_id: "col_black",
    tags: ["bergamot", "citrus", "classic"],
    metadata: {
      origin_country: "Sri Lanka",
      health_benefits: "Improves focus, aids digestion, rich in antioxidants",
      brewing_temp: "95-100°C",
      steep_time: "3-5 minutes",
      caffeine_level: "high",
    },
  },
  {
    id: "prod_black_3",
    title: "English Breakfast Blend",
    handle: "english-breakfast-blend",
    description:
      "A robust, full-bodied blend of Assam, Ceylon, and Kenyan teas. This classic morning tea is rich and malty with a deep amber colour. Pairs beautifully with milk and honey, making it the ideal way to start your day.",
    thumbnail: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80",
    ],
    variants: [
      { id: "var_b3_50", title: "50g", price: 1099, inventory_quantity: 60 },
      { id: "var_b3_100", title: "100g", price: 1899, inventory_quantity: 40 },
      { id: "var_b3_250", title: "250g", price: 3799, inventory_quantity: 25 },
    ],
    collection_id: "col_black",
    tags: ["morning", "robust", "classic"],
    metadata: {
      origin_country: "Blend",
      health_benefits: "High in antioxidants, boosts energy, supports gut health",
      brewing_temp: "95-100°C",
      steep_time: "3-5 minutes",
      caffeine_level: "high",
    },
  },

  // White Tea
  {
    id: "prod_white_1",
    title: "Silver Needle White Tea",
    handle: "silver-needle-white-tea",
    description:
      "The most prized white tea, made exclusively from unopened buds covered in fine white hairs. Silver Needle produces a pale, delicate infusion with honeyed sweetness and a silky texture. A true luxury tea for the discerning palate.",
    thumbnail: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&q=80",
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
    ],
    variants: [
      { id: "var_w1_50", title: "50g", price: 2499, inventory_quantity: 15 },
      { id: "var_w1_100", title: "100g", price: 4499, inventory_quantity: 10 },
    ],
    collection_id: "col_white",
    tags: ["premium", "luxury", "chinese"],
    metadata: {
      origin_country: "China",
      health_benefits: "Highest antioxidant content, anti-aging, supports skin health",
      brewing_temp: "70-75°C",
      steep_time: "3-5 minutes",
      caffeine_level: "low",
    },
  },
  {
    id: "prod_white_2",
    title: "White Peony (Bai Mudan)",
    handle: "white-peony-bai-mudan",
    description:
      "A fuller-bodied white tea made from both buds and young leaves. White Peony offers a slightly stronger flavour than Silver Needle, with notes of hay, peach, and a gentle floral sweetness. Wonderful both hot and cold-brewed.",
    thumbnail: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&q=80",
    ],
    variants: [
      { id: "var_w2_50", title: "50g", price: 1799, inventory_quantity: 25 },
      { id: "var_w2_100", title: "100g", price: 2999, inventory_quantity: 15 },
    ],
    collection_id: "col_white",
    tags: ["floral", "versatile", "chinese"],
    metadata: {
      origin_country: "China",
      health_benefits: "Rich in antioxidants, supports immune system, gentle on stomach",
      brewing_temp: "75-80°C",
      steep_time: "3-4 minutes",
      caffeine_level: "low",
    },
  },

  // Herbal Tea
  {
    id: "prod_herbal_1",
    title: "Organic Chamomile Bliss",
    handle: "organic-chamomile-bliss",
    description:
      "Pure Egyptian chamomile flowers, certified organic. This caffeine-free infusion delivers a gentle, apple-like sweetness with calming properties. Perfect as an evening wind-down ritual to promote restful sleep.",
    thumbnail: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    ],
    variants: [
      { id: "var_h1_50", title: "50g", price: 1299, inventory_quantity: 40 },
      { id: "var_h1_100", title: "100g", price: 2199, inventory_quantity: 25 },
    ],
    collection_id: "col_herbal",
    tags: ["caffeine-free", "relaxation", "organic", "sleep"],
    metadata: {
      origin_country: "Egypt",
      health_benefits: "Promotes sleep, reduces anxiety, soothes digestion",
      brewing_temp: "95-100°C",
      steep_time: "5-7 minutes",
      caffeine_level: "none",
    },
  },
  {
    id: "prod_herbal_2",
    title: "Peppermint Refresh",
    handle: "peppermint-refresh",
    description:
      "Vibrant, cooling peppermint leaves sourced from the Pacific Northwest. This invigorating herbal tea is caffeine-free and naturally refreshing, with a clean menthol finish that awakens the senses.",
    thumbnail: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80",
    ],
    variants: [
      { id: "var_h2_50", title: "50g", price: 1199, inventory_quantity: 35 },
      { id: "var_h2_100", title: "100g", price: 1999, inventory_quantity: 20 },
    ],
    collection_id: "col_herbal",
    tags: ["caffeine-free", "refreshing", "digestive"],
    metadata: {
      origin_country: "USA",
      health_benefits: "Aids digestion, relieves headaches, freshens breath",
      brewing_temp: "95-100°C",
      steep_time: "5-7 minutes",
      caffeine_level: "none",
    },
  },

  // Oolong Tea
  {
    id: "prod_oolong_1",
    title: "Tieguanyin Iron Goddess Oolong",
    handle: "tieguanyin-iron-goddess-oolong",
    description:
      "A legendary Chinese oolong with a complex orchid fragrance and a lingering sweet aftertaste. Tieguanyin is partially oxidised, creating a perfect balance between the freshness of green tea and the richness of black tea.",
    thumbnail: "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80",
    ],
    variants: [
      { id: "var_o1_50", title: "50g", price: 2199, inventory_quantity: 20 },
      { id: "var_o1_100", title: "100g", price: 3899, inventory_quantity: 12 },
    ],
    collection_id: "col_oolong",
    tags: ["premium", "orchid", "chinese"],
    metadata: {
      origin_country: "China",
      health_benefits: "Boosts metabolism, supports bone health, reduces stress",
      brewing_temp: "85-95°C",
      steep_time: "3-5 minutes",
      caffeine_level: "medium",
    },
  },
  {
    id: "prod_oolong_2",
    title: "Milk Oolong (Jin Xuan)",
    handle: "milk-oolong-jin-xuan",
    description:
      "A Taiwanese specialty prized for its naturally creamy, buttery flavour without any added dairy. Jin Xuan oolong has a light, smooth body with notes of cream, vanilla, and a subtle floral sweetness.",
    thumbnail: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80",
    ],
    variants: [
      { id: "var_o2_50", title: "50g", price: 1899, inventory_quantity: 25 },
      { id: "var_o2_100", title: "100g", price: 3299, inventory_quantity: 15 },
    ],
    collection_id: "col_oolong",
    tags: ["creamy", "smooth", "taiwanese"],
    metadata: {
      origin_country: "Taiwan",
      health_benefits: "Aids weight management, improves skin, rich in polyphenols",
      brewing_temp: "85-90°C",
      steep_time: "3-4 minutes",
      caffeine_level: "medium",
    },
  },

  // Matcha
  {
    id: "prod_matcha_1",
    title: "Ceremonial Grade Matcha",
    handle: "ceremonial-grade-matcha",
    description:
      "The finest stone-ground matcha from Uji, Kyoto. This vibrant emerald green powder produces a smooth, umami-rich cup with no bitterness. Perfect for traditional whisked matcha or a creamy matcha latte.",
    thumbnail: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&q=80",
    ],
    variants: [
      { id: "var_m1_30", title: "30g Tin", price: 2999, inventory_quantity: 20 },
      { id: "var_m1_100", title: "100g Tin", price: 7999, inventory_quantity: 10 },
    ],
    collection_id: "col_matcha",
    tags: ["premium", "japanese", "umami"],
    metadata: {
      origin_country: "Japan",
      health_benefits: "137x more antioxidants than green tea, boosts calm focus, detoxifies",
      brewing_temp: "70-75°C",
      steep_time: "Whisk 15-20 seconds",
      caffeine_level: "high",
    },
  },

  // Chai
  {
    id: "prod_chai_1",
    title: "Traditional Masala Chai",
    handle: "traditional-masala-chai",
    description:
      "An authentic Indian spice blend of Assam black tea with cinnamon, cardamom, ginger, cloves, and black pepper. Brew with milk for a rich, warming cup that captures the soul of Indian chai culture.",
    thumbnail: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80",
    ],
    variants: [
      { id: "var_c1_100", title: "100g", price: 1599, inventory_quantity: 35 },
      { id: "var_c1_250", title: "250g", price: 3299, inventory_quantity: 20 },
    ],
    collection_id: "col_chai",
    tags: ["spiced", "warming", "indian"],
    metadata: {
      origin_country: "India",
      health_benefits: "Anti-inflammatory, aids digestion, boosts immunity",
      brewing_temp: "95-100°C",
      steep_time: "4-5 minutes (simmer with milk)",
      caffeine_level: "medium",
    },
  },

  // Organic
  {
    id: "prod_organic_1",
    title: "Organic Rooibos Red Bush",
    handle: "organic-rooibos-red-bush",
    description:
      "Sustainably harvested from the Cederberg mountains of South Africa, this naturally caffeine-free rooibos has a sweet, nutty flavour with hints of vanilla. Certified organic and rich in minerals.",
    thumbnail: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    ],
    variants: [
      { id: "var_or1_100", title: "100g", price: 1399, inventory_quantity: 30 },
      { id: "var_or1_250", title: "250g", price: 2799, inventory_quantity: 18 },
    ],
    collection_id: "col_organic",
    tags: ["caffeine-free", "organic", "south-african"],
    metadata: {
      origin_country: "South Africa",
      health_benefits: "Rich in minerals, supports bone health, caffeine-free",
      brewing_temp: "95-100°C",
      steep_time: "5-7 minutes",
      caffeine_level: "none",
    },
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((p) => p.collection_id === collectionId);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
