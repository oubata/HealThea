"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data/products";
import { medusaClientFetch } from "@/lib/medusa";
import { Container } from "@/components/ui";
import StripePayment from "@/components/checkout/stripe-payment";

type Step = "shipping" | "method" | "payment" | "review";

const steps: { key: Step; label: string }[] = [
  { key: "shipping", label: "Shipping Info" },
  { key: "method", label: "Shipping Method" },
  { key: "payment", label: "Payment" },
  { key: "review", label: "Review" },
];

const SHIPPING_THRESHOLD = 5000;

interface ShippingOption {
  id: string;
  name: string;
  amount: number;
  description?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, itemCount, cartId } = useCart();
  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    country: "ca",
  });
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = useState("");
  const [stripeClientSecret, setStripeClientSecret] = useState("");
  const [paymentReady, setPaymentReady] = useState(false);

  const shippingCost = shippingOptions.find((o) => o.id === selectedShipping)?.amount ?? 0;
  const effectiveShipping = subtotal >= SHIPPING_THRESHOLD ? 0 : shippingCost;
  const estimatedTax = Math.round(subtotal * 0.13);
  const total = subtotal + effectiveShipping + estimatedTax;

  const stepIndex = steps.findIndex((s) => s.key === currentStep);

  // --- Step handlers ---

  // Step 1 → 2: Save shipping info to cart, get shipping options
  const handleShippingSubmit = useCallback(async () => {
    if (!cartId) {
      setError("No cart found. Please add items first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Update cart with email and shipping address
      await medusaClientFetch(`/store/carts/${cartId}`, {
        method: "POST",
        body: {
          email: shippingInfo.email,
          shipping_address: {
            first_name: shippingInfo.firstName,
            last_name: shippingInfo.lastName,
            address_1: shippingInfo.address,
            city: shippingInfo.city,
            province: shippingInfo.province,
            postal_code: shippingInfo.postalCode,
            country_code: shippingInfo.country,
            phone: shippingInfo.phone,
          },
          billing_address: {
            first_name: shippingInfo.firstName,
            last_name: shippingInfo.lastName,
            address_1: shippingInfo.address,
            city: shippingInfo.city,
            province: shippingInfo.province,
            postal_code: shippingInfo.postalCode,
            country_code: shippingInfo.country,
            phone: shippingInfo.phone,
          },
        },
      });

      // Get available shipping options
      const data = await medusaClientFetch<{
        shipping_options: Array<{
          id: string;
          name: string;
          amount: number;
          type: { label: string; description: string };
        }>;
      }>(`/store/shipping-options?cart_id=${cartId}`);

      const options = data.shipping_options.map((o) => ({
        id: o.id,
        name: o.name,
        amount: o.amount,
        description: o.type?.description,
      }));

      setShippingOptions(options);
      if (options.length > 0) {
        setSelectedShipping(options[0].id);
      }

      setCurrentStep("method");
    } catch (e) {
      console.error("Shipping update failed:", e);
      setError("Failed to update shipping info. Please check your details.");
    } finally {
      setLoading(false);
    }
  }, [cartId, shippingInfo]);

  // Step 2 → 3: Set shipping method, initialize payment
  const handleShippingMethodSubmit = useCallback(async () => {
    if (!cartId || !selectedShipping) return;

    setLoading(true);
    setError("");

    try {
      // Add shipping method to cart
      await medusaClientFetch(`/store/carts/${cartId}/shipping-methods`, {
        method: "POST",
        body: { option_id: selectedShipping },
      });

      // Initialize payment sessions
      const cartData = await medusaClientFetch<{
        cart: {
          payment_collection?: {
            id: string;
            payment_sessions?: Array<{
              id: string;
              provider_id: string;
              data: { client_secret?: string };
            }>;
          };
        };
      }>(`/store/carts/${cartId}`);

      const paymentCollectionId = cartData.cart.payment_collection?.id;

      if (paymentCollectionId) {
        // Initialize payment session for Stripe (or system default)
        const providerToUse = "pp_stripe_stripe";
        try {
          const sessionData = await medusaClientFetch<{
            payment_session: {
              id: string;
              data: { client_secret?: string };
            };
          }>(`/store/payment-collections/${paymentCollectionId}/payment-sessions`, {
            method: "POST",
            body: { provider_id: providerToUse },
          });

          if (sessionData.payment_session?.data?.client_secret) {
            setStripeClientSecret(sessionData.payment_session.data.client_secret);
          }
        } catch {
          // Stripe not configured, try system default
          try {
            await medusaClientFetch(
              `/store/payment-collections/${paymentCollectionId}/payment-sessions`,
              {
                method: "POST",
                body: { provider_id: "pp_system_default" },
              }
            );
          } catch {
            // No payment provider available
          }
        }
      }

      setCurrentStep("payment");
    } catch (e) {
      console.error("Shipping method failed:", e);
      setError("Failed to set shipping method.");
    } finally {
      setLoading(false);
    }
  }, [cartId, selectedShipping]);

  // Step 4: Complete the order
  const handlePlaceOrder = useCallback(async () => {
    if (!cartId) return;

    setLoading(true);
    setError("");

    try {
      await medusaClientFetch(`/store/carts/${cartId}/complete`, {
        method: "POST",
      });

      clearCart();
      router.push("/checkout/confirmation");
    } catch (e) {
      console.error("Order completion failed:", e);
      setError("Failed to complete order. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [cartId, clearCart, router]);

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
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                  </div>
                </div>
                <button
                  onClick={handleShippingSubmit}
                  disabled={loading || !shippingInfo.firstName || !shippingInfo.email || !shippingInfo.address}
                  className="mt-8 rounded bg-sage-700 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Continue to Shipping Method"}
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
                  {shippingOptions.length > 0 ? (
                    shippingOptions.map((option) => (
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
                            {option.description && (
                              <p className="text-xs text-neutral-500">
                                {option.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-medium text-neutral-900">
                          {subtotal >= SHIPPING_THRESHOLD ? (
                            <span className="text-primary-600">Free</span>
                          ) : (
                            formatPrice(option.amount)
                          )}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-500">
                      No shipping options available for your address.
                    </p>
                  )}
                </div>
                {subtotal < SHIPPING_THRESHOLD && (
                  <p className="mt-3 text-xs text-gold-500">
                    Add {formatPrice(SHIPPING_THRESHOLD - subtotal)} more for
                    free shipping!
                  </p>
                )}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setCurrentStep("shipping")}
                    className="rounded border border-cream-100 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-gold-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleShippingMethodSubmit}
                    disabled={loading || !selectedShipping}
                    className="rounded bg-sage-700 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Continue to Payment"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === "payment" && (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary-700">
                  Payment
                </h2>
                <div className="mt-6">
                  {stripeClientSecret ? (
                    <StripePayment
                      clientSecret={stripeClientSecret}
                      onPaymentReady={() => setPaymentReady(true)}
                      onError={(err) => setError(err)}
                    />
                  ) : (
                    <div className="rounded-lg border border-cream-100 bg-cream-50 p-6">
                      <p className="text-sm font-medium text-neutral-900">
                        Payment Method
                      </p>
                      <p className="mt-2 text-xs text-neutral-500">
                        Stripe is not yet configured. Once you add your Stripe API keys,
                        the payment form will appear here. You can still review your order.
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setCurrentStep("method")}
                    className="rounded border border-cream-100 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-gold-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep("review")}
                    disabled={stripeClientSecret ? !paymentReady : false}
                    className="rounded bg-sage-700 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
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
                    onClick={() => setCurrentStep("payment")}
                    className="rounded border border-cream-100 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-gold-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="rounded bg-gold-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-400 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : `Place Order — ${formatPrice(total)} CAD`}
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
                    {effectiveShipping === 0 ? (
                      <span className="text-primary-600">Free</span>
                    ) : (
                      formatPrice(effectiveShipping)
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
