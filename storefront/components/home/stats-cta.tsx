"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 35, suffix: "+", label: "Tea Varieties" },
  { value: 8, suffix: "", label: "Tea Origins" },
  { value: 100, suffix: "%", label: "Natural Ingredients" },
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const stepTime = Math.max(Math.floor(duration / target), 20);
          let current = 0;
          const timer = setInterval(() => {
            current += 1;
            setCount(current);
            if (current >= target) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCta() {
  return (
    <section className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left: Image */}
        <div className="relative min-h-[400px] lg:min-h-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1000&q=80"
            alt="Tea pouring"
            fill
            className="object-cover"
          />
        </div>

        {/* Right: Content + Stats */}
        <div className="flex flex-col justify-center bg-cream-50 px-8 py-16 lg:px-16 lg:py-24">
          <p className="font-display text-sm italic text-gold-500">
            Wellness &amp; Ritual
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-primary-700 lg:text-4xl">
            Take a break, drink some tea
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-neutral-500">
            Whether you&apos;re working from home or need a moment of calm, our teas
            are the perfect companion. Rich in antioxidants and crafted for
            flavour, each cup is an invitation to pause and recharge.
          </p>

          {/* Stats Grid */}
          <div className="mt-10 grid grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold text-gold-500 lg:text-4xl">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/shop"
            className="mt-10 inline-flex w-fit border-2 border-gold-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-gold-500 transition-colors hover:bg-gold-500 hover:text-white"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
