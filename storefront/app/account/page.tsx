"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

const quickLinks = [
  {
    href: "/account/orders",
    title: "Orders",
    description: "View your order history and track shipments",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    href: "/account/profile",
    title: "Profile",
    description: "Update your personal information and password",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    href: "/account/addresses",
    title: "Addresses",
    description: "Manage your shipping and billing addresses",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

export default function AccountDashboard() {
  const { customer } = useAuth();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-primary-700">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Welcome back, {customer?.firstName}! Here&apos;s a quick overview of your account.
      </p>

      {/* Quick stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-cream-100 bg-cream-50 p-5">
          <p className="text-sm font-medium text-neutral-500">Total Orders</p>
          <p className="mt-1 font-display text-2xl font-bold text-primary-700">0</p>
        </div>
        <div className="rounded-lg border border-cream-100 bg-cream-50 p-5">
          <p className="text-sm font-medium text-neutral-500">Rewards Points</p>
          <p className="mt-1 font-display text-2xl font-bold text-gold-500">0</p>
        </div>
        <div className="rounded-lg border border-cream-100 bg-cream-50 p-5">
          <p className="text-sm font-medium text-neutral-500">Saved Addresses</p>
          <p className="mt-1 font-display text-2xl font-bold text-primary-700">0</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-lg border border-cream-100 p-5 transition-colors hover:border-gold-500 hover:bg-cream-50"
          >
            <div className="text-sage-700 transition-colors group-hover:text-gold-500">
              {link.icon}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-primary-700">
              {link.title}
            </h3>
            <p className="mt-1 text-xs text-neutral-500">{link.description}</p>
          </Link>
        ))}
      </div>

      {/* Recent orders placeholder */}
      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-primary-700">
          Recent Orders
        </h2>
        <div className="mt-4 rounded-lg border border-cream-100 p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-neutral-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <p className="mt-3 text-sm text-neutral-500">
            No orders yet. Start shopping our{" "}
            <Link href="/shop" className="font-medium text-gold-500 hover:text-gold-400">
              tea collection
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
