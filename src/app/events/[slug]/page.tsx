import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events } from "@/lib/data/events";
import { EventJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import EventDetailPage from "./client-page";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.title} — ${event.date}`,
    description: event.description,
    openGraph: {
      title: `${event.title} | Domaine LeSeurre`,
      description: event.description,
      images: event.image
        ? [{ url: event.image, width: 1200, height: 630, alt: event.title }]
        : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <>
      <EventJsonLd event={event} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://dlwinery.com" },
          { name: "Events", url: "https://dlwinery.com/events" },
          { name: event.title, url: `https://dlwinery.com/events/${event.slug}` },
        ]}
      />
      <EventDetailPage event={event} />
    </>
  );
}
