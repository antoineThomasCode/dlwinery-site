import type { Metadata } from "next";
import WineClubPage from "./client-page";

export const metadata: Metadata = {
  title: "Wine Club Le Cercle — Free Membership, Exclusive Wines",
  description:
    "Join Le Cercle, the wine club of Domaine LeSeurre. Free membership, 15% off all wines, complimentary tastings, and 3 curated shipments per year.",
  openGraph: {
    title: "Wine Club Le Cercle | Domaine LeSeurre",
    description:
      "Free membership. 15% off all wines. Complimentary tastings. 3 curated shipments per year from Keuka Lake.",
  },
};

export default function Page() {
  return <WineClubPage />;
}
