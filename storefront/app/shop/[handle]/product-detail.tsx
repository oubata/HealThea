"use client";

import { useState } from "react";
import Image from "next/image";
import { type Product, formatPrice } from "@/lib/data/products";
import { useCart } from "@/lib/cart-context";

interface Props {
  product: Product;
}

const tabs = ["Description", "Health Benefits", "Brewing Instructions"] as const;
type Tab = (typeof tabs)[number];

export default function ProductDetail({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("Description");
  const { addItem } = useCart();

  const variant = product.variants[selectedVariant];

  function handleAddToCart() {
    addItem(
      {
        productId: product.id,
        variantId: variant.id,
        title: product.title,
        variantTitle: variant.title,
        price: variant.price,
        image: product.thumbnail,
        handle: product.handle,
      },
      quantity
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-neutral-500">
        <a href="/shop" className="hover:text-primary-700">
          Shop
        </a>
        <span className="mx-2">/</span>
        <span className="text-primary-700">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-cream-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative h-20 w-20 overflow-hidden rounded-md border-2 ${
                    selectedImage === i
                      ? "border-gold-500"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-700">
            {product.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Origin: {product.metadata.origin_country}
          </p>

          {/* Price */}
          <p className="mt-4 text-2xl font-semibold text-gold-500">
            {formatPrice(variant.price)} CAD
          </p>

          {/* Availability */}
          <p className="mt-2 text-sm">
            {variant.inventory_quantity > 0 ? (
              <span className="text-primary-600">In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>

          {/* Variant Selector */}
          <div className="mt-6">
            <label className="text-sm font-medium text-neutral-900">
              Size / Weight
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.variants.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(i)}
                  className={`rounded border px-4 py-2 text-sm transition-colors ${
                    selectedVariant === i
                      ? "border-gold-500 bg-gold-500 text-white"
                      : "border-cream-100 bg-white text-neutral-900 hover:border-gold-400"
                  }`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded border border-cream-100">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-neutral-500 hover:text-primary-700"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-neutral-500 hover:text-primary-700"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded bg-sage-700 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
            >
              Add to Cart
            </button>
          </div>

          {/* Quick Info */}
          <div className="mt-8 space-y-2 border-t border-cream-100 pt-6 text-sm text-neutral-500">
            <p>
              <span className="font-medium text-neutral-900">Caffeine:</span>{" "}
              {product.metadata.caffeine_level === "none"
                ? "Caffeine Free"
                : `${product.metadata.caffeine_level.charAt(0).toUpperCase() + product.metadata.caffeine_level.slice(1)}`}
            </p>
            <p>
              <span className="font-medium text-neutral-900">Brew Temp:</span>{" "}
              {product.metadata.brewing_temp}
            </p>
            <p>
              <span className="font-medium text-neutral-900">Steep Time:</span>{" "}
              {product.metadata.steep_time}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cream-100 px-3 py-1 text-xs text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="mt-12 border-t border-cream-100 pt-8">
        <div className="flex gap-8 border-b border-cream-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-gold-500 text-gold-500"
                  : "text-neutral-500 hover:text-primary-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-6 text-sm leading-relaxed text-neutral-500">
          {activeTab === "Description" && <p>{product.description}</p>}
          {activeTab === "Health Benefits" && (
            <p>{product.metadata.health_benefits}</p>
          )}
          {activeTab === "Brewing Instructions" && (
            <div className="space-y-3">
              <p>
                <span className="font-medium text-neutral-900">Water Temperature:</span>{" "}
                {product.metadata.brewing_temp}
              </p>
              <p>
                <span className="font-medium text-neutral-900">Steep Time:</span>{" "}
                {product.metadata.steep_time}
              </p>
              <p>
                <span className="font-medium text-neutral-900">Recommended:</span>{" "}
                Use 1 teaspoon (2-3g) per 200ml of water. For best results, use
                filtered water and pre-warm your teapot or cup. The leaves can
                typically be re-steeped 2-3 times.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
