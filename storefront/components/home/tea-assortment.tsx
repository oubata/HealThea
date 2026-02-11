import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";

const categories = [
  {
    name: "Green Tea",
    slug: "green-tea",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=600&q=80",
  },
  {
    name: "White Tea",
    slug: "white-tea",
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&q=80",
  },
  {
    name: "Black Tea",
    slug: "black-tea",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80",
  },
  {
    name: "Organic Tea",
    slug: "organic-tea",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
  },
];

export default function TeaAssortment() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          subtitle="Discover"
          title="Tea Assortment"
          description="Explore our curated selection of the world's finest teas, each chosen for its unique flavour profile and health benefits."
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[3/4]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Category name */}
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="font-display text-lg font-semibold text-white lg:text-xl">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
