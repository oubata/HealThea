"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, type CartItem as CartItemType } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data/products";

interface CartItemProps {
  item: CartItemType;
  compact?: boolean;
}

export default function CartItem({ item, compact = false }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4">
      {/* Thumbnail */}
      <Link href={`/shop/${item.handle}`} className="flex-shrink-0">
        <div className={`relative overflow-hidden rounded-md bg-cream-100 ${compact ? "h-16 w-16" : "h-20 w-20"}`}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/shop/${item.handle}`}
            className="text-sm font-medium text-primary-700 hover:text-gold-500"
          >
            {item.title}
          </Link>
          <p className="mt-0.5 text-xs text-neutral-500">{item.variantTitle}</p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center rounded border border-cream-100">
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
              className="px-2 py-1 text-xs text-neutral-500 hover:text-primary-700"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-6 text-center text-xs">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
              className="px-2 py-1 text-xs text-neutral-500 hover:text-primary-700"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Price + Remove */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-900">
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.variantId)}
              className="text-neutral-400 hover:text-red-500"
              aria-label="Remove item"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
