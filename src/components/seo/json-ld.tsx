import type { Wine } from "@/lib/types";
import type { Experience, Event } from "@/lib/types";

/* ═══════════════════════════════════════════
   Organization / Winery — global (layout.tsx)
   ═══════════════════════════════════════════ */
export function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["Winery", "LocalBusiness"],
    name: "Domaine LeSeurre Winery",
    description:
      "French-inspired winery on the shores of Keuka Lake. Méthode champenoise sparkling, Burgundy-style Chardonnay, and Loire-inspired Cabernet Franc in the heart of the Finger Lakes.",
    url: "https://dlwinery.com",
    telephone: "+1-607-569-3299",
    email: "info@dlwinery.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9485 Route 76",
      addressLocality: "Hammondsport",
      addressRegion: "NY",
      postalCode: "14840",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.3767,
      longitude: -77.2231,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "18:00",
    },
    image: "https://dlwinery.com/images/winery-scenic-view.webp",
    priceRange: "$$",
    servesCuisine: "Wine Tasting",
    sameAs: [
      "https://www.facebook.com/DomaineLeSeurre",
      "https://www.instagram.com/domaineleseurre",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}

/* ═══════════════════════════════════════════
   Product — individual wine detail page
   ═══════════════════════════════════════════ */
export function WineProductJsonLd({ wine }: { wine: Wine }) {
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: wine.type === "gift-card" ? wine.name : `${wine.name} ${wine.vintage}`,
    description: wine.description,
    image: wine.image ?? undefined,
    sku: wine.sku,
    brand: {
      "@type": "Brand",
      name: "Domaine LeSeurre",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Domaine LeSeurre Winery",
      url: "https://dlwinery.com",
    },
    offers: {
      "@type": "Offer",
      url: `https://dlwinery.com/shop/${wine.id}`,
      priceCurrency: "USD",
      price: wine.price.toFixed(2),
      availability: wine.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Domaine LeSeurre Winery",
      },
    },
    ...(wine.type !== "gift-card" && {
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Vintage",
          value: wine.vintage.toString(),
        },
        {
          "@type": "PropertyValue",
          name: "Wine Type",
          value: wine.type.charAt(0).toUpperCase() + wine.type.slice(1),
        },
        {
          "@type": "PropertyValue",
          name: "Body",
          value: wine.body.charAt(0).toUpperCase() + wine.body.slice(1),
        },
        {
          "@type": "PropertyValue",
          name: "Sweetness",
          value: wine.sweetness.charAt(0).toUpperCase() + wine.sweetness.slice(1),
        },
      ],
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
    />
  );
}

/* ═══════════════════════════════════════════
   ItemList — wine collection (wines + shop pages)
   ═══════════════════════════════════════════ */
export function WineCollectionJsonLd({ wines }: { wines: Wine[] }) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Wines from Domaine LeSeurre",
    description:
      "Award-winning French-inspired wines from the Finger Lakes. Sparkling, white, rosé, and red wines crafted on the shores of Keuka Lake.",
    numberOfItems: wines.length,
    itemListElement: wines.map((wine, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: wine.type === "gift-card" ? wine.name : `${wine.name} ${wine.vintage}`,
        url: `https://dlwinery.com/shop/${wine.id}`,
        image: wine.image ?? undefined,
        description: wine.description,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: wine.price.toFixed(2),
          availability: wine.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}

/* ═══════════════════════════════════════════
   TouristAttraction — experiences page
   ═══════════════════════════════════════════ */
export function ExperiencesJsonLd({ experiences }: { experiences: Experience[] }) {
  const attraction = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Domaine LeSeurre Tasting Experiences",
    description:
      "Guided wine tasting experiences at a French-heritage winery on Keuka Lake in the Finger Lakes, NY. Book educational tastings, macaron pairings, and signature food experiences.",
    url: "https://dlwinery.com/experiences",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9485 Route 76",
      addressLocality: "Hammondsport",
      addressRegion: "NY",
      postalCode: "14840",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.3767,
      longitude: -77.2231,
    },
    touristType: "Wine tourism",
    availableLanguage: ["English", "French"],
    isAccessibleForFree: false,
    offers: experiences
      .filter((exp) => exp.price > 0)
      .map((exp) => ({
        "@type": "Offer",
        name: exp.name,
        description: exp.description,
        priceCurrency: "USD",
        price: exp.price.toFixed(2),
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(attraction) }}
    />
  );
}

/* ═══════════════════════════════════════════
   Event — events listing + individual event
   ═══════════════════════════════════════════ */
export function EventJsonLd({ event }: { event: Event }) {
  // Parse the date string (e.g. "March 15, 2026") into an ISO date
  const dateObj = new Date(event.date);
  const isoDate = !isNaN(dateObj.getTime())
    ? dateObj.toISOString().split("T")[0]
    : event.date;

  // Parse time range (e.g. "5:00 PM — 8:00 PM") for start/end times
  const timeParts = event.time.split(/\s*[—–-]\s*/);
  const startTime = parseTime(timeParts[0]?.trim());
  const endTime = parseTime(timeParts[1]?.trim());

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: startTime ? `${isoDate}T${startTime}` : isoDate,
    ...(endTime && { endDate: `${isoDate}T${endTime}` }),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Domaine LeSeurre Winery",
      address: {
        "@type": "PostalAddress",
        streetAddress: "9485 Route 76",
        addressLocality: "Hammondsport",
        addressRegion: "NY",
        postalCode: "14840",
        addressCountry: "US",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Domaine LeSeurre Winery",
      url: "https://dlwinery.com",
    },
    image: event.image
      ? `https://dlwinery.com${event.image}`
      : "https://dlwinery.com/images/winery-scenic-view.webp",
    ...(event.price > 0 && {
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: event.price.toFixed(2),
        availability:
          event.spotsLeft > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
        url: `https://dlwinery.com/events/${event.slug}`,
      },
    }),
    ...(event.price === 0 && {
      isAccessibleForFree: true,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
    />
  );
}

/* ═══════════════════════════════════════════
   Events list — multiple events on listing page
   ═══════════════════════════════════════════ */
export function EventsListJsonLd({ events }: { events: Event[] }) {
  return (
    <>
      {events.map((event) => (
        <EventJsonLd key={event.id} event={event} />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════
   Article — blog post (already inline in [slug]/page.tsx,
   but providing a reusable component version)
   ═══════════════════════════════════════════ */
export function ArticleJsonLd({
  title,
  description,
  date,
  author,
  keywords,
  url,
}: {
  title: string;
  description: string;
  date: string;
  author: string;
  keywords: string[];
  url: string;
}) {
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    url,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Domaine LeSeurre Winery",
      url: "https://dlwinery.com",
      logo: {
        "@type": "ImageObject",
        url: "https://dlwinery.com/images/winery-scenic-view.webp",
      },
    },
    keywords: keywords.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  );
}

/* ═══════════════════════════════════════════
   BreadcrumbList — reusable breadcrumb schema
   ═══════════════════════════════════════════ */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
    />
  );
}

/* ═══════════════════════════════════════════
   Helper: parse "5:00 PM" → "17:00:00"
   ═══════════════════════════════════════════ */
function parseTime(timeStr?: string): string | null {
  if (!timeStr) return null;
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const meridian = match[3].toUpperCase();
  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
}
