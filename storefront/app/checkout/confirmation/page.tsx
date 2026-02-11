import Link from "next/link";
import { Container } from "@/components/ui";

export const metadata = {
  title: "Order Confirmed",
};

export default function ConfirmationPage() {
  return (
    <Container className="py-16 text-center lg:py-24">
      {/* Checkmark */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-500/10">
        <svg
          className="h-10 w-10 text-primary-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="mt-6 font-display text-3xl font-bold text-primary-700 lg:text-4xl">
        Thank You for Your Order!
      </h1>
      <p className="mx-auto mt-4 max-w-md text-neutral-500">
        Your order has been placed successfully. You&apos;ll receive a confirmation
        email shortly with your order details and tracking information.
      </p>

      <div className="mx-auto mt-8 max-w-sm rounded-lg border border-cream-100 bg-white p-6">
        <div className="text-sm text-neutral-500">
          <p>
            <span className="font-medium text-neutral-900">Order Number:</span>{" "}
            #HT-{Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
          <p className="mt-2">
            <span className="font-medium text-neutral-900">
              Estimated Delivery:
            </span>{" "}
            5-7 business days
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/shop"
          className="inline-flex border-2 border-gold-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-gold-500 transition-colors hover:bg-gold-500 hover:text-white"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account/orders"
          className="inline-flex bg-sage-700 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
        >
          View Orders
        </Link>
      </div>
    </Container>
  );
}
