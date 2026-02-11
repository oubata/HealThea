import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { getProducts, formatPrice } from "@/lib/data/products";

function ProductCard({
  product,
}: {
  product: { title: string; handle: string; price: number; image: string };
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
          {formatPrice(product.price)} CAD
        </p>
      </div>
      <Link
        href={`/shop/${product.handle}`}
        className="mt-3 block w-full rounded bg-sage-700 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
      >
        View Product
      </Link>
    </div>
  );
}

export default async function PopularProducts() {
  const allProducts = await getProducts();
  const featured = allProducts.slice(0, 4).map((p) => ({
    title: p.title,
    handle: p.handle,
    price: Math.min(...p.variants.map((v) => v.price)),
    image: p.thumbnail,
  }));

  return (
    <section className="bg-cream-50 py-16 lg:py-24">
      <Container>
        <SectionHeading
          subtitle="Our Tea"
          title="Popular Products"
          description="Our customers' favourite picks — premium teas loved for their exceptional taste and health benefits."
        />

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
