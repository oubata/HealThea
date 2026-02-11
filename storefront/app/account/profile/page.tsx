"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { customer, updateProfile } = useAuth();
  const [form, setForm] = useState({
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    email: customer?.email ?? "",
    phone: customer?.phone ?? "",
  });
  const [saved, setSaved] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-primary-700">
        Profile
      </h1>
      <p className="mt-1 text-sm text-neutral-500">
        Update your personal information.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-5">
        {saved && (
          <div className="rounded bg-green-50 p-3 text-sm text-green-700">
            Profile updated successfully.
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-900">
              First Name
            </label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-900">
              Last Name
            </label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-900">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-900">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
            placeholder="+1 (416) 555-0123"
          />
        </div>

        <div className="border-t border-cream-100 pt-5">
          <h2 className="font-display text-lg font-semibold text-primary-700">
            Change Password
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Current Password
              </label>
              <input
                type="password"
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                New Password
              </label>
              <input
                type="password"
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
                placeholder="Min. 8 characters"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="rounded bg-sage-700 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
