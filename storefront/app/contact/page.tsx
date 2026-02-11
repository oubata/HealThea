import type { Metadata } from "next";
import { Container } from "@/components/ui";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with HealThEA. Questions about our teas, orders, or wholesale inquiries — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream-50 py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm italic text-gold-500">
              Get In Touch
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary-700 lg:text-4xl">
              Contact Us
            </h1>
            <p className="mt-3 text-sm text-neutral-500">
              Have a question, suggestion, or just want to say hello? We&apos;d
              love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact content */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            {/* Form */}
            <div>
              <h2 className="font-display text-xl font-semibold text-primary-700">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact info sidebar */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-semibold text-primary-700">
                  Contact Information
                </h3>
                <div className="mt-4 space-y-4">
                  <div className="flex gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Phone</p>
                      <p className="text-sm text-neutral-500">1-844-523-8685</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Email</p>
                      <p className="text-sm text-neutral-500">info@healthea.ca</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Location</p>
                      <p className="text-sm text-neutral-500">
                        Calgary, Alberta<br />
                        Canada
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-primary-700">
                  Business Hours
                </h3>
                <div className="mt-4 space-y-2 text-sm text-neutral-500">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-neutral-900">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-neutral-900">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-neutral-900">Closed</span>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="overflow-hidden rounded-lg border border-cream-100">
                <div className="flex aspect-[4/3] items-center justify-center bg-cream-100 text-center">
                  <div>
                    <svg className="mx-auto h-10 w-10 text-neutral-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    <p className="mt-2 text-xs text-neutral-500">
                      Map integration coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
