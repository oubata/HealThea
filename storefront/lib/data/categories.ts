export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "col_green",
    name: "Green Tea",
    slug: "green-tea",
    description:
      "Unoxidised teas with fresh, grassy flavours. Rich in catechins and antioxidants, green teas are prized for their delicate taste and health benefits.",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=1200&q=80",
  },
  {
    id: "col_black",
    name: "Black Tea",
    slug: "black-tea",
    description:
      "Fully oxidised teas with bold, robust flavours. From malty Assam to floral Darjeeling, black teas offer depth and complexity in every cup.",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=1200&q=80",
  },
  {
    id: "col_white",
    name: "White Tea",
    slug: "white-tea",
    description:
      "The most delicate tea, minimally processed from young buds and leaves. White teas offer subtle sweetness, floral notes, and the highest antioxidant content.",
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=1200&q=80",
  },
  {
    id: "col_organic",
    name: "Organic Tea",
    slug: "organic-tea",
    description:
      "Certified organic selections grown without synthetic pesticides or fertilisers. Pure teas that are good for you and good for the planet.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80",
  },
  {
    id: "col_herbal",
    name: "Herbal Tea",
    slug: "herbal-tea",
    description:
      "Caffeine-free infusions crafted from flowers, herbs, and fruits. From soothing chamomile to refreshing peppermint, our herbal teas offer flavour and wellness without caffeine.",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&q=80",
  },
  {
    id: "col_oolong",
    name: "Oolong Tea",
    slug: "oolong-tea",
    description:
      "Partially oxidised teas that bridge the gap between green and black. Oolong offers complex flavour profiles ranging from floral and creamy to roasted and fruity.",
    image: "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=1200&q=80",
  },
  {
    id: "col_matcha",
    name: "Matcha",
    slug: "matcha",
    description:
      "Stone-ground Japanese green tea powder, whisked into a frothy, vibrant cup. Matcha delivers a concentrated dose of antioxidants, L-theanine, and calm energy.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&q=80",
  },
  {
    id: "col_chai",
    name: "Chai",
    slug: "chai",
    description:
      "Aromatic spiced tea blends inspired by Indian chai traditions. Warm cinnamon, cardamom, ginger, and cloves meet bold black tea for a comforting, spicy cup.",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=1200&q=80",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
