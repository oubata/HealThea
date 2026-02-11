"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data/products";
import { Container } from "@/components/ui";
import { CartItem } from "@/components/cart";

const SHIPPING_THRESHOLD = 5000; // $50.00 free shipping
const STANDARD_SHIPPING = 599;

export default function CartPage() {
  const { items, subtotal, itemCount, clearCart } = useCart();

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const estimatedTax = Math.round(subtotal * 0.13); // 13% HST estimate
  const total = subtotal + shipping + estimatedTax;

  return (
    <>
      <div className="border-b border-cream-100 bg-white">
        <Container className="py-8">
          <h1 className="font-display text-3xl font-bold text-primary-700">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {itemCount} item{itemCount !== 1 ? "s" : ""} in your cart
          </p>
        </Container>
      </div>

      <Container className="py-8 lg:py-12">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <svg
              className="mx-auto h-20 w-20 text-cream-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <p className="mt-4 text-lg text-neutral-500">Your cart is empty</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex border-2 border-gold-500 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-gold-500 transition-colors hover:bg-gold-500 hover:text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12">
            {/* Cart Items */}
            <div>
              {/* Table Header (desktop) */}
              <div className="hidden border-b border-cream-100 pb-3 lg:grid lg:grid-cols-[1fr_120px_120px_40px]">
                <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Product
                </span>
                <span className="text-center text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Quantity
                </span>
                <span className="text-right text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Total
                </span>
                <span />
              </div>

              <div className="divide-y divide-cream-100">
                {items.map((item) => (
                  <CartItem key={item.variantId} item={item} />
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Link
                  href="/shop"
                  className="text-sm text-neutral-500 hover:text-primary-700"
                >
                  &larr; Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm text-neutral-400 hover:text-red-500"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="mt-8 lg:mt-0">
              <div className="rounded-lg border border-cream-100 bg-white p-6">
                <h2 className="font-display text-lg font-semibold text-primary-700">
                  Order Summary
                </h2>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Subtotal</span>
                    <span className="text-neutral-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="text-neutral-900">
                      {shipping === 0 ? (
                        <span className="text-primary-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gold-500">
                      Free shipping on orders over $50!
                    </p>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Estimated Tax (HST)</span>
                    <span className="text-neutral-900">{formatPrice(estimatedTax)}</span>
                  </div>

                  {/* Promo Code */}
                  <div className="border-t border-cream-100 pt-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-1 rounded border border-cream-100 px-3 py-2 text-sm outline-none focus:border-gold-500"
                      />
                      <button className="rounded bg-cream-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-cream-50">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-cream-100 pt-3 text-base font-semibold">
                    <span className="text-neutral-900">Total</span>
                    <span className="text-neutral-900">
                      {formatPrice(total)} CAD
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 block w-full rounded bg-sage-700 py-3 text-center text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
