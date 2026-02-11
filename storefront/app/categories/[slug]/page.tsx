import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui";
import { ProductGrid } from "@/components/product";
import { getCategories, getCategoryBySlug } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description.slice(0, 160),
    openGraph: {
      title: `${category.name} | HealThEA`,
      description: category.description.slice(0, 160),
      images: [{ url: category.image, alt: category.name }],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = await getProductsByCategory(category.id);

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden lg:h-80">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <Container>
            <nav className="mb-3 text-sm text-cream-100/80">
              <a href="/shop" className="hover:text-white">
                Shop
              </a>
              <span className="mx-2">/</span>
              <span className="text-white">{category.name}</span>
            </nav>
            <h1 className="font-display text-4xl font-bold text-white lg:text-5xl">
              {category.name}
            </h1>
          </Container>
        </div>
      </div>

      {/* Description + Products */}
      <Container className="py-8 lg:py-12">
        <p className="mb-8 max-w-2xl text-neutral-500">{category.description}</p>

        <p className="mb-6 text-sm text-neutral-500">
          {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""}
        </p>

        <ProductGrid products={categoryProducts} />
      </Container>
    </>
  );
}
