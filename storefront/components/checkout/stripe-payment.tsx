"use client";

import { useState } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

interface StripePaymentFormProps {
  onPaymentReady: () => void;
  onError: (error: string) => void;
}

function StripePaymentForm({ onPaymentReady, onError }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [ready, setReady] = useState(false);

  if (!stripe || !elements) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-10 rounded bg-cream-100" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-10 rounded bg-cream-100" />
          <div className="h-10 rounded bg-cream-100" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PaymentElement
        onReady={() => {
          setReady(true);
          onPaymentReady();
        }}
        onChange={(e) => {
          if (e.complete) {
            onPaymentReady();
          }
          if (e.value?.type) {
            // Payment method selected
          }
        }}
      />
      {!ready && (
        <div className="mt-2 text-xs text-neutral-500">
          Loading payment form...
        </div>
      )}
    </div>
  );
}

interface StripePaymentProps {
  clientSecret: string;
  onPaymentReady: () => void;
  onError: (error: string) => void;
}

export default function StripePayment({
  clientSecret,
  onPaymentReady,
  onError,
}: StripePaymentProps) {
  if (!stripePromise) {
    return (
      <div className="rounded-lg border border-cream-100 bg-cream-50 p-4">
        <p className="text-sm text-neutral-500">
          Stripe is not configured. Add your publishable key to{" "}
          <code className="text-xs">.env.local</code> as{" "}
          <code className="text-xs">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>.
        </p>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#C4973B",
            colorBackground: "#ffffff",
            fontFamily: "Inter, system-ui, sans-serif",
            borderRadius: "6px",
          },
        },
      }}
    >
      <StripePaymentForm onPaymentReady={onPaymentReady} onError={onError} />
    </Elements>
  );
}

// Export for use in checkout confirmation
export { stripePromise };
