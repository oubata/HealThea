import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse beautiful images of our premium teas, tea gardens, and the art of tea preparation.",
};

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&h=800&fit=crop",
    alt: "Fresh green tea leaves in a basket",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=400&fit=crop",
    alt: "Traditional tea ceremony setup",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
    alt: "Rolling hills of a tea plantation",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=600&h=400&fit=crop",
    alt: "Japanese tea garden with rows of tea bushes",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=800&fit=crop",
    alt: "Herbal tea with chamomile flowers",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&h=400&fit=crop",
    alt: "Matcha powder and whisk",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1563911892437-f9e5b5d8e3c6?w=600&h=400&fit=crop",
    alt: "Tea workers harvesting leaves",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=800&fit=crop",
    alt: "Ceramic teapot and cups",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&h=400&fit=crop",
    alt: "Assortment of dried tea leaves",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&h=400&fit=crop",
    alt: "Steaming cup of tea with autumn leaves",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&h=400&fit=crop",
    alt: "Tea plantation at sunrise",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1587888637308-a29b0e890670?w=600&h=400&fit=crop",
    alt: "Glass teapot with blooming tea",
    span: "",
  },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm italic text-gold-500">
              Visual Stories
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary-700 lg:text-4xl">
              Gallery
            </h1>
            <p className="mt-3 text-sm text-neutral-500">
              A visual journey through the world of tea — from garden to cup.
            </p>
          </div>
        </Container>
      </section>

      {/* Masonry Grid */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryImages.map((img, i) => (
              <div key={i} className="mb-4 break-inside-avoid">
                <div className="group relative overflow-hidden rounded-lg bg-cream-100">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={img.span ? 800 : 400}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="p-4 text-sm text-white">{img.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
