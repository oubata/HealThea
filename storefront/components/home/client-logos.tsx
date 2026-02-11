import { Container, SectionHeading } from "@/components/ui";

// Placeholder logos — will be replaced with real partner logos or removed
const clients = [
  "Partner One",
  "Partner Two",
  "Partner Three",
  "Partner Four",
  "Partner Five",
];

export default function ClientLogos() {
  return (
    <section className="bg-cream-50 py-16 lg:py-20">
      <Container>
        <SectionHeading subtitle="Client" title="Our beloved clients." />

        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {clients.map((name) => (
            <div
              key={name}
              className="flex h-16 w-32 items-center justify-center rounded-md bg-white px-4 shadow-sm"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500/60">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
