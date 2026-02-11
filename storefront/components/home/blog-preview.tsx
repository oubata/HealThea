import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";

// Placeholder articles — will be replaced with real blog content
const articles = [
  {
    slug: "health-benefits-of-green-tea",
    title: "The Remarkable Health Benefits of Green Tea",
    excerpt:
      "Discover why green tea has been celebrated for centuries as one of the healthiest beverages on the planet.",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=600&q=80",
  },
  {
    slug: "perfect-brew-guide",
    title: "How to Brew the Perfect Cup Every Time",
    excerpt:
      "Temperature, timing, and technique — master the art of tea brewing with our comprehensive guide.",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80",
  },
  {
    slug: "tea-origins-around-the-world",
    title: "A Journey Through Tea Origins Around the World",
    excerpt:
      "From the misty mountains of Darjeeling to the gardens of Kyoto — explore where your favourite teas come from.",
    image: "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=600&q=80",
  },
];

function ArticleCard({ article }: { article: (typeof articles)[number] }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-sage-700">
        <div className="relative aspect-[16/10]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-gold-400 transition-colors group-hover:text-gold-500">
            {article.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-cream-100/70">
            {article.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPreview() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          subtitle="Articles"
          title="Articles we write."
          description="Insights, guides, and stories from the world of tea."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
