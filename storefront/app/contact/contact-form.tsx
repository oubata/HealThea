"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-3 font-display text-lg font-semibold text-primary-700">
          Message Sent!
        </h3>
        <p className="mt-1 text-sm text-neutral-500">
          Thank you for reaching out. We&apos;ll get back to you within 24-48
          hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-4 text-sm font-medium text-gold-500 hover:text-gold-400"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-900">
            Your Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-900">
            Email Address
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-900">
          Subject
        </label>
        <select
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          required
          className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
        >
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="order">Order Question</option>
          <option value="product">Product Information</option>
          <option value="wholesale">Wholesale Inquiry</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-neutral-900">
          Message
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full resize-none rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-sage-700 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-primary-700"
      >
        Send Message
      </button>
    </form>
  );
}
