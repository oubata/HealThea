import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { blogPosts } from "@/lib/data/blog";

function ArticleCard({
  article,
}: {
  article: { slug: string; title: string; excerpt: string; image: string };
}) {
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
  const featured = blogPosts.slice(0, 3);

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          subtitle="Articles"
          title="Articles we write."
          description="Insights, guides, and stories from the world of tea."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
