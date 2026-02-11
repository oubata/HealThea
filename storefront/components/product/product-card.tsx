import Image from "next/image";
import Link from "next/link";
import { type Product, formatPrice } from "@/lib/data/products";
import AddToCartButton from "./add-to-cart-button";

export default function ProductCard({ product }: { product: Product }) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const defaultVariant = product.variants[0];

  return (
    <div className="group">
      <Link href={`/shop/${product.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-cream-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-4">
        <Link
          href={`/shop/${product.handle}`}
          className="text-sm font-medium text-primary-700 transition-colors group-hover:text-gold-500"
        >
          {product.title}
        </Link>
        <p className="mt-1 text-sm text-neutral-500">
          From {formatPrice(lowestPrice)} CAD
        </p>
        <p className="mt-0.5 text-xs text-neutral-500/70">
          {product.metadata.origin_country}
        </p>
      </div>
      <AddToCartButton
        productId={product.id}
        variantId={defaultVariant.id}
        title={product.title}
        variantTitle={defaultVariant.title}
        price={defaultVariant.price}
        image={product.thumbnail}
        handle={product.handle}
      />
    </div>
  );
}
