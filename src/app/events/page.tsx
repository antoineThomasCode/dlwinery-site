import type { Metadata } from "next";
import EventsPage from "./client-page";

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
  return <EventsPage />;
}
