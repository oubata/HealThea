"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Container } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.push("/account");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <Container className="py-12 lg:py-20">
      <div className="mx-auto max-w-md">
        <h1 className="text-center font-display text-3xl font-bold text-primary-700">
          Sign In
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-500">
          Welcome back to HealThEA
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-900">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-neutral-500">
              <input type="checkbox" className="accent-gold-500" />
              Remember me
            </label>
            <a href="#" className="text-gold-500 hover:text-gold-400">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-sage-700 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link href="/account/register" className="font-medium text-gold-500 hover:text-gold-400">
            Sign Up
          </Link>
        </p>
      </div>
    </Container>
  );
}
