import type { Metadata } from "next";
import { Container } from "@/components/ui";
import FaqContent from "./faq-content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about HealThEA's teas, ordering, shipping, brewing, and more.",
};

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm italic text-gold-500">
              Help Centre
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary-700 lg:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-sm text-neutral-500">
              Find answers to common questions about our teas, ordering,
              shipping, and more.
            </p>
          </div>
        </Container>
      </section>

      <FaqContent />
    </>
  );
}
