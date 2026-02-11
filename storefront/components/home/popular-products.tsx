import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";

// Placeholder products — will be replaced with Medusa API data
const placeholderProducts = [
  {
    id: "1",
    title: "Japanese Sencha Green Tea",
    handle: "japanese-sencha-green-tea",
    price: 1499,
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&q=80",
  },
  {
    id: "2",
    title: "Darjeeling Black Tea",
    handle: "darjeeling-black-tea",
    price: 1899,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80",
  },
  {
    id: "3",
    title: "Silver Needle White Tea",
    handle: "silver-needle-white-tea",
    price: 2499,
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=500&q=80",
  },
  {
    id: "4",
    title: "Organic Chamomile Herbal",
    handle: "organic-chamomile-herbal",
    price: 1299,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
  },
];

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)} CAD`;
}

function ProductCard({
  product,
}: {
  product: (typeof placeholderProducts)[number];
}) {
  return (
    <div className="group">
      <Link href={`/shop/${product.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-cream-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-4">
        <Link
          href={`/shop/${product.handle}`}
          className="font-body text-sm font-medium text-primary-700 transition-colors group-hover:text-gold-500"
        >
          {product.title}
        </Link>
        <p className="mt-1 text-sm font-medium text-neutral-500">
          {formatPrice(product.price)}
        </p>
      </div>
      <button className="mt-3 w-full rounded bg-sage-700 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700">
        Add to Cart
      </button>
    </div>
  );
}

export default function PopularProducts() {
  return (
    <section className="bg-cream-50 py-16 lg:py-24">
      <Container>
        <SectionHeading
          subtitle="Our Tea"
          title="Popular Products"
          description="Our customers' favourite picks — premium teas loved for their exceptional taste and health benefits."
        />

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {placeholderProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
