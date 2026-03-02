import type { Metadata } from "next";
import { wines } from "@/lib/data/wines";
import WineDetailPage from "./client-page";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return wines.map((wine) => ({ id: wine.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const wine = wines.find((w) => w.id === id);
  if (!wine) return { title: "Wine Not Found" };

  const title = wine.type === "gift-card"
    ? wine.name
    : `${wine.name} ${wine.vintage}`;

  return {
    title,
    description: wine.description,
    openGraph: {
      title: `${title} | Domaine LeSeurre`,
      description: wine.description,
      images: wine.image ? [{ url: wine.image, width: 600, height: 800, alt: wine.name }] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const wine = wines.find((w) => w.id === id);
  if (!wine) notFound();

  return <WineDetailPage wine={wine} />;
}
