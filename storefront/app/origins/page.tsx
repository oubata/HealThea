import Image from "next/image";
import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tea Origins",
  description:
    "Explore the world's legendary tea-growing regions. From Japan's misty highlands to India's Himalayan foothills, discover where HealThEA sources its premium teas.",
};

const origins = [
  {
    country: "Japan",
    region: "Shizuoka & Uji, Kyoto",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&h=500&fit=crop",
    description:
      "Japan's tea culture spans over a thousand years. The misty hills of Shizuoka produce most of the country's sencha, while Uji in Kyoto is revered as the birthplace of ceremonial matcha. Japanese teas are known for their umami richness, vibrant green colour, and meticulous processing.",
    teas: ["Sencha", "Matcha", "Gyokuro", "Hojicha"],
    climate: "Temperate with humid summers and cool mountain mists",
  },
  {
    country: "China",
    region: "Fujian, Zhejiang & Anxi",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=500&fit=crop",
    description:
      "China is the birthplace of tea, with a history stretching back over 5,000 years. Fujian's mountains produce the prized Silver Needle white tea, Zhejiang is home to Gunpowder green tea, and Anxi's terraced hills give us the legendary Tieguanyin oolong. Chinese tea craftsmanship is unparalleled.",
    teas: ["Silver Needle", "Gunpowder Green", "Tieguanyin Oolong", "Pu-erh"],
    climate: "Subtropical with misty mountain altitudes and mineral-rich soil",
  },
  {
    country: "India",
    region: "Darjeeling & Assam",
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=500&fit=crop",
    description:
      "India's tea legacy was forged in the mist-covered Himalayan foothills of Darjeeling — home to the 'Champagne of Teas' — and the lush river valleys of Assam, which produce the world's boldest, maltiest black teas. Indian chai culture has also given the world one of its most beloved spiced tea traditions.",
    teas: ["Darjeeling First Flush", "Assam CTC", "Masala Chai", "Nilgiri"],
    climate: "Tropical monsoon in Assam; cool Himalayan altitude in Darjeeling",
  },
  {
    country: "Sri Lanka",
    region: "Ceylon Highlands",
    image:
      "https://images.unsplash.com/photo-1555400113-065b1a14a4ed?w=800&h=500&fit=crop",
    description:
      "Known to the tea world as Ceylon, Sri Lanka's central highlands produce elegant black teas at elevations up to 2,500 metres. The high-grown teas are prized for their bright, citrusy character — the perfect base for our Earl Grey Supreme. Each estate has its own terroir, much like fine wine.",
    teas: ["Ceylon Black", "Earl Grey", "Ceylon Green"],
    climate: "Tropical highland with cool temperatures and abundant rainfall",
  },
  {
    country: "South Africa",
    region: "Cederberg Mountains",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=500&fit=crop",
    description:
      "The ancient Cederberg mountains north of Cape Town are the only place on Earth where rooibos grows naturally. This caffeine-free 'red bush' has been used by indigenous communities for centuries. Rich in minerals and antioxidants, rooibos is South Africa's gift to the global tea world.",
    teas: ["Rooibos Red Bush", "Green Rooibos", "Honeybush"],
    climate: "Mediterranean with hot, dry summers and cool, wet winters",
  },
  {
    country: "Egypt",
    region: "Nile Valley",
    image:
      "https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=800&h=500&fit=crop",
    description:
      "The fertile Nile Valley has cultivated chamomile for thousands of years. Egyptian chamomile is considered the finest in the world — its golden blossoms are larger, more aromatic, and richer in essential oils than any other variety. A cornerstone of ancient herbal medicine traditions.",
    teas: ["Chamomile", "Hibiscus", "Peppermint"],
    climate: "Arid with rich alluvial soil along the Nile floodplain",
  },
];

export default function OriginsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-sage-700 py-20 text-white lg:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm italic text-gold-400">
              From Garden to Cup
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold lg:text-5xl">
              Tea Origins Around the World
            </h1>
            <p className="mt-4 text-cream-100/80">
              Every tea has a story that begins in the soil, climate, and
              traditions of its homeland. Discover the legendary regions where
              HealThEA sources its premium teas.
            </p>
          </div>
        </Container>
      </section>

      {/* World Map Intro */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading
            subtitle="Our Sourcing Regions"
            title="Six Countries, Centuries of Tradition"
          />
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-neutral-500">
            We work directly with family-owned farms and cooperatives across six
            countries, ensuring exceptional quality, fair trade practices, and
            sustainable cultivation.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {origins.map((origin) => (
              <a
                key={origin.country}
                href={`#${origin.country.toLowerCase().replace(/\s/g, "-")}`}
                className="group rounded-lg border border-cream-100 p-6 text-center transition-all hover:border-gold-500 hover:shadow-md"
              >
                <h3 className="font-display text-xl font-semibold text-primary-700 group-hover:text-gold-600">
                  {origin.country}
                </h3>
                <p className="mt-1 text-xs text-neutral-400">{origin.region}</p>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Origin Details */}
      {origins.map((origin, index) => (
        <section
          key={origin.country}
          id={origin.country.toLowerCase().replace(/\s/g, "-")}
          className={`py-16 lg:py-24 ${index % 2 === 0 ? "bg-cream-50" : ""}`}
        >
          <Container>
            <div
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                index % 2 !== 0 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div className={index % 2 !== 0 ? "lg:col-start-2" : ""}>
                <p className="font-display text-sm italic text-gold-500">
                  {origin.region}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-primary-700 lg:text-4xl">
                  {origin.country}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                  {origin.description}
                </p>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Climate
                  </h4>
                  <p className="mt-1 text-sm text-neutral-500">
                    {origin.climate}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Featured Teas
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {origin.teas.map((tea) => (
                      <span
                        key={tea}
                        className="rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-sage-700"
                      >
                        {tea}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-cream-100 ${
                  index % 2 !== 0 ? "lg:col-start-1" : ""
                }`}
              >
                <Image
                  src={origin.image}
                  alt={`Tea growing region in ${origin.country}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-sage-700 py-16 text-center text-white lg:py-20">
        <Container>
          <h2 className="font-display text-2xl font-bold lg:text-3xl">
            Taste the World&apos;s Finest Teas
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-cream-100/80">
            Each cup tells the story of its origin. Explore our collection and
            find your perfect tea.
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
