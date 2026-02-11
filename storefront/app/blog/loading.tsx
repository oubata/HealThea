import { Container } from "@/components/ui";

export default function BlogLoading() {
  return (
    <Container className="py-12 lg:py-16">
      <div className="animate-pulse">
        <div className="mx-auto h-8 w-64 rounded bg-cream-100" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[16/10] rounded-lg bg-cream-100" />
              <div className="mt-4 h-5 w-3/4 rounded bg-cream-100" />
              <div className="mt-2 h-3 w-full rounded bg-cream-100" />
              <div className="mt-1 h-3 w-2/3 rounded bg-cream-100" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
