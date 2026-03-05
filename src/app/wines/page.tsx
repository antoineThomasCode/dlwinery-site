import type { Metadata } from "next";
import WinesPage from "./client-page";
import { WineCollectionJsonLd } from "@/components/seo/json-ld";
import { wines } from "@/lib/data/wines";

export const metadata: Metadata = {
  title: "Our Wines — French-Inspired Wines from Keuka Lake",
  description:
    "Explore sparkling, white, rosé, and red wines crafted with French winemaking tradition on the shores of Keuka Lake in the Finger Lakes, NY.",
  openGraph: {
    title: "Our Wines | Domaine LeSeurre",
    description:
      "Explore sparkling, white, rosé, and red wines crafted with French winemaking tradition on the shores of Keuka Lake.",
  },
};

export default function Page() {
  const actualWines = wines.filter((w) => w.type !== "gift-card");
  return (
    <>
      <WineCollectionJsonLd wines={actualWines} />
      <WinesPage />
    </>
  );
}
