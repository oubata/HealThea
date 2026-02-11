"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  pagesItems: NavItem[];
  shopItems: NavItem[];
  customerItems: NavItem[];
}

function AccordionSection({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-primary-600/20">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-6 py-3 text-left text-sm font-medium text-white transition-colors hover:text-gold-400"
      >
        {title}
        <svg
          className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="bg-primary-700/30 pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="block px-10 py-2 text-sm text-cream-100 transition-colors hover:text-gold-400"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileNav({
  open,
  onClose,
  pagesItems,
  shopItems,
  customerItems,
}: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-sage-700 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary-600/20 px-6 py-4">
          <Image
            src="/logo-small.png"
            alt="HealThEA"
            width={100}
            height={40}
            className="h-10 w-auto"
          />
          <button
            onClick={onClose}
            className="text-cream-100 hover:text-white"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-primary-600/20 px-6 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search teas..."
              className="w-full rounded-md bg-primary-700/30 px-4 py-2 pl-10 text-sm text-white placeholder-cream-100/60 outline-none focus:ring-1 focus:ring-gold-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-cream-100/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
          <Link
            href="/"
            onClick={onClose}
            className="block border-b border-primary-600/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:text-gold-400"
          >
            Home
          </Link>

          <AccordionSection title="Pages" items={pagesItems} onNavigate={onClose} />
          <AccordionSection title="Shop" items={shopItems} onNavigate={onClose} />
          <AccordionSection title="Customer Area" items={customerItems} onNavigate={onClose} />

          <Link
            href="/blog"
            onClick={onClose}
            className="block border-b border-primary-600/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:text-gold-400"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="block border-b border-primary-600/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:text-gold-400"
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
}
