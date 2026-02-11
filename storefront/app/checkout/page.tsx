"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data/products";
import { Container } from "@/components/ui";

type Step = "shipping" | "method" | "payment" | "review";

const steps: { key: Step; label: string }[] = [
  { key: "shipping", label: "Shipping Info" },
  { key: "method", label: "Shipping Method" },
  { key: "payment", label: "Payment" },
  { key: "review", label: "Review" },
];

const SHIPPING_THRESHOLD = 5000;
const shippingOptions = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 599,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "1-2 business days",
    price: 1299,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, itemCount } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>("shipping");

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const shippingCost =
    subtotal >= SHIPPING_THRESHOLD
      ? 0
      : shippingOptions.find((o) => o.id === selectedShipping)?.price ?? 599;
  const estimatedTax = Math.round(subtotal * 0.13);
  const total = subtotal + shippingCost + estimatedTax;

  const stepIndex = steps.findIndex((s) => s.key === currentStep);

  function nextStep() {
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].key);
    }
  }

  function prevStep() {
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].key);
    }
  }

  function handlePlaceOrder() {
    // In production, this calls Medusa's cart completion endpoint
    clearCart();
    router.push("/checkout/confirmation");
  }

  if (itemCount === 0 && currentStep !== "review") {
    return (
      <Container className="py-16 text-center">
        <p className="text-lg text-neutral-500">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex border-2 border-gold-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-gold-500 transition-colors hover:bg-gold-500 hover:text-white"
        >
          Continue Shopping
        </Link>
      </Container>
    );
  }

  return (
    <>
      <div className="border-b border-cream-100 bg-white">
        <Container className="py-8">
          <h1 className="font-display text-3xl font-bold text-primary-700">
            Checkout
          </h1>
          {/* Step Indicators */}
          <div className="mt-6 flex gap-2">
            {steps.map((step, i) => (
              <div key={step.key} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                    i <= stepIndex
                      ? "bg-gold-500 text-white"
                      : "bg-cream-100 text-neutral-500"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`hidden text-sm sm:inline ${
                    i === stepIndex
                      ? "font-medium text-primary-700"
                      : "text-neutral-500"
                  }`}
                >
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <div className="mx-2 h-px w-8 bg-cream-100" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12">
          {/* Main Form Area */}
          <div>
            {/* Step 1: Shipping Info */}
            {currentStep === "shipping" && (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary-700">
                  Shipping Information
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-900">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                      }
                      className="w-full rounded border border-cream-100 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-900">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                      }
                      className="w-full rounded border border-cream-100 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-neutral-900">
                      Email
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, email: e.target.value })
                      }
                      className="w-full rounded border border-cream-100 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-neutral-900">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, phone: e.target.value })
                      }
                      className="w-full rounded border border-cream-100 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-neutral-900">
                      Address
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                      className="w-full rounded border border-cream-100 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-900">
                      City
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, city: e.target.value })
                      }
                      className="w-full rounded border border-cream-100 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-900">
                      Province
                    </label>
                    <select
                      value={shippingInfo.province}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, province: e.target.value })
                      }
                      className="w-full rounded border border-cream-100 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
                    >
                      <option value="">Select province</option>
                      <option value="AB">Alberta</option>
                      <option value="BC">British Columbia</option>
                      <option value="MB">Manitoba</option>
                      <option value="NB">New Brunswick</option>
                      <option value="NL">Newfoundland and Labrador</option>
                      <option value="NS">Nova Scotia</option>
                      <option value="NT">Northwest Territories</option>
                      <option value="NU">Nunavut</option>
                      <option value="ON">Ontario</option>
                      <option value="PE">Prince Edward Island</option>
                      <option value="QC">Quebec</option>
                      <option value="SK">Saskatchewan</option>
                      <option value="YT">Yukon</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-900">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.postalCode}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
                      }
                      placeholder="A1A 1A1"
                      className="w-full rounded border border-cream-100 px-3 py-2.5 text-sm outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
                <button
                  onClick={nextStep}
                  className="mt-8 rounded bg-sage-700 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
                >
                  Continue to Shipping Method
                </button>
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {currentStep === "method" && (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary-700">
                  Shipping Method
                </h2>
                <div className="mt-6 space-y-3">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                        selectedShipping === option.id
                          ? "border-gold-500 bg-gold-500/5"
                          : "border-cream-100 hover:border-gold-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="accent-gold-500"
                        />
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            {option.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-neutral-900">
                        {subtotal >= SHIPPING_THRESHOLD ? (
                          <span className="text-primary-600">Free</span>
                        ) : (
                          formatPrice(option.price)
                        )}
                      </span>
                    </label>
                  ))}
                </div>
                {subtotal < SHIPPING_THRESHOLD && (
                  <p className="mt-3 text-xs text-gold-500">
                    Add {formatPrice(SHIPPING_THRESHOLD - subtotal)} more for
                    free shipping!
                  </p>
                )}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={prevStep}
                    className="rounded border border-cream-100 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-gold-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="rounded bg-sage-700 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === "payment" && (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary-700">
                  Payment Method
                </h2>
                <div className="mt-6 space-y-3">
                  {/* Card Option */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                      paymentMethod === "card"
                        ? "border-gold-500 bg-gold-500/5"
                        : "border-cream-100 hover:border-gold-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-gold-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">
                        Credit / Debit Card
                      </p>
                      <p className="text-xs text-neutral-500">
                        Pay securely with Stripe
                      </p>
                    </div>
                  </label>

                  {/* Stripe Elements placeholder */}
                  {paymentMethod === "card" && (
                    <div className="ml-7 rounded-lg border border-cream-100 bg-cream-50 p-4">
                      <div className="space-y-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-neutral-900">
                            Card Number
                          </label>
                          <div className="h-10 rounded border border-cream-100 bg-white px-3 py-2 text-sm text-neutral-400">
                            Stripe Elements will render here
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-neutral-900">
                              Expiry
                            </label>
                            <div className="h-10 rounded border border-cream-100 bg-white px-3 py-2 text-sm text-neutral-400">
                              MM / YY
                            </div>
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-neutral-900">
                              CVC
                            </label>
                            <div className="h-10 rounded border border-cream-100 bg-white px-3 py-2 text-sm text-neutral-400">
                              CVC
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Option */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                      paymentMethod === "paypal"
                        ? "border-gold-500 bg-gold-500/5"
                        : "border-cream-100 hover:border-gold-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-gold-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">PayPal</p>
                      <p className="text-xs text-neutral-500">
                        Redirect to PayPal to complete payment
                      </p>
                    </div>
                  </label>
                </div>
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={prevStep}
                    className="rounded border border-cream-100 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-gold-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="rounded bg-sage-700 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === "review" && (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary-700">
                  Review Your Order
                </h2>

                {/* Shipping Summary */}
                <div className="mt-6 rounded-lg border border-cream-100 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-neutral-900">
                      Shipping to
                    </h3>
                    <button
                      onClick={() => setCurrentStep("shipping")}
                      className="text-xs text-gold-500 hover:text-gold-400"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    {shippingInfo.firstName} {shippingInfo.lastName}
                    <br />
                    {shippingInfo.address}
                    <br />
                    {shippingInfo.city}, {shippingInfo.province}{" "}
                    {shippingInfo.postalCode}
                  </p>
                </div>

                {/* Items Summary */}
                <div className="mt-4 rounded-lg border border-cream-100 p-4">
                  <h3 className="text-sm font-medium text-neutral-900">
                    Items ({itemCount})
                  </h3>
                  <div className="mt-2 space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.variantId}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-neutral-500">
                          {item.title} ({item.variantTitle}) x{item.quantity}
                        </span>
                        <span className="text-neutral-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={prevStep}
                    className="rounded border border-cream-100 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-gold-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="rounded bg-gold-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-400"
                  >
                    Place Order &mdash; {formatPrice(total)} CAD
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="sticky top-24 rounded-lg border border-cream-100 bg-white p-6">
              <h2 className="font-display text-lg font-semibold text-primary-700">
                Order Summary
              </h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="text-neutral-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="text-neutral-900">
                    {shippingCost === 0 ? (
                      <span className="text-primary-600">Free</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Estimated Tax</span>
                  <span className="text-neutral-900">
                    {formatPrice(estimatedTax)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-cream-100 pt-2 text-base font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)} CAD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
