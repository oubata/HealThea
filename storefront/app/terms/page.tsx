import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "HealThEA's terms of service. Read the terms and conditions governing the use of our website and purchase of our products.",
};

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-cream-100 bg-white">
        <Container className="py-12">
          <h1 className="font-display text-3xl font-bold text-primary-700 lg:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Last updated: February 2026
          </p>
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <div className="prose prose-neutral mx-auto max-w-3xl prose-headings:font-display prose-headings:text-primary-700 prose-a:text-gold-600">
          <h2>1. General</h2>
          <p>
            By accessing and using healthea.ca, you agree to be bound by these
            Terms of Service. If you do not agree with any part of these terms,
            please do not use our website.
          </p>

          <h2>2. Products &amp; Pricing</h2>
          <p>
            All prices are listed in Canadian Dollars (CAD) and include
            applicable taxes unless otherwise stated. We reserve the right to
            update pricing at any time. Product images are representative and may
            vary slightly from the actual product.
          </p>

          <h2>3. Orders &amp; Payment</h2>
          <ul>
            <li>
              All orders are subject to availability and confirmation of the
              order price.
            </li>
            <li>
              We accept payment via Stripe (credit/debit cards) and PayPal.
            </li>
            <li>
              We reserve the right to refuse or cancel any order for any reason,
              including suspected fraud.
            </li>
          </ul>

          <h2>4. Shipping &amp; Delivery</h2>
          <p>
            We ship across Canada. Standard shipping is delivered in 5-7
            business days, and express shipping in 1-2 business days. Shipping
            costs are calculated at checkout. We are not responsible for delays
            caused by the shipping carrier or customs.
          </p>

          <h2>5. Returns &amp; Refunds</h2>
          <p>
            Due to the nature of food and beverage products, we can only accept
            returns for unopened, unused items within 14 days of delivery. To
            initiate a return, please contact us at{" "}
            <a href="mailto:info@healthea.ca">info@healthea.ca</a>. Refunds
            will be processed to the original payment method within 5-10
            business days.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, logos, and
            design — is the property of HealThEA and is protected by Canadian
            and international copyright laws. You may not reproduce, distribute,
            or use any content without our written permission.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            HealThEA shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our website or
            products. Our total liability for any claim shall not exceed the
            amount you paid for the product in question.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms are governed by the laws of the Province of Alberta,
            Canada. Any disputes shall be resolved in the courts of Alberta.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a href="mailto:info@healthea.ca">info@healthea.ca</a> or visit our{" "}
            <a href="/contact">Contact page</a>.
          </p>
        </div>
      </Container>
    </>
  );
}
