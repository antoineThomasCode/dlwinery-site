import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/shared/cursor-glow";
import { SmoothScrollProvider } from "@/components/shared/smooth-scroll-provider";
import { ScrollRestoration } from "@/components/shared/scroll-restoration";
import { JsonLd } from "@/components/seo/json-ld";
import { VinoshipperScript } from "@/components/vinoshipper/vinoshipper-script";
import "./globals.css";

/**
 * next/font/local — auto-preloads font files and eliminates FOIT.
 * The CSS @font-face in globals.css is kept for Vinoshipper widget
 * compatibility (which references 'Diaspora' / 'Sweet Sans Pro' by name).
 * next/font here is purely for the preload <link> tags.
 */
const diaspora = localFont({
  src: "./fonts/Diaspora-Regular.woff",
  display: "swap",
  weight: "400",
  variable: "--font-diaspora",
});

const sweetSansPro = localFont({
  src: "./fonts/SweetSansPro-Regular.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-sweet-sans",
});

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
    <html lang="en" className={`${diaspora.variable} ${sweetSansPro.variable}`}>
      <head>
        <link rel="preconnect" href="https://vinoshipper.com" />
        <link rel="dns-prefetch" href="https://vinoshipper.com" />
      </head>
      <body className="bg-cream text-black-warm antialiased">
        <JsonLd />
        <SmoothScrollProvider>
          <ScrollRestoration />
          <CursorGlow variant="gold" />
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
        <VinoshipperScript />
      </body>
    </html>
  );
}
