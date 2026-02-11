"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import MobileNav from "./mobile-nav";

const pagesDropdown = [
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQs", href: "/faq" },
  { label: "Tea Origins", href: "/origins" },
  { label: "Gallery", href: "/gallery" },
];

const shopDropdown = [
  { label: "All Teas", href: "/shop" },
  { label: "Green Tea", href: "/categories/green-tea" },
  { label: "Black Tea", href: "/categories/black-tea" },
  { label: "White Tea", href: "/categories/white-tea" },
  { label: "Organic Tea", href: "/categories/organic-tea" },
  { label: "Herbal Tea", href: "/categories/herbal-tea" },
  { label: "Oolong Tea", href: "/categories/oolong-tea" },
  { label: "Matcha", href: "/categories/matcha" },
  { label: "Chai", href: "/categories/chai" },
];

const customerDropdown = [
  { label: "Sign In", href: "/account/login" },
  { label: "Sign Up", href: "/account/register" },
  { label: "My Cart", href: "/cart" },
  { label: "My Orders", href: "/account/orders" },
];

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
}

function NavDropdown({ label, items }: DropdownProps) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 font-body text-sm font-medium text-primary-700 transition-colors hover:text-gold-500">
        {label}
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-48 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        <div className="rounded-md border border-cream-100 bg-white py-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-neutral-900 transition-colors hover:bg-cream-50 hover:text-gold-500"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-cream-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="HealThEA"
              width={140}
              height={56}
              className="h-12 w-auto lg:h-14"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="font-body text-sm font-medium text-primary-700 transition-colors hover:text-gold-500"
            >
              Home
            </Link>
            <NavDropdown label="Pages" items={pagesDropdown} />
            <NavDropdown label="Shop" items={shopDropdown} />
            <NavDropdown label="Customer Area" items={customerDropdown} />
            <Link
              href="/blog"
              className="font-body text-sm font-medium text-primary-700 transition-colors hover:text-gold-500"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="font-body text-sm font-medium text-primary-700 transition-colors hover:text-gold-500"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side: Cart + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={openDrawer}
              className="relative text-primary-700 transition-colors hover:text-gold-500"
              aria-label="Shopping cart"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {/* Cart count badge */}
              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(true)}
              className="text-primary-700 lg:hidden"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pagesItems={pagesDropdown}
        shopItems={shopDropdown}
        customerItems={customerDropdown}
      />
    </>
  );
}
