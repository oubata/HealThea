import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=600&q=80",
    alt: "Tea leaves close-up",
    className: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80",
    alt: "Herbal tea blend",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80",
    alt: "Black tea cup",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80",
    alt: "Tea ceremony",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&q=80",
    alt: "White tea leaves",
    className: "col-span-1 row-span-1",
  },
];

export default function ImageGallery() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 lg:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-lg ${img.className}`}
            >
              <div className="relative h-full min-h-[200px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial overlay card */}
        <div className="relative -mt-24 ml-auto mr-4 max-w-sm rounded-lg bg-white/95 p-6 shadow-xl backdrop-blur-sm lg:mr-16">
          <svg className="h-6 w-6 text-gold-500/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            &ldquo;I&apos;ve been ordering from HealThEA for six months now. Their
            organic collection is outstanding — each tea feels like a wellness
            ritual.&rdquo;
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-500/20" />
            <div>
              <p className="text-sm font-semibold text-primary-700">Michael Torres</p>
              <p className="text-xs text-neutral-500">Wellness Coach</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
