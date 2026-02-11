import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo";
import { blogPosts, getBlogPost } from "@/lib/data/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getBlogPost(slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        images: [{ url: post.image, alt: post.title }],
        publishedTime: post.date,
        authors: [post.author],
      },
    };
  });
}

function renderMarkdown(content: string) {
  // Simple markdown-to-JSX for headings, paragraphs, bold, lists
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="mb-3 mt-8 font-display text-xl font-semibold text-primary-700"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={i}
          className="mb-2 mt-6 font-display text-lg font-semibold text-primary-700"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ") || line.startsWith("1. ")) {
      // Collect list items
      const listItems: string[] = [];
      const isOrdered = line.startsWith("1.");
      while (i < lines.length && (lines[i].startsWith("- ") || /^\d+\.\s/.test(lines[i]))) {
        listItems.push(lines[i].replace(/^[-\d.]+\s*/, ""));
        i++;
      }
      const ListTag = isOrdered ? "ol" : "ul";
      elements.push(
        <ListTag
          key={`list-${i}`}
          className={`mb-4 space-y-1 pl-6 text-sm leading-relaxed text-neutral-500 ${isOrdered ? "list-decimal" : "list-disc"}`}
        >
          {listItems.map((item, j) => (
            <li key={j}>{formatInline(item)}</li>
          ))}
        </ListTag>
      );
      continue; // i already incremented in the while loop
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      elements.push(
        <p key={i} className="mb-4 text-sm leading-relaxed text-neutral-500">
          {formatInline(line)}
        </p>
      );
    }

    i++;
  }

  return elements;
}

function formatInline(text: string): React.ReactNode {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-neutral-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      {/* Header */}
      <section className="bg-cream-50 py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-medium text-gold-500 hover:text-gold-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Blog
            </Link>

            <span className="mt-4 block text-xs font-semibold uppercase tracking-widest text-gold-500">
              {post.category}
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary-700 lg:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-neutral-500">
              <span>{post.author}</span>
              <span>&middot;</span>
              <span>
                {new Date(post.date).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>&middot;</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured image */}
      <Container>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl bg-cream-100">
          <div className="relative aspect-[16/9]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      {/* Article content */}
      <section className="py-12 lg:py-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {renderMarkdown(post.content)}
          </article>
        </Container>
      </section>

      {/* Related articles */}
      <section className="bg-sage-700 py-16 lg:py-20">
        <Container>
          <h2 className="text-center font-display text-2xl font-bold text-white">
            More Articles
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-cream-100">
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-gold-400 transition-colors group-hover:text-gold-500">
                  {r.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-cream-100/70">
                  {r.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
