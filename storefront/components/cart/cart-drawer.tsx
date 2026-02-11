"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data/products";
import CartItem from "./cart-item";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, subtotal, itemCount } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-96 max-w-[90vw] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-100 px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-primary-700">
            Your Cart ({itemCount})
          </h2>
          <button
            onClick={closeDrawer}
            className="text-neutral-400 hover:text-neutral-900"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg className="h-16 w-16 text-cream-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="mt-4 text-sm text-neutral-500">Your cart is empty</p>
              <button
                onClick={closeDrawer}
                className="mt-4 text-sm font-medium text-gold-500 hover:text-gold-400"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-cream-100">
              {items.map((item) => (
                <CartItem key={item.variantId} item={item} compact />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-500">Subtotal</span>
              <span className="text-lg font-semibold text-neutral-900">
                {formatPrice(subtotal)} CAD
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="block w-full rounded bg-sage-700 py-3 text-center text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="block w-full rounded border border-cream-100 py-3 text-center text-sm font-medium text-neutral-900 transition-colors hover:border-gold-500"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
