import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { SmoothScrollProvider } from "@/components/shared/smooth-scroll-provider";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dlwinery.com"),
  title: {
    default: "Domaine LeSeurre | French-Inspired Winery on Keuka Lake",
    template: "%s | Domaine LeSeurre",
  },
  description:
    "Experience French winemaking on the shores of Keuka Lake. Book a tasting, join our Wine Club, and discover award-winning wines in the heart of the Finger Lakes.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Domaine LeSeurre Winery",
    images: [
      {
        url: "/images/winery-scenic-view.webp",
        width: 1200,
        height: 630,
        alt: "Domaine LeSeurre Winery on Keuka Lake",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Domaine LeSeurre | French-Inspired Winery on Keuka Lake",
    description:
      "Experience French winemaking on the shores of Keuka Lake. Book a tasting, join our Wine Club, and discover award-winning wines.",
    images: ["/images/winery-scenic-view.webp"],
  },
  alternates: {
    canonical: "https://dlwinery.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cream text-black-warm antialiased">
        <JsonLd />
        <SmoothScrollProvider>
          <CursorGlow variant="gold" />
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
