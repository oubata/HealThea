"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Container } from "@/components/ui";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    const success = await register(form);
    if (success) {
      router.push("/account");
    } else {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <Container className="py-12 lg:py-20">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-3xl font-bold text-primary-700">
          Create Account
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-500">
          Join HealThEA for a better tea experience
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-600">
              {error}
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
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-900">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              placeholder="Min. 8 characters"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-900">
              Confirm Password
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-sage-700 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/account/login" className="font-medium text-gold-500 hover:text-gold-400">
            Sign In
          </Link>
        </p>
      </div>
    </Container>
  );
}
