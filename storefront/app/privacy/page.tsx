import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "HealThEA's privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-cream-100 bg-white">
        <Container className="py-12">
          <h1 className="font-display text-3xl font-bold text-primary-700 lg:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Last updated: February 2026
          </p>
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <div className="prose prose-neutral mx-auto max-w-3xl prose-headings:font-display prose-headings:text-primary-700 prose-a:text-gold-600">
          <h2>1. Information We Collect</h2>
          <p>
            When you visit healthea.ca, we may collect the following types of
            information:
          </p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address,
              shipping address, phone number, and payment details when you place
              an order or create an account.
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, time spent on site,
              browser type, and device information collected through cookies and
              analytics tools.
            </li>
            <li>
              <strong>Communication Data:</strong> Any information you provide
              when contacting us through our contact form or email.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfil your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to your questions and support requests</li>
            <li>Improve our website and product offerings</li>
            <li>
              Send promotional emails (only with your consent, and you can
              unsubscribe at any time)
            </li>
          </ul>

          <h2>3. How We Protect Your Information</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal data. All payment transactions are processed through Stripe,
            a PCI-DSS compliant payment processor. We never store your full
            credit card details on our servers.
          </p>

          <h2>4. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your data only with:
          </p>
          <ul>
            <li>Payment processors (Stripe, PayPal) to process transactions</li>
            <li>Shipping carriers to deliver your orders</li>
            <li>
              Analytics providers to help us understand how our site is used
            </li>
          </ul>

          <h2>5. Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience. See our{" "}
            <a href="/cookies">Cookie Settings</a> page for more details on how
            we use cookies and how to manage your preferences.
          </p>

          <h2>6. Your Rights</h2>
          <p>Under Canadian privacy law (PIPEDA), you have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal data</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact
            us at{" "}
            <a href="mailto:info@healthea.ca">info@healthea.ca</a> or visit our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </div>
      </Container>
    </>
  );
}
