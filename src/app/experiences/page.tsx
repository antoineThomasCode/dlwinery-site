import type { Metadata } from "next";
import ExperiencesPageWrapper from "./client-page";
import { ExperiencesJsonLd } from "@/components/seo/json-ld";
import { experiences } from "@/lib/data/experiences";

export const metadata: Metadata = {
  title: "Tasting Experiences — Book a Wine Tasting",
  description:
    "Book a guided tasting at Domaine LeSeurre on Keuka Lake. From classic flights to private winemaker sessions, discover French-inspired wines in the Finger Lakes.",
  openGraph: {
    title: "Tasting Experiences | Domaine LeSeurre",
    description:
      "Book a guided tasting at Domaine LeSeurre. Classic flights, reserve tastings, and private winemaker sessions on Keuka Lake.",
  },
};

export default function Page() {
  return (
    <>
      <ExperiencesJsonLd experiences={experiences} />
      <ExperiencesPageWrapper />
    </>
  );
}
