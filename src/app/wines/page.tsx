import type { Metadata } from "next";
import WinesPage from "./client-page";

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
  return <WinesPage />;
}
