import Image from "next/image";
import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about HealThEA's mission to bring premium, healthy teas from the world's finest tea gardens to Canadian tea lovers.",
};

const values = [
  {
    title: "Quality First",
    description:
      "Every tea in our collection is hand-selected from the world's finest tea gardens, tested for purity, and delivered fresh to your door.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "Sustainable Sourcing",
    description:
      "We work directly with small farms and cooperatives, ensuring fair prices for growers and environmentally responsible cultivation practices.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "Health & Wellness",
    description:
      "We believe tea is nature's medicine. Each blend is curated for both its flavour profile and its health-promoting properties.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Community",
    description:
      "More than a shop, we're building a community of tea lovers who share our passion for healthy living and exceptional tea experiences.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const milestones = [
  { year: "2018", text: "Founded in Toronto with a passion for premium healthy teas" },
  { year: "2019", text: "Established direct partnerships with tea farms in Japan and China" },
  { year: "2020", text: "Launched online store, delivering across Canada" },
  { year: "2022", text: "Expanded sourcing to India, Sri Lanka, and Taiwan" },
  { year: "2024", text: "Over 200 satisfied customers and 35+ tea varieties" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-sage-700 py-20 text-white lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm italic text-gold-400">Our Story</p>
            <h1 className="mt-2 font-display text-4xl font-bold lg:text-5xl">
              A Passion for Premium, Healthy Tea
            </h1>
            <p className="mt-4 text-cream-100/80">
              HealThEA was born from a simple belief: everyone deserves access to
              the world&apos;s finest teas, sourced responsibly and delivered
              fresh to your door.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                subtitle="Who We Are"
                title="From Tea Lovers, For Tea Lovers"
              />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-neutral-500">
                <p>
                  Based in Toronto, Canada, HealThEA is a curated online tea
                  shop dedicated to bringing the world&apos;s healthiest and most
                  flavourful teas directly to your cup. We believe that tea is
                  more than a beverage — it&apos;s a ritual, a moment of calm,
                  and a path to better health.
                </p>
                <p>
                  Our journey began when our founder discovered the
                  transformative power of high-quality loose leaf tea during
                  travels through Asia&apos;s legendary tea regions. Inspired by
                  the craftsmanship and care that goes into every leaf, we set
                  out to share these exceptional teas with fellow Canadians.
                </p>
                <p>
                  Today, we source directly from family-owned farms and
                  cooperatives in Japan, China, India, Sri Lanka, and Taiwan.
                  Every tea in our collection is selected for its exceptional
                  quality, health benefits, and unique character.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream-100">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop"
                alt="Tea plantation with rolling green hills"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-cream-50 py-16 lg:py-24">
        <Container>
          <SectionHeading
            subtitle="Our Values"
            title="What Drives Us"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream-100 text-sage-700">
                  {value.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary-700">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading
            subtitle="Our Journey"
            title="Milestones"
          />
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="relative border-l-2 border-cream-100 pl-8">
              {milestones.map((item) => (
                <div key={item.year} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold-500 bg-white">
                    <div className="h-2 w-2 rounded-full bg-gold-500" />
                  </div>
                  <p className="text-sm font-semibold text-gold-500">{item.year}</p>
                  <p className="mt-1 text-sm text-neutral-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-sage-700 py-16 text-center text-white lg:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold lg:text-3xl">
            Ready to Discover Your Perfect Tea?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-cream-100/80">
            Browse our curated collection of premium teas from around the world.
          </p>
          <a
            href="/shop"
            className="mt-6 inline-block rounded border-2 border-gold-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-gold-400 transition-colors hover:bg-gold-500 hover:text-white"
          >
            Shop Now
          </a>
        </Container>
      </section>
    </>
  );
}
