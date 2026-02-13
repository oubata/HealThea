import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Cookie Settings",
  description:
    "Learn about how HealThEA uses cookies and manage your cookie preferences.",
};

export default function CookiesPage() {
  return (
    <>
      <section className="border-b border-cream-100 bg-white">
        <Container className="py-12">
          <h1 className="font-display text-3xl font-bold text-primary-700 lg:text-4xl">
            Cookie Settings
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Last updated: February 2026
          </p>
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <div className="prose prose-neutral mx-auto max-w-3xl prose-headings:font-display prose-headings:text-primary-700 prose-a:text-gold-600">
          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help us provide you with a better browsing experience
            by remembering your preferences and understanding how you use our
            site.
          </p>

          <h2>Cookies We Use</h2>

          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly.
            They enable core features like shopping cart functionality, account
            authentication, and secure checkout. These cannot be disabled.
          </p>
          <ul>
            <li>
              <strong>Session cookie:</strong> Keeps you logged in during your
              visit
            </li>
            <li>
              <strong>Cart cookie:</strong> Remembers items in your shopping cart
            </li>
            <li>
              <strong>CSRF token:</strong> Protects against cross-site request
              forgery
            </li>
          </ul>

          <h3>Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our
            website. The data is collected anonymously and helps us improve our
            site.
          </p>
          <ul>
            <li>
              <strong>Google Analytics:</strong> Tracks page views, session
              duration, and traffic sources
            </li>
          </ul>

          <h3>Marketing Cookies</h3>
          <p>
            These cookies may be set by our advertising partners to build a
            profile of your interests and show you relevant ads on other sites.
            We currently do not use marketing cookies.
          </p>

          <h2>Managing Your Cookies</h2>
          <p>
            You can control and delete cookies through your browser settings.
            Please note that disabling essential cookies may affect the
            functionality of our website.
          </p>
          <ul>
            <li>
              <strong>Chrome:</strong> Settings &gt; Privacy and Security &gt;
              Cookies
            </li>
            <li>
              <strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt;
              Cookies
            </li>
            <li>
              <strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage
              Website Data
            </li>
            <li>
              <strong>Edge:</strong> Settings &gt; Cookies and Site Permissions
            </li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us at{" "}
            <a href="mailto:info@healthea.ca">info@healthea.ca</a>.
          </p>
        </div>
      </Container>
    </>
  );
}
