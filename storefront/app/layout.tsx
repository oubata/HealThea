import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { CartDrawer } from "@/components/cart";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { OrganizationJsonLd } from "@/components/seo";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://healthea.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HealThEA - Premium Healthy Teas from Around the World",
    template: "%s | HealThEA",
  },
  description:
    "Discover premium healthy teas sourced from the finest tea gardens around the world. Green tea, black tea, white tea, organic, herbal, oolong, matcha, and chai.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "HealThEA",
    title: "HealThEA - Premium Healthy Teas from Around the World",
    description:
      "Discover premium healthy teas sourced from the finest tea gardens around the world.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HealThEA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HealThEA - Premium Healthy Teas",
    description:
      "Discover premium healthy teas sourced from the finest tea gardens around the world.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} font-body antialiased`}
      >
        <OrganizationJsonLd />
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
