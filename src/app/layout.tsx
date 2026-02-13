import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { CursorGlow } from "@/components/shared/cursor-glow";
import "./globals.css";

export const metadata: Metadata = {
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
        <CursorGlow variant="gold" />
        <Header />
        {children}
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
