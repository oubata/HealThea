import type { Product } from "@/lib/data/products";
import type { BlogPost } from "@/lib/data/blog";

interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "HealThEA",
        url: "https://healthea.ca",
        logo: "https://healthea.ca/logo.png",
        description:
          "Premium healthy teas sourced from the finest tea gardens around the world.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Tea Lane",
          addressLocality: "Toronto",
          addressRegion: "ON",
          postalCode: "M5V 2T6",
          addressCountry: "CA",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-416-555-0123",
          contactType: "customer service",
          email: "hello@healthea.ca",
          availableLanguage: "English",
        },
        sameAs: [
          "https://facebook.com/healthea",
          "https://instagram.com/healthea",
          "https://twitter.com/healthea",
        ],
      }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const highestPrice = Math.max(...product.variants.map((v) => v.price));

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.images,
        brand: {
          "@type": "Brand",
          name: "HealThEA",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "CAD",
          lowPrice: (lowestPrice / 100).toFixed(2),
          highPrice: (highestPrice / 100).toFixed(2),
          offerCount: product.variants.length,
          availability: "https://schema.org/InStock",
        },
      }}
    />
  );
}

export function ArticleJsonLd({ post }: { post: BlogPost }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: {
          "@type": "Organization",
          name: "HealThEA",
          logo: {
            "@type": "ImageObject",
            url: "https://healthea.ca/logo.png",
          },
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `https://healthea.ca${item.url}`,
        })),
      }}
    />
  );
}
