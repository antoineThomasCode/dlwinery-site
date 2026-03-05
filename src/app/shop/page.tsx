import type { Metadata } from "next";
import ShopPage from "./client-page";
import { WineCollectionJsonLd } from "@/components/seo/json-ld";
import { wines } from "@/lib/data/wines";

export const metadata: Metadata = {
  title: "Shop Wines Online — Volume Discounts & Flat Rate Shipping",
  description:
    "Order wines from Domaine LeSeurre online. Sparkling, white, rosé, and red. 5–15% volume discounts. Nationwide shipping via VinoShipper.",
  openGraph: {
    title: "Shop Wines | Domaine LeSeurre",
    description:
      "Order award-winning wines from Keuka Lake. Volume discounts up to 15%. $18 flat rate shipping nationwide.",
  },
};

export default function Page() {
  const inStockWines = wines.filter((w) => w.inStock);
  return (
    <>
      <WineCollectionJsonLd wines={inStockWines} />
      <ShopPage />
    </>
  );
}
