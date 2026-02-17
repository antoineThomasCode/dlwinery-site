import type { Metadata } from "next";
import OurStoryPage from "./client-page";

export const metadata: Metadata = {
  title: "Our Story — From Champagne to Keuka Lake",
  description:
    "Six generations of French winemaking tradition. Discover how Céline & Sébastien LeSeurre brought Champagne heritage to the Finger Lakes.",
  openGraph: {
    title: "Our Story | Domaine LeSeurre",
    description:
      "Six generations of French winemaking tradition. Discover how Céline & Sébastien LeSeurre brought Champagne heritage to the Finger Lakes.",
  },
};

export default function Page() {
  return <OurStoryPage />;
}
