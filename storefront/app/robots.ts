import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://healthea.ca";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account/",
          "/cart",
          "/checkout",
          "/checkout/confirmation",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
