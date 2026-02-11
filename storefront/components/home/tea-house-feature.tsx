import Image from "next/image";
import Link from "next/link";

export default function TeaHouseFeature() {
  return (
    <section className="bg-sage-700">
      <div className="grid lg:grid-cols-2">
        {/* Left: Content */}
        <div className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24">
          <h2 className="font-display text-3xl font-bold leading-tight text-white lg:text-4xl">
            Feel The Taste Of The Best Tea Making Just In Our Tea House
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-cream-100/80">
            We believe in the art of tea-making — from selecting the finest leaves
            to brewing at the perfect temperature. Our teas are crafted with care,
            preserving centuries-old traditions while embracing modern wellness.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex w-fit border-2 border-primary-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-500"
          >
            Explore More
          </Link>
        </div>

        {/* Right: Image + Testimonial Card */}
        <div className="relative min-h-[400px] lg:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1000&q=80"
            alt="Tea preparation"
            fill
            className="object-cover"
          />
          {/* Testimonial Card Overlay */}
          <div className="absolute bottom-8 left-8 right-8 rounded-lg bg-white/95 p-6 shadow-xl backdrop-blur-sm lg:left-auto lg:right-8 lg:max-w-sm">
            <svg className="h-8 w-8 text-gold-500/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500">
              &ldquo;The quality of HealThEA&apos;s teas is unmatched. Their Sencha green tea
              has become my morning ritual. Pure, authentic, and incredibly
              flavourful.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-500/20" />
              <div>
                <p className="text-sm font-semibold text-primary-700">Sarah Chen</p>
                <p className="text-xs text-neutral-500">Tea Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
