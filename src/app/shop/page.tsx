import type { Metadata } from "next";
import ShopPage from "./client-page";

export const metadata: Metadata = {
  title: "Shop Wines Online — Volume Discounts & Flat Rate Shipping",
  description:
    "Order wines from Domaine LeSeurre online. Sparkling, white, rosé, and red. 5–15% volume discounts. $18 flat rate shipping to 38 states.",
  openGraph: {
    title: "Shop Wines | Domaine LeSeurre",
    description:
      "Order award-winning wines from Keuka Lake. Volume discounts up to 15%. $18 flat rate shipping nationwide.",
  },
};

export default function Page() {
  return <ShopPage />;
}
