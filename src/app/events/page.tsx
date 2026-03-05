import type { Metadata } from "next";
import EventsPage from "./client-page";
import { EventsListJsonLd } from "@/components/seo/json-ld";
import { events } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Events — Tastings, Festivals & Live Music at the Winery",
  description:
    "Upcoming events at Domaine LeSeurre on Keuka Lake. Jazz on the Terrace, harvest celebrations, food & wine pairings, and private gatherings.",
  openGraph: {
    title: "Events | Domaine LeSeurre",
    description:
      "Jazz on the Terrace, harvest celebrations, food & wine pairings, and more at Domaine LeSeurre on Keuka Lake.",
  },
};

export default function Page() {
  return (
    <>
      <EventsListJsonLd events={events} />
      <EventsPage />
    </>
  );
}
