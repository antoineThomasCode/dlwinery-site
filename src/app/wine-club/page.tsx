import type { Metadata } from "next";
import WineClubPage from "./client-page";

export const metadata: Metadata = {
  title: "LeSeurre Family Club — Free Membership, Exclusive Wines",
  description:
    "Join the LeSeurre Family Club. Free membership, 15% off all wines, complimentary tastings, and 3 curated shipments per year from Keuka Lake.",
  openGraph: {
    title: "LeSeurre Family Club | Domaine LeSeurre",
    description:
      "Free membership. 15% off all wines. Complimentary tastings. 3 curated shipments per year from Keuka Lake.",
  },
};

export default function Page() {
  return <WineClubPage />;
}
