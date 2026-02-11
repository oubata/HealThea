"use client";

import Link from "next/link";

const demoOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-12-15",
    status: "Delivered",
    total: 4597,
    items: [
      { title: "Organic Sencha Green Tea", variant: "100g Loose Leaf", qty: 1, price: 2499 },
      { title: "Earl Grey Black Tea", variant: "50g Loose Leaf", qty: 2, price: 1049 },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2025-01-08",
    status: "Shipped",
    total: 3299,
    items: [
      { title: "Silver Needle White Tea", variant: "50g Loose Leaf", qty: 1, price: 3299 },
    ],
  },
];

function statusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-green-50 text-green-700";
    case "Shipped":
      return "bg-blue-50 text-blue-700";
    case "Processing":
      return "bg-yellow-50 text-yellow-700";
    case "Cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-neutral-50 text-neutral-700";
  }
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function OrdersPage() {
  const orders = demoOrders;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-primary-700">
        Order History
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        View and track your past orders.
      </p>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-lg border border-cream-100 p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-neutral-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <p className="mt-3 text-sm text-neutral-500">
            No orders yet.{" "}
            <Link href="/shop" className="font-medium text-gold-500 hover:text-gold-400">
              Start shopping
            </Link>
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-cream-100">
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream-100 px-5 py-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-neutral-500">Order</p>
                    <p className="text-sm font-semibold text-primary-700">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Date</p>
                    <p className="text-sm text-neutral-900">
                      {new Date(order.date).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">Total</p>
                    <p className="text-sm font-semibold text-primary-700">
                      {formatPrice(order.total)} CAD
                    </p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Order items */}
              <div className="divide-y divide-cream-100 px-5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{item.title}</p>
                      <p className="text-xs text-neutral-500">
                        {item.variant} &times; {item.qty}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-900">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
