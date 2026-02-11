import { Container } from "@/components/ui";

export default function ShopLoading() {
  return (
    <Container className="py-8 lg:py-12">
      <div className="animate-pulse">
        <div className="h-8 w-48 rounded bg-cream-100" />
        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-square rounded-lg bg-cream-100" />
              <div className="mt-4 h-4 w-3/4 rounded bg-cream-100" />
              <div className="mt-2 h-3 w-1/2 rounded bg-cream-100" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
