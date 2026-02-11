"use client";

import { useCart } from "@/lib/cart-context";

interface AddToCartButtonProps {
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: number;
  image: string;
  handle: string;
}

export default function AddToCartButton(props: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() =>
        addItem({
          productId: props.productId,
          variantId: props.variantId,
          title: props.title,
          variantTitle: props.variantTitle,
          price: props.price,
          image: props.image,
          handle: props.handle,
        })
      }
      className="mt-3 w-full rounded bg-sage-700 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
    >
      Add to Cart
    </button>
  );
}
