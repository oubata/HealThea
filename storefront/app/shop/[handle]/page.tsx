import { notFound } from "next/navigation";
import { getProducts, getProductByHandle, getProductsByCategory, formatPrice } from "@/lib/data/products";
import { Container } from "@/components/ui";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo";
import ProductDetail from "./product-detail";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [{ url: product.thumbnail, alt: product.title }],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  // Find related products from same category (excluding current)
  const allCategoryProducts = product.collection_id
    ? await getProductsByCategory(product.collection_id)
    : [];
  const related = allCategoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Shop", url: "/shop" },
          { name: product.title, url: `/shop/${product.handle}` },
        ]}
      />
      <Container className="py-8 lg:py-12">
        <ProductDetail product={product} />
      </Container>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="border-t border-cream-100 bg-white">
          <Container className="py-12 lg:py-16">
            <h2 className="mb-8 font-display text-2xl font-bold text-primary-700">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {related.map((p) => (
                <a key={p.id} href={`/shop/${p.handle}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-cream-100">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-primary-700 group-hover:text-gold-500">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    From {formatPrice(Math.min(...p.variants.map((v) => v.price)))} CAD
                  </p>
                </a>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
