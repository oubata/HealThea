"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";

interface FaqItem {
  question: string;
  answer: string;
}

const faqCategories: { title: string; items: FaqItem[] }[] = [
  {
    title: "Ordering & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping within Canada typically takes 3-7 business days. Express shipping is available for 1-3 business day delivery. All orders over $50 qualify for free standard shipping.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we ship across Canada only. We're working on expanding to the United States and beyond in the near future. Sign up for our newsletter to be the first to know when international shipping becomes available.",
      },
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, contact us for a full refund or exchange. Unopened products can be returned for a full refund; opened products may qualify for store credit.",
      },
      {
        question: "How do I track my order?",
        answer:
          "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account and visiting the Orders page.",
      },
    ],
  },
  {
    title: "Tea & Products",
    items: [
      {
        question: "Are your teas organic?",
        answer:
          "Over 60% of our teas are certified organic. Each product page clearly indicates whether a tea is organic. All our teas, organic or not, are tested for pesticide residues and meet strict quality standards.",
      },
      {
        question: "How should I store my tea?",
        answer:
          "Store your tea in a cool, dark, dry place, away from strong odours. Keep it in an airtight container — the resealable pouches we ship in work well. Properly stored, most teas stay fresh for 6-12 months. Green and white teas are best consumed within 6 months for optimal freshness.",
      },
      {
        question: "What's the difference between loose leaf and tea bags?",
        answer:
          "Loose leaf tea uses whole or large tea leaves, offering better flavour, aroma, and health benefits. Tea bags typically contain smaller, broken leaves (fannings or dust). We offer premium loose leaf tea to ensure you get the best possible cup.",
      },
      {
        question: "Do you offer caffeine-free options?",
        answer:
          "Yes! Our herbal tea collection is naturally caffeine-free. This includes our Chamomile Blossom and Peppermint Herbal teas. Check each product's detail page for caffeine level information.",
      },
    ],
  },
  {
    title: "Brewing & Preparation",
    items: [
      {
        question: "What water temperature should I use?",
        answer:
          "It depends on the type of tea: Green tea: 70-80°C, White tea: 75-85°C, Oolong: 85-95°C, Black tea: 95-100°C, Herbal: 100°C. Using the correct temperature prevents bitterness and brings out the best flavour.",
      },
      {
        question: "How much tea should I use per cup?",
        answer:
          "As a general rule, use about 1 teaspoon (2-3g) of loose leaf tea per 250ml (8oz) of water. For white tea, use slightly more (2 teaspoons) as the leaves are larger and lighter. Adjust to your personal taste preference.",
      },
      {
        question: "Can I re-steep loose leaf tea?",
        answer:
          "Absolutely! High-quality loose leaf tea can often be steeped 2-5 times. Oolongs and pu-erh teas are especially good for multiple infusions. Increase steeping time by 30-60 seconds with each subsequent brew. Each infusion can reveal new flavour notes.",
      },
    ],
  },
  {
    title: "Account & Payment",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, Mastercard, American Express, and PayPal. All transactions are securely processed through our encrypted payment system. We never store your credit card information.",
      },
      {
        question: "Do you have a rewards program?",
        answer:
          "We're developing a rewards program that will launch soon. In the meantime, sign up for our newsletter to receive exclusive discounts and early access to new teas.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' in the top navigation or visit our registration page. Creating an account lets you track orders, save addresses, and get personalized recommendations. It's free and takes less than a minute.",
      },
    ],
  },
];

function AccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-cream-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium text-neutral-900">
          {item.question}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 text-sm leading-relaxed text-neutral-500">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FaqContent() {
  return (
    <>
      {/* FAQ Accordions */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            {faqCategories.map((category) => (
              <div key={category.title}>
                <h2 className="font-display text-xl font-semibold text-primary-700">
                  {category.title}
                </h2>
                <div className="mt-4">
                  {category.items.map((item) => (
                    <AccordionItem key={item.question} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Still have questions */}
      <section className="bg-cream-50 py-12 lg:py-16">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <h2 className="font-display text-xl font-semibold text-primary-700">
              Still Have Questions?
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Can&apos;t find what you&apos;re looking for? We&apos;re here to
              help.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded border-2 border-gold-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-gold-500 transition-colors hover:bg-gold-500 hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
