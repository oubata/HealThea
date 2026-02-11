import type { Metadata } from "next";
import Image from "next/image";
import { Container, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read what our customers are saying about HealThEA's premium teas and their experience.",
};

interface Review {
  name: string;
  location: string;
  rating: number;
  title: string;
  text: string;
  product: string;
  date: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    name: "Sarah M.",
    location: "Toronto, ON",
    rating: 5,
    title: "Best green tea I've ever had!",
    text: "The Japanese Sencha from HealThEA is absolutely exceptional. The flavour is so fresh and clean — nothing like the grocery store green teas I used to buy. I've been drinking it every morning for three months now and can genuinely feel a difference in my energy levels.",
    product: "Japanese Sencha Green Tea",
    date: "2025-01-12",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "David L.",
    location: "Vancouver, BC",
    rating: 5,
    title: "Incredible matcha quality",
    text: "As someone who's tried matcha from dozens of suppliers, I can confidently say HealThEA's Ceremonial Matcha is top-tier. Beautiful bright green colour, smooth without bitterness, and amazing umami flavour. The packaging is also lovely — makes a great gift.",
    product: "Ceremonial Grade Matcha",
    date: "2024-12-28",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Priya K.",
    location: "Ottawa, ON",
    rating: 5,
    title: "My new favourite tea shop",
    text: "I ordered the Darjeeling First Flush and the Silver Needle White Tea, and both exceeded my expectations. The teas arrived fresh, well-packaged, and with detailed brewing instructions. Customer service was also incredibly responsive when I had a question about my order.",
    product: "Darjeeling First Flush",
    date: "2024-12-15",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Michael R.",
    location: "Calgary, AB",
    rating: 4,
    title: "Great Earl Grey with a twist",
    text: "The Earl Grey is excellent — really balanced bergamot flavour without being overwhelming. I've been steeping it a bit longer than recommended and it holds up well without getting bitter. Shipping to Alberta was fast too. My only wish is for larger size options.",
    product: "Earl Grey Black Tea",
    date: "2024-11-30",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Emily T.",
    location: "Montreal, QC",
    rating: 5,
    title: "The chamomile is so calming",
    text: "I've been struggling with sleep and started drinking HealThEA's Chamomile Blossom tea before bed. It's become my nightly ritual and has genuinely helped me relax. The flowers are whole and beautiful, and the aroma alone starts the relaxation process.",
    product: "Chamomile Blossom Herbal Tea",
    date: "2024-11-18",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "James W.",
    location: "Halifax, NS",
    rating: 5,
    title: "Oolong perfection",
    text: "The Ti Kuan Yin Oolong is spectacular. I love how I can re-steep it multiple times and each cup tastes slightly different. The floral notes are delicate and the finish is wonderfully smooth. Worth every penny for this quality of tea.",
    product: "Ti Kuan Yin Oolong",
    date: "2024-11-05",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-gold-500" : "text-cream-100"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm italic text-gold-500">
              Testimonials
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary-700 lg:text-4xl">
              What Our Customers Say
            </h1>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Stars rating={Math.round(Number(avgRating))} />
              <span className="text-sm text-neutral-500">
                {avgRating} out of 5 based on {reviews.length} reviews
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews grid */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="rounded-lg border border-cream-100 p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-cream-100">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {review.name}
                    </p>
                    <p className="text-xs text-neutral-500">{review.location}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <Stars rating={review.rating} />
                </div>

                <h3 className="mt-3 text-sm font-semibold text-primary-700">
                  {review.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {review.text}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-cream-100 pt-3">
                  <span className="text-xs font-medium text-gold-500">
                    {review.product}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {new Date(review.date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
