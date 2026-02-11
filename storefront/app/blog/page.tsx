import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { blogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tea health benefits, brewing guides, origin stories, and more from the HealThEA team.",
};

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm italic text-gold-500">
              Articles
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary-700 lg:text-4xl">
              The HealThEA Journal
            </h1>
            <p className="mt-3 text-sm text-neutral-500">
              Discover the world of tea through health tips, brewing guides, and
              stories from the farms we partner with.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured article */}
      <section className="py-12 lg:py-16">
        <Container>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream-100">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">
                  {featured.category}
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-primary-700 transition-colors group-hover:text-gold-500 lg:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
                  <span>{featured.author}</span>
                  <span>&middot;</span>
                  <span>
                    {new Date(featured.date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span>&middot;</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* Article grid */}
      <section className="bg-sage-700 py-16 lg:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-cream-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-400/70">
                    {post.category}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-gold-400 transition-colors group-hover:text-gold-500">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-cream-100/70">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-cream-100/50">
                    <span>{post.author}</span>
                    <span>&middot;</span>
                    <span>
                      {new Date(post.date).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
